// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRenderWebNodePlugin */
'use strict'
/* !
    region header
    [Project page](https://torben.website/preRenderWebNodePlugin)

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
import {File} from 'clientnode/type'
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
            getPrerenderedDirectories:
                PreRender.getPrerenderedDirectories.bind(PreRender),
            getPrerendererFiles: PreRender.getPrerendererFiles.bind(PreRender),
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
        for (const file of await PreRender.getPrerenderedDirectories(
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
    // TODO maybe extract this to webnode
    static isFilePathInActivePlugin(
        filePath:string, configuration:Configuration
    ):boolean {
        for (const directory of Object.values(
            configuration.plugin.directories
        ))
            if (
                path.dirname(file.path) ===
                    path.resolve(directory.path) &&
                !pluginPaths.includes(file.path)
            )
                return false
        return true
    }
    static isFilePathInPluginLocation(
        filePath:string, configuration:Configuration, locations:Array<string>
    ):boolean {
        for (
            const location of configuration.preRender.locations.executer.exclude
        )
            if (location.startsWith('/')) {
                if (file.path.startsWith(
                    path.join(configuration.context.path, location)
                ))
                    return false
            } else
                for (const pluginPath of pluginPaths)
                    if (file.path.startsWith(
                        path.resolve(pluginPath, location)
                    ))
                        return false
        return true
    }
    /**
     * Retrieves all directories which have a pre-rendered structure.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved file objects.
     */
    static async getPrerenderedDirectories(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const pluginPaths:Array<string> = plugins.map((plugin:Plugin):string =>
            plugin.path
        )
        return (await Tools.walkDirectoryRecursively(
            configuration.context.path, (file:File):false|void => {
                if (file.name.startsWith('.'))
                    return false
                if (!PreRender.isFilePathInActivePlugin(file.path))
                    return false
                /*
                    NOTE: We ignore absolute defined locations and relative
                    defined in each loaded plugin location.
                */
                for (
                    const location of
                        configuration.preRender.locations.output.exclude
                )
                    if (location.startsWith('/')) {
                        if (file.path.startsWith(
                            path.join(configuration.context.path, location)
                        ))
                            return false
                    } else
                        for (const pluginPath of pluginPaths)
                            if (file.path.startsWith(
                                path.resolve(pluginPath, location)
                            ))
                                return false
            })
        ).filter((file:File):boolean => Boolean(
            file.stats &&
            file.stats.isDirectory() &&
            configuration.preRender.locations.output.include.includes(
                file.name
            )
        ))
    }
    /**
     * Retrieves all files to process.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved file objects.
     */
    static async getPrerendererFiles(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const pluginPaths:Array<string> = plugins.map((plugin:Plugin):string =>
            plugin.path
        )
        const locationToSearch:Array<string> =
            configuration.preRender.locations.executer.include.length ?
                configuration.preRender.locations.executer.include.map((
                    location:string
                ):string => path.join(configuration.context.path, location)) :
                [configuration.context.path]
        const result:Array<File> = []
        for (const location of locationToSearch)
            result.concat((await Tools.walkDirectoryRecursively(
                location,
                (file:File):false|void => {
                    if (file.name.startsWith('.'))
                        return false
                    if (!PreRender.isFilePathInActivePlugin(file.path))
                        return false
                    /*
                        NOTE: We ignore absolute defined locations and relative
                        defined in each loaded plugin location.
                    */
                    for (
                        const location of
                            configuration.preRender.locations.executer.exclude
                    )
                        if (location.startsWith('/')) {
                            if (file.path.startsWith(
                                path.join(configuration.context.path, location)
                            ))
                                return false
                        } else
                            for (const pluginPath of pluginPaths)
                                if (file.path.startsWith(
                                    path.resolve(pluginPath, location)
                                ))
                                    return false
                })
            ).filter((file:File):boolean => Boolean(
                file.stats &&
                file.stats.isFile() &&
                configuration.preRender.fileBaseNames.includes(path.basename(
                    file.name, path.extname(file.name)
                ))
            )))
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
        additionalCLIParameter:Array<string> = []
    ):Promise<Array<File>> {
        const preRendererFiles:Array<File> = await PluginAPI.callStack(
            'prePreRendererRender',
            plugins,
            configuration,
            await PreRender.getPrerendererFiles(configuration, plugins)
        )
        const preRenderingPromises:Array<Promise<void>> = []
        for (const file of preRendererFiles)
            preRenderingPromises.push(PreRender.renderFile(
                file.path,
                [].concat(await PluginAPI.callStack(
                    'prePreRendererCLIParameter',
                    plugins,
                    configuration,
                    [].concat(additionalCLIParameter).concat(
                        file.path, configuration.preRender.cache
                    )
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
    ):Promise<void> {
        return new Promise(async (
            resolve:Function, reject:Function
        ):Promise<void> => {
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
            for (const closeEventName:string of CloseEventNames)
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
