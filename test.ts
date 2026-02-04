// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {beforeAll, describe, expect, test} from '@jest/globals'
import {copy, extend, RecursivePartial, timeout} from 'clientnode'
import childProcess from 'child_process'
import {configuration as baseConfiguration, loadAll, pluginAPI} from 'web-node'
import {ServicePromises} from 'web-node/type'

import {
    getPrerenderedOutputDirectories,
    getPrerendererExecuter,
    postConfigurationHotLoaded,
    preLoadService,
    render,
    renderFile,
    shouldExit
} from './index'
import {Configuration, Services} from './type'
// endregion
describe('preRender', (): void => {
    // region mockup
    let configuration: Configuration
    beforeAll(async (): Promise<void> => {
        configuration =
            (await loadAll(copy(baseConfiguration))).configuration as
                Configuration
    })
    // endregion
    test('postConfigurationLoaded', async (): Promise<void> => {
        const testConfiguration: Configuration = extend<Configuration>(
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
    test('preLoadService', async (): Promise<void> => {
        const testConfiguration: Configuration = extend<Configuration>(
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
            servicePromises: {} as ServicePromises,
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

        await expect(renderFile('', [])).resolves.toStrictEqual(
            {parameters: [], reason: null}
        )
    })
})
