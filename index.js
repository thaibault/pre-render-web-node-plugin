// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module preRenderWebNodePlugin */
'use strict'
/* !
    region header
    [Project page](http://torben.website/preRenderWebNodePlugin)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {spawn as spawnChildProcess} from 'child_process'
import Tools from 'clientnode'
import type {File} from 'clientnode'
import path from 'path'
import removeDirectoryRecursively from 'rimraf'
// NOTE: Only needed for debugging this file.
try {
    require('source-map-support/register')
} catch (error) {}
import PluginAPI from 'web-node/pluginAPI'
import type {Configuration, Plugin, Services} from 'web-node/type'
// endregion
/**
 * Provides a pre-rendering hook for webNode applications.
 */
export default class PreRender {
    // region api
    /**
     * Triggered hook when at least one plugin has a new configuration file and
     * configuration object has been changed.
     * @param configuration - Updated configuration object.
     * @param pluginsWithChangedConfiguration - List of plugins which have a
     * changed plugin configuration.
     * @param oldConfiguration - Old configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns New configuration object to use.
     */
    static async postConfigurationLoaded(
        configuration:Configuration,
        pluginsWithChangedConfiguration:Array<Plugin>,
        oldConfiguration:Configuration, plugins:Array<Plugin>
    ):Promise<Configuration> {
        if (configuration.preRender.renderAfterConfigurationUpdates)
            PreRender.render(null, configuration, plugins)
        return configuration
    }
    /**
     * Appends an pre-renderer to the web node services.
     * @param services - An object with stored service instances.
     * @returns Given and extended object of services.
     */
    static preLoadService(services:Services):Services {
        services.preRender = {render: PreRender.render.bind(PreRender)}
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
        for (const file:File of await PreRender.getPrerenderedDirectories(
            configuration, plugins
        ))
            preRenderOutputRemoveingPromises.push(new Promise((
                resolve:Function, reject:Function
            ):void => removeDirectoryRecursively(file.path, {glob: false}, (
                error:?Error
            ):void => error ? reject(
                error
            ) : resolve())))
        await Promise.all(preRenderOutputRemoveingPromises)
        return services
    }
    // endregion
    // region helper
    /**
     * Retrieves all directories which have a pre-rendered structure.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved files.
     */
    static async getPrerenderedDirectories(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const pluginPaths:Array<string> = plugins.map((plugin:Plugin):string =>
            plugin.path)
        return (await Tools.walkDirectoryRecursively(
            configuration.context.path, (file:File):?false => {
                if (file.name.startsWith('.'))
                    return false
                /*
                    NOTE: We want to ignore all known plugin locations which
                    aren't loaded.
                */
                for (const type:string in configuration.plugin.directories)
                    if (configuration.plugin.directories.hasOwnProperty(
                        type
                    ) && path.dirname(file.path) === path.resolve(
                        configuration.plugin.directories[type].path
                    ) && !pluginPaths.includes(file.path))
                        return false
                /*
                    NOTE: We ignore absolute defined locations and relative
                    defined in each loaded plugin location.
                */
                for (
                    const locationToIgnore:string of
                    configuration.preRender.locationsToIgnore
                )
                    if (locationToIgnore.startsWith('/')) {
                        if (file.path.startsWith(path.join(
                            configuration.context.path, locationToIgnore
                        )))
                            return false
                    } else
                        for (const pluginPath:string of pluginPaths)
                            if (file.path.startsWith(path.resolve(
                                pluginPath, locationToIgnore
                            )))
                                return false
                /*
                    NOTE: Avoid to found nested folders since we will clear
                    them recursively and asynchronous.
                */
                if (file.state.isDirectory(
                ) && configuration.preRender.directoryNames.includes(
                    file.name
                ))
                    return false
            })
        ).filter((file:File):boolean => file.stat.isDirectory(
        ) && configuration.preRender.directoryNames.includes(file.name))
    }
    /**
     * Retrieves all files to process.
     * @param configuration - Updated configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns A promise holding all resolved files.
     */
    static async getPrerenderFiles(
        configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Array<File>> {
        const pluginPaths:Array<string> = plugins.map((plugin:Plugin):string =>
            plugin.path)
        return (await Tools.walkDirectoryRecursively(
            configuration.context.path, (file:File):?false => {
                if (file.name.startsWith('.'))
                    return false
                /*
                    NOTE: We want to ignore all known plugin locations which
                    aren't loaded.
                */
                for (const type:string in configuration.plugin.directories)
                    if (configuration.plugin.directories.hasOwnProperty(
                        type
                    ) && path.dirname(file.path) === path.resolve(
                        configuration.plugin.directories[type].path
                    ) && !pluginPaths.includes(file.path))
                        return false
                /*
                    NOTE: We ignore absolute defined locations and relative
                    defined in each loaded plugin location.
                */
                for (
                    const locationToIgnore:string of
                    configuration.preRender.locationsToIgnore
                )
                    if (locationToIgnore.startsWith('/')) {
                        if (file.path.startsWith(path.join(
                            configuration.context.path, locationToIgnore
                        )))
                            return false
                    } else
                        for (const pluginPath:string of pluginPaths)
                            if (file.path.startsWith(path.resolve(
                                pluginPath, locationToIgnore
                            )))
                                return false
            })
        ).filter((file:File):boolean => file.stat.isFile(
        ) && configuration.preRender.fileBaseNames.includes(path.basename(
            file.name, path.extname(file.name))))
    }
    /**
     * Triggers pre-rendering.
     * @param givenScope - Scope to use for rendering templates.
     * @param configuration - Configuration object.
     * @param plugins - List of all loaded plugins.
     * @returns Scope uses for template rendering.
     */
    static async render(
        givenScope:?Object, configuration:Configuration, plugins:Array<Plugin>
    ):Promise<Object> {
        const preRendererFiles:Array<File> = await PluginAPI.callStack(
            'prePreRendererRender', plugins, configuration,
            await Template.getPrerenderFiles(configuration, plugins), scope)
        const preRenderingPromises:Array<Promise<string>> = []
        for (const file:File of preRendererFiles)
            preRendereringPromises.push(new Promise((
                resolve:Function, reject:Function
            ):void => {
                for (const closeEventName:string of Tools.closeEventNames)
                    spawnChildProcess(file.path, [], {
                        cwd: process.cwd(),
                        env: process.env,
                        shell: true,
                        stdio: 'inherit'
                    }).on(closeEventName, Tools.getProcessCloseHandler(
                        resolve, (
                            configuration.server.proxy.optional
                        ) ? resolve : reject))
            }))
        await Promise.all(preRenderingPromises)
        return await PluginAPI.callStack(
            'postPreRendererRender', plugins, configuration, scope,
            preRendererFiles)
    }
    // endregion
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
