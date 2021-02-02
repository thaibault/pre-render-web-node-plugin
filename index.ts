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
import Tools, {CloseEventNames} from 'clientnode'
import {File, ProcedureFunction, ProcessCloseReason} from 'clientnode/type'
import path from 'path'
import removeDirectoryRecursively from 'rimraf'
import {PluginAPI} from 'web-node'
import {Plugin, PluginHandler} from 'web-node/type'

import {Configuration, Services} from './type'
// endregion
/**
 * Provides a pre-rendering hook for webNode applications.
 */
export class PreRender implements PluginHandler {
    // region api
    /**
     * Triggered hook when at least one plugin has a new configuration file and
     * configuration object has been changed.
     * @param configuration - Updated configuration object.
     * @param pluginsWithChangedConfiguration - List of plugins which have a
     * changed plugin configuration.
     * @param plugins - List of all loaded plugins.
     * @returns New configuration object to use.
     */
    static async postConfigurationLoaded(
        configuration:Configuration,
        pluginsWithChangedConfiguration:Array<Plugin>,
        plugins:Array<Plugin>
    ):Promise<Configuration> {
        if (configuration.preRender.renderAfterConfigurationUpdates)
            PreRender.render(configuration, plugins)
        return configuration
    }
    /**
     * Appends an pre-renderer to the web node services.
     * @param services - An object with stored service instances.
     * @returns Given and extended object of services.
     */
    static preLoadService(services:Services):Services {
        services.preRender = {
            getPrerenderedOutputDirectories:
                PreRender.getPrerenderedOutputDirectories.bind(PreRender),
            getPrerendererExecuter:
                PreRender.getPrerendererExecuter.bind(PreRender),
            render: PreRender.render.bind(PreRender),
            renderFile: PreRender.renderFile.bind(PreRender)
        }
        return services
    }
    /**
     * Triggers when application will be closed soon and removes created files.
     * @param services - An object with stored service instances.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns Given object of services.
     */
    static async shouldExit(
        services:Services, configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Services> {
        const preRenderOutputRemoveingPromises:Array<Promise<string>> = []
        for (const file of await PreRender.getPrerenderedOutputDirectories(
            configuration, plugins
        ))
            preRenderOutputRemoveingPromises.push(new Promise((
                resolve:Function, reject:Function
            ):void =>
                removeDirectoryRecursively(
                    file.path,
                    {glob: false},
                    (error:Error|undefined):void =>
                        error ? reject(error) : resolve()
                )
            ))
        await Promise.all(preRenderOutputRemoveingPromises)
        return services
    }
    // endregion
    // region helper
    /**
     * Retrieves all directories which have a pre-rendered structure.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved file objects.
     */
    static async getPrerenderedOutputDirectories(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const directoryNames:Array<string> = ([] as Array<string>).concat(
            configuration.preRender.locations.output.directoryNames
        )
        const excludePaths:Array<string> = ([] as Array<string>).concat(
            configuration.preRender.locations.output.exclude
        )
        const preRendererPaths:Array<string> =
            (await PreRender.getPrerendererExecuter(configuration, plugins))
                .map((file:File):string => path.dirname(file.path))
        const result:Array<File> = []
        for (const location of preRendererPaths)
            result.concat(
                (await Tools.walkDirectoryRecursively(
                    location,
                    (file:File):false|void => {
                        if (
                            file.name.startsWith('.') ||
                            excludePaths.some((excludePath:string):boolean =>
                                file.path.startsWith(
                                    path.resolve(location, excludePath)
                                )
                            )
                        )
                            return false
                    }
                ))
                .filter((file:File):boolean => Boolean(
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
     * @returns A promise holding all resolved file objects.
     */
    static async getPrerendererExecuter(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const fileNames:Array<string> = ([] as Array<string>).concat(
            configuration.preRender.locations.executer.fileNames
        )
        const result:Array<File> = []
        for (const location of PluginAPI.determineLocations(
            configuration, configuration.preRender.locations.executer.include
        ))
            (await Tools.walkDirectoryRecursively(
                location,
                (file:File):false|void => {
                    if (
                        file.name.startsWith('.') ||
                        PluginAPI.isInLocations(
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
            .map((file:File):void => {
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
     * @param configuration - Configuration object.
     * @param plugins - List of all loaded plugins.
     * @param additionalCLIParameter - List of additional cli parameter to use.
     * @returns A Promise resolving to a list of prerenderer files.
     */
    static async render(
        configuration:Configuration,
        plugins:Array<Plugin>,
        additionalCLIParameter:Array<string>|string = []
    ):Promise<Array<File>> {
        const preRendererFiles:Array<File> = await PluginAPI.callStack(
            'prePreRendererRender',
            plugins,
            configuration,
            await PreRender.getPrerendererExecuter(configuration, plugins)
        )
        const preRenderingPromises:Array<Promise<ProcessCloseReason>> = []
        for (const file of preRendererFiles)
            preRenderingPromises.push(PreRender.renderFile(
                file.path,
                [].concat(await PluginAPI.callStack(
                    'prePreRendererCLIParameter',
                    plugins,
                    configuration,
                    ([] as Array<string>).concat(
                        additionalCLIParameter,
                        `${configuration.preRender.cache}`
                    ),
                    file
                ))
            ))
        await Promise.all(preRenderingPromises)
        return await PluginAPI.callStack(
            'postPreRendererRender', plugins, configuration, preRendererFiles
        )
    }
    /**
     * Executes given pre-renderer file.
     * @param filePath - File path to execute as pre-renderer.
     * @param cliParameter - List of cli parameter to use.
     * @returns A promise resolving after pre-rendering has finished.
     */
    static renderFile(
        filePath:string, cliParameter:Array<string> = []
    ):Promise<ProcessCloseReason> {
        return new Promise((
            resolve:ProcedureFunction, reject:ProcedureFunction
        ):void => {
            const childProcess:ChildProcess = spawnChildProcess(
                filePath,
                cliParameter,
                {
                    cwd: path.dirname(filePath),
                    env: process.env,
                    shell: true,
                    stdio: 'inherit'
                }
            )
            for (const closeEventName of CloseEventNames)
                childProcess.on(
                    closeEventName,
                    Tools.getProcessCloseHandler(resolve, reject)
                )
        })
    }
    // endregion
}
export default PreRender
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
