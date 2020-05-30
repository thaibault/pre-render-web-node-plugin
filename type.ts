// #!/usr/bin/env node
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
import {File, ProcessCloseReason} from 'clientnode/type'
import {
    Configuration as BaseConfiguration,
    Plugin,
    PluginHandler as BasePluginHandler,
    Services as BaseServices
} from 'web-node/type'
// endregion
// region exports
export type Configuration = BaseConfiguration & {
    preRender:{
        cache:boolean;
        locations:{
            executer:{
                exclude:Array<string>|string;
                include:Array<string>|string;
                fileNames:Array<string>|string;
            };
            output:{
                directoryNames:Array<string>|string;
                exclude:Array<string>|string;
            };
        };
        renderAfterConfigurationUpdates:boolean;
    };
}
export type Services = BaseServices & {preRender:{
    getPrerenderedOutputDirectories:(
        configuration:Configuration, plugins:Array<Plugin>
    ) => Promise<Array<File>>;
    getPrerendererExecuter:(
        configuration:Configuration, plugins:Array<Plugin>
    ) => Promise<Array<File>>;
    render:(
        configuration:Configuration,
        plugins:Array<Plugin>,
        additionalCLIParameter?:Array<string>|string
    ) => Promise<Array<File>>;
    renderFile:(filePath:string, cliParameter?:Array<string>) =>
        Promise<ProcessCloseReason>;
}}
export interface PluginHandler extends BasePluginHandler {
    /**
     * Hook before pre-rendering starts. List of executer can be modified.
     * @param preRendererFiles - List of files which pre-renders something.
     * @param configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param plugins - Topological sorted list of plugins.
     * @returns Given entry files.
     */
    prePreRendererRender?(
        preRendererFiles:Array<File>,
        configuration:Configuration,
        plugins:Array<Plugin>
    ):Promise<Array<File>>
    /**
     * Hook before a pre-renderer will be called. CLI-Parameter can be
     * modified.
     * @param cliParameters - List of cli parameter provided to pre-renderers.
     * @param file - Executer file to execute with provided cli parameter.
     * @param configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param plugins - Topological sorted list of plugins.
     * @returns Given entry files.
     */
    prePreRendererCLIParameter?(
        cliParameters:Array<string>,
        file:File,
        configuration:Configuration,
        plugins:Array<Plugin>
    ):Promise<Array<string>>
    /**
     * Hook after a pre-renderer has been called.
     * @param preRendererFiles - List of files which pre-renders something.
     * @param configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param plugins - Topological sorted list of plugins.
     * @returns Given entry files.
     */
    postPreRendererRender?(
        preRendererFiles:Array<File>,
        configuration:Configuration,
        plugins:Array<Plugin>
    ):Promise<Array<File>>
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
