// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/
// region imports
import type {RecursivePartial} from 'clientnode'
import type {ServicePromises} from 'web-node/type'

import type {Configuration, Services} from './type'

import {copy, extend, timeout} from 'clientnode'
import childProcess from 'child_process'
import {chmod, mkdir, mkdtemp, readFile, rm, stat, writeFile} from 'fs/promises'
import {tmpdir} from 'os'
import {join} from 'path'
import {configuration as baseConfiguration, loadAll, pluginAPI} from 'web-node'

import {afterAll, beforeAll, expect, test} from '@jest/globals'

import {
    getPrerenderedOutputDirectories,
    getPrerendererExecuter,
    postConfigurationHotLoaded,
    preLoadService,
    render,
    renderFile,
    shouldExit
} from './index'
// endregion
// region mockup
let configuration: Configuration
let fixturePath: string
let fixtureConfiguration: Configuration
beforeAll(async (): Promise<void> => {
    configuration = (await loadAll(copy(baseConfiguration))).configuration as
        Configuration
    /*
        Fixture structure:

        pre-render.js        -> executer writing "preRendered/index.html"
        .hidden/pre-render.js -> ignored since hidden
        ignored/preRendered  -> excluded via output exclude configuration
        other                -> no pre-rendered output directory
    */
    fixturePath = await mkdtemp(join(tmpdir(), 'pre-render-test-'))
    const executerPath = join(fixturePath, 'pre-render.js')
    await writeFile(
        executerPath,
        `#!/usr/bin/env node
import {mkdirSync, writeFileSync} from 'fs'

mkdirSync('preRendered', {recursive: true})
writeFileSync(
    'preRendered/index.html', JSON.stringify(process.argv.slice(2))
)
`
    )
    await chmod(executerPath, 0o755)
    await mkdir(join(fixturePath, '.hidden'))
    await writeFile(join(fixturePath, '.hidden', 'pre-render.js'), '')
    await mkdir(join(fixturePath, 'ignored', 'preRendered'), {recursive: true})
    await mkdir(join(fixturePath, 'other'))

    fixtureConfiguration = extend(
        true,
        copy(configuration),
        {preRender: {
            locations: {
                executer: {include: [fixturePath]},
                output: {exclude: ['ignored']}
            },
            renderAfterConfigurationUpdates: true
        }} as RecursivePartial<Configuration>
    )
})
afterAll(async (): Promise<void> => {
    await rm(fixturePath, {force: true, recursive: true})
})
// endregion
test('postConfigurationLoaded', async (): Promise<void> => {
    const testConfiguration: Configuration = extend(
        true,
        copy(configuration),
        {preRender: {renderAfterConfigurationUpdates: false}} as
            RecursivePartial<Configuration>
    )

    await expect(postConfigurationHotLoaded({
        configuration: testConfiguration,
        data: undefined,
        hook: 'postConfigurationLoaded',
        plugins: [],
        pluginsWithChangedConfiguration: [],
        pluginAPI
    })).resolves.toBeUndefined()
})
test('postConfigurationHotLoaded renders', async (): Promise<void> => {
    let rendered = false

    await expect(postConfigurationHotLoaded({
        configuration: fixtureConfiguration,
        data: undefined,
        hook: 'postConfigurationLoaded',
        plugins: [],
        pluginsWithChangedConfiguration: [],
        pluginAPI,
        services: {preRender: {render: () => {
            rendered = true

            return Promise.resolve()
        }}}
    })).resolves.toBeUndefined()

    expect(rendered).toStrictEqual(true)
})
test('render, collect and remove pre-rendered output', async (): Promise<
    void
> => {
    const executerPath = join(fixturePath, 'pre-render.js')
    const outputPath = join(fixturePath, 'preRendered')

    await expect(getPrerendererExecuter(fixtureConfiguration, [], pluginAPI))
        .resolves.toMatchObject([{path: executerPath}])

    const services = {} as Services
    await expect(preLoadService({
        configuration: fixtureConfiguration,
        data: undefined,
        hook: 'preLoadService',
        plugins: [],
        services,
        pluginAPI
    })).resolves.toBeUndefined()

    expect(JSON.parse(
        await readFile(join(outputPath, 'index.html'), 'utf8')
    )).toStrictEqual(['false'])

    await expect(getPrerenderedOutputDirectories(
        fixtureConfiguration, [], pluginAPI
    )).resolves.toMatchObject([{path: outputPath}])

    await expect(shouldExit({
        configuration: fixtureConfiguration,
        data: undefined,
        hook: 'shouldExit',
        plugins: [],
        servicePromises: {},
        services,
        pluginAPI
    })).resolves.toBeUndefined()

    await expect(stat(outputPath)).rejects.toThrow()
    await expect(stat(join(fixturePath, 'ignored', 'preRendered')))
        .resolves.toBeDefined()
})
test('preLoadService', async (): Promise<void> => {
    const testConfiguration: Configuration = extend(
        true,
        copy(configuration),
        {preRender: {renderAfterConfigurationUpdates: false}} as
            RecursivePartial<Configuration>
    )
    const state = {
        configuration: testConfiguration,
        data: undefined,
        hook: 'preLoadService',
        plugins: [],
        services: {} as Services,
        pluginAPI
    }

    await expect(preLoadService(state)).resolves.toBeUndefined()
    expect(state).toHaveProperty('services.preRender.renderFile')
})
test('shouldExit', async (): Promise<void> => {
    const state = {
        configuration,
        data: undefined,
        hook: 'shouldExit',
        plugins: [],
        servicePromises: {} as ServicePromises,
        services: {preRender: {}} as Services,
        pluginAPI
    }

    await expect(shouldExit(state)).resolves.toBeUndefined()

    state.services.preRender.getPrerenderedOutputDirectories =
        () => Promise.resolve([])

    await expect(shouldExit(state)).resolves.toBeUndefined()
})
test('getPrerenderedOutputDirectories', async (): Promise<void> => {
    await expect(getPrerenderedOutputDirectories(
        configuration, [], pluginAPI
    )).resolves.toStrictEqual([])
})
test('getPrerendererExecuter', async (): Promise<void> => {
    await expect(getPrerendererExecuter(
        configuration, [], pluginAPI
    )).resolves.toStrictEqual([])
})
test('render', async (): Promise<void> => {
    await expect(render({
        configuration,
        data: undefined,
        hook: 'shouldExit',
        plugins: [],
        servicePromises: {},
        services: {preRender: {}} as Services,
        pluginAPI
    })).resolves.toBeUndefined()
})
test('renderFile', async (): Promise<void> => {
    const closeEventHandler = ((
        _eventName: string, callback: () => void
    ) => {
        void timeout(callback)
    })
    childProcess.spawn = (() => ({on: closeEventHandler})) as
        unknown as
        typeof childProcess['spawn']

    await expect(renderFile('node', ['-v'])).resolves.toStrictEqual(
        {parameters: [null], reason: null}
    )
})
