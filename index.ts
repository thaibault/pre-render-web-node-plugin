// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module pre-render-web-node-plugin */
'use strict'
/* !
    region header
    [Project page](https://torben.website/pre-render-web-node-plugin)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {ChildProcess, spawn as spawnChildProcess} from 'child_process'
import {
    CLOSE_EVENT_NAMES,
    File,
    getProcessCloseHandler,
    ProcessCloseCallback,
    ProcessCloseReason,
    ProcessErrorCallback,
    walkDirectoryRecursively
} from 'clientnode'
import path from 'path'
import {rimraf as removeDirectoryRecursively} from 'rimraf'
import {pluginAPI as pluginAPIType} from 'web-node'
import {ChangedConfigurationState, Plugin, PluginHandler} from 'web-node/type'

import {Configuration, Services, ServicesState, State} from './type'
// endregion
/**
 * Provides a pre-rendering hook for webNode applications.
 */
// region api
/**
 * Triggered hook when at least one plugin has a new configuration file and
 * configuration object has been changed.
 * @param state - Application state.
 * @returns Promise resolving to nothing.
 */
export const postConfigurationHotLoaded = async (
    state: ChangedConfigurationState
): Promise<void> => {
    if (
        (state as unknown as State)
            .configuration.preRender.renderAfterConfigurationUpdates &&
        ((state as unknown as State).services as Partial<Services>)
            .preRender?.render
    )
        await (state as unknown as State).services.preRender.render(
            state as unknown as State
        )
}
/**
 * Appends a pre-renderer to the web node services.
 * @param state - Application state.
 * @returns Promise resolving to nothing.
 */
export const preLoadService = async (state: ServicesState): Promise<void> => {
    const {configuration: {preRender: configuration}, services} = state

    services.preRender = {
        getPrerenderedOutputDirectories,
        getPrerendererExecuter,

        render,
        renderFile
    }

    if (configuration.renderAfterConfigurationUpdates)
        await services.preRender.render(state as unknown as State)
}
/**
 * Triggers when application will be closed soon and removes created files.
 * @param state - Application state.
 * @param state.configuration - Applications configuration.
 * @param state.pluginAPI - Applications plugin api.
 * @param state.plugins - Applications plugins.
 * @param state.services - Applications services.
 * @returns Promise resolving to nothing.
 */
export const shouldExit = async (
    {configuration, pluginAPI, plugins, services}: State
): Promise<void> => {
    if (!Object.prototype.hasOwnProperty.call(
        services.preRender, 'getPrerenderedOutputDirectories'
    ))
        return

    const preRenderOutputRemovingPromises: Array<Promise<void>> = []

    for (
        const file of
        await services.preRender.getPrerenderedOutputDirectories(
            configuration, plugins, pluginAPI
        )
    )
        preRenderOutputRemovingPromises.push(
            removeDirectoryRecursively(file.path).then(() => {
                // Do nothing.
            })
        )

    await Promise.all(preRenderOutputRemovingPromises)
}
// endregion
// region helper
/**
 * Retrieves all directories which have a pre-rendered structure.
 * @param configuration - Updated configuration object.
 * @param plugins - List of all loaded plugins.
 * @param pluginAPI - Plugin api reference.
 * @returns A promise holding all resolved file objects.
 */
export const getPrerenderedOutputDirectories = async (
    configuration: Configuration,
    plugins: Array<Plugin>,
    pluginAPI: typeof pluginAPIType
): Promise<Array<File>> => {
    const directoryNames: Array<string> = ([] as Array<string>).concat(
        configuration.preRender.locations.output.directoryNames
    )
    const excludePaths: Array<string> = ([] as Array<string>).concat(
        configuration.preRender.locations.output.exclude
    )
    const preRendererPaths: Array<string> =
        (await getPrerendererExecuter(configuration, plugins, pluginAPI))
            .map((file: File): string => path.dirname(file.path))

    const result: Array<File> = []
    for (const location of preRendererPaths)
        result.concat(
            (await walkDirectoryRecursively(
                location,
                (file: File): false | undefined => {
                    if (
                        file.name.startsWith('.') ||
                        excludePaths.some((excludePath: string): boolean =>
                            file.path.startsWith(
                                path.resolve(location, excludePath)
                            )
                        )
                    )
                        return false
                }
            ))
                .filter((file: File): boolean => Boolean(
                    file.stats?.isDirectory() &&
                    (
                        directoryNames.length === 0 ||
                        directoryNames.includes(file.name)
                    )
                ))
        )

    return result
}
/**
 * Retrieves all files to process.
 * @param configuration - Updated configuration object.
 * @param plugins - List of all loaded plugins.
 * @param pluginAPI - Plugin api reference.
 * @returns A promise holding all resolved file objects.
 */
export const getPrerendererExecuter = async (
    configuration: Configuration,
    plugins: Array<Plugin>,
    pluginAPI: typeof pluginAPIType
): Promise<Array<File>> => {
    const fileNames: Array<string> = ([] as Array<string>).concat(
        configuration.preRender.locations.executer.fileNames
    )

    const result: Array<File> = []
    for (const location of pluginAPI.determineLocations(
        configuration, configuration.preRender.locations.executer.include
    ))
        (await walkDirectoryRecursively(
            location,
            (file: File): false | undefined => {
                if (
                    file.name.startsWith('.') ||
                    pluginAPI.isInLocations(
                        configuration,
                        plugins,
                        file.path,
                        configuration.preRender.locations.executer
                            .exclude
                    )
                )
                    return false
            }
        ))
            .map((file: File) => {
                if (
                    file.stats?.isFile() &&
                    fileNames.includes(path.basename(file.name))
                )
                    result.push(file)
            })

    return result
}
/**
 * Triggers pre-rendering.
 * @param state - Application state.
 * @returns A Promise resolving to nothing.
 */
export const render = async (
    state: State<Array<string> | string | undefined>
): Promise<void> => {
    const {configuration, pluginAPI, plugins} = state
    const additionalCLIParameters: Array<string> =
        ([] as Array<string>).concat(state.data ?? [])

    const preRendererFiles = await pluginAPI.callStack<
        State<Array<File>>, Array<File>
    >({
        ...state,
        data: await getPrerendererExecuter(configuration, plugins, pluginAPI),
        hook: 'prePreRendererRender'
    }) as Array<File>

    interface CLIParameters {
        file: File
        parameters: Array<string>
    }

    const preRenderingPromises: Array<Promise<ProcessCloseReason>> = []
    for (const file of preRendererFiles)
        preRenderingPromises.push(renderFile(
            file.path,
            ([] as Array<string>).concat(await pluginAPI.callStack<
                State<CLIParameters>, Array<string> | string
            >({
                ...state,
                hook: 'prePreRendererCLIParameter',
                data: {
                    file,
                    parameters: ([] as Array<string>).concat(
                        additionalCLIParameters,
                        String(configuration.preRender.cache)
                    )
                }
            }) as Array<string>)
        ))

    await Promise.all(preRenderingPromises)

    await pluginAPI.callStack<State<Array<File>>>({
        ...state,
        data: preRendererFiles,
        hook: 'postPreRendererRender'
    })
}
/**
 * Executes given pre-renderer file.
 * @param filePath - File path to execute as pre-renderer.
 * @param cliParameter - List of cli parameter to use.
 * @returns A promise resolving after pre-rendering has finished.
 */
export const renderFile = (
    filePath: string, cliParameter: Array<string> = []
): Promise<ProcessCloseReason> => {
    return new Promise<ProcessCloseReason>((
        resolve: ProcessCloseCallback, reject: ProcessErrorCallback
    ) => {
        const childProcess: ChildProcess = spawnChildProcess(
            filePath,
            cliParameter,
            {
                cwd: path.dirname(filePath),
                env: process.env,
                shell: true,
                stdio: 'inherit'
            }
        )

        for (const closeEventName of CLOSE_EVENT_NAMES)
            childProcess.on(
                closeEventName, getProcessCloseHandler(resolve, reject)
            )
    })
}
// endregion

export const preRender = module.exports satisfies PluginHandler
export default preRender
