// -*- coding: utf-8 -*-
/** @module type */
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
import {File, Mapping, ProcessCloseReason} from 'clientnode/type'
import {PluginAPI} from 'web-node'
import {
    Configuration as BaseConfiguration,
    Plugin,
    PluginHandler as BasePluginHandler,
    Services as BaseServices
} from 'web-node/type'
// endregion
// region exports
export type Configuration<ConfigurationType = Mapping<unknown>> =
    BaseConfiguration<{
        preRender:{
            cache:boolean
            locations:{
                executer:{
                    exclude:Array<string>|string
                    include:Array<string>|string
                    fileNames:Array<string>|string
                }
                output:{
                    directoryNames:Array<string>|string
                    exclude:Array<string>|string
                }
            }
            renderAfterConfigurationUpdates:boolean
        }
    }> &
    ConfigurationType

export type Services<ServiceType = Mapping<unknown>> =
    BaseServices<{
        preRender:{
            getPrerenderedOutputDirectories:(
                _configuration:Configuration,
                _plugins:Array<Plugin>,
                _pluginAPI:typeof PluginAPI
            ) => Promise<Array<File>>
            getPrerendererExecuter:(
                _configuration:Configuration,
                _plugins:Array<Plugin>,
                _pluginAPI:typeof PluginAPI
            ) => Promise<Array<File>>
            render:(
                _configuration:Configuration,
                _plugins:Array<Plugin>,
                _pluginAPI:typeof PluginAPI,
                _additionalCLIParameter?:Array<string>|string
            ) => Promise<Array<File>>
            renderFile:(_filePath:string, _cliParameter?:Array<string>) =>
                Promise<ProcessCloseReason>
        }
    }> &
    ServiceType

export interface PluginHandler extends BasePluginHandler {
    /**
     * Hook before pre-rendering starts. List of executer can be modified.
     * @param _preRendererFiles - List of files which pre-renders something.
     * @param _configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param _plugins - Topological sorted list of plugins.
     * @param _pluginAPI - Plugin api reference.
     *
     * @returns Given entry files.
     */
    prePreRendererRender?(
        _preRendererFiles:Array<File>,
        _configuration:Configuration,
        _plugins:Array<Plugin>,
        _pluginAPI:typeof PluginAPI
    ):Promise<Array<File>>
    /**
     * Hook before a pre-renderer will be called. CLI-Parameter can be
     * modified.
     * @param _cliParameters - List of cli parameter provided to pre-renderers.
     * @param _file - Executer file to execute with provided cli parameter.
     * @param _configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param _plugins - Topological sorted list of plugins.
     * @param _pluginAPI - Plugin api reference.
     *
     * @returns Given entry files.
     */
    prePreRendererCLIParameter?(
        _cliParameters:Array<string>,
        _file:File,
        _configuration:Configuration,
        _plugins:Array<Plugin>,
        _pluginAPI:typeof PluginAPI
    ):Promise<Array<string>>
    /**
     * Hook after a pre-renderer has been called.
     * @param _preRendererFiles - List of files which pre-renders something.
     * @param _configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param _plugins - Topological sorted list of plugins.
     * @param _pluginAPI - Plugin api reference.
     *
     * @returns Given entry files.
     */
    postPreRendererRender?(
        _preRendererFiles:Array<File>,
        _configuration:Configuration,
        _plugins:Array<Plugin>,
        _pluginAPI:typeof PluginAPI
    ):Promise<Array<File>>
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
