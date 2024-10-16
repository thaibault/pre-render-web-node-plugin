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
import {File, Mapping, ProcessCloseReason} from 'clientnode'
import {pluginAPI as pluginAPIType} from 'web-node'
import {
    Configuration as BaseConfiguration,
    Plugin,
    PluginHandler as BasePluginHandler,
    ServicePromises,
    ServicePromisesState as BaseServicePromisesState,
    Services as BaseServices,
    ServicesState as BaseServicesState
} from 'web-node/type'
// endregion
// region exports
export type Configuration<ConfigurationType = Mapping<unknown>> =
    BaseConfiguration<{
        preRender: {
            cache: boolean
            locations: {
                executer: {
                    exclude: Array<string> | string
                    include: Array<string> | string
                    fileNames: Array<string> | string
                }
                output: {
                    directoryNames: Array<string> | string
                    exclude: Array<string> | string
                }
            }
            renderAfterConfigurationUpdates: boolean
        }
    }> &
    ConfigurationType

export type Services<ServiceType = Mapping<unknown>> =
    BaseServices<{
        preRender: {
            getPrerenderedOutputDirectories: (
                configuration: Configuration,
                plugins: Array<Plugin>,
                pluginAPI: typeof pluginAPIType
            ) => Promise<Array<File>>
            getPrerendererExecuter: (
                configuration: Configuration,
                plugins: Array<Plugin>,
                pluginAPI: typeof pluginAPIType
            ) => Promise<Array<File>>

            render: (state: State<Array<string> | string | undefined>) =>
                Promise<void>
            renderFile: (filePath: string, cliParameter?: Array<string>) =>
                Promise<ProcessCloseReason>
        }
    }> &
    ServiceType

export type ServicesState = BaseServicesState<
    undefined, Configuration, Services
>
export type State<Type = undefined> = BaseServicePromisesState<
    Type,
    Configuration,
    Services,
    ServicePromises
>

export interface PluginHandler extends BasePluginHandler {
    /**
     * Hook before pre-rendering starts. List of executer can be modified.
     * @param state - Application state.
     * @returns Promise resolving to entry files.
     */
    prePreRendererRender?(state: State<Array<File>>): Promise<Array<File>>
    /**
     * Hook before a pre-renderer will be called. CLI-Parameter can be
     * modified.
     * @param state - Application state.
     * @returns Promise resolving to cli arguments.
     */
    prePreRendererCLIParameter?(state: State<{
        file: File
        parameters: Array<string>
    }>): Promise<Array<string>>
    /**
     * Hook after a pre-renderer has been called.
     * @param state - Application state.
     * @returns Promise resolving to nothing.
     */
    postPreRendererRender?(state: State<Array<File>>): Promise<void>
}
// endregion
