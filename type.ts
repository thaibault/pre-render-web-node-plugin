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
import {File} from 'clientnode/type'
import {
    Configuration as BaseConfiguration,
    Plugin,
    PluginHandler as BasePluginHandler,
    Services as BaseServices
} from 'web-node/type'
// endregion
// region exports
export type FileSearchConfiguration = {
    exclude:Array<string>;
    include:Array<string>;
}
export type Configuration = BaseConfiguration & {
    preRender:{
        cache:boolean;
        fileBaseNames:Array<string>;
        locations:{
            executer:FileSearchConfiguration;
            output:FileSearchConfiguration;
        };
        renderAfterConfigurationUpdates:boolean;
    };
}
export type Services = BaseServices & {preRender:{
    getPrerenderedDirectories:(
        configuration:Configuration, plugins:Array<Plugin>
    ) => Promise<Array<File>>;
    getPrerendererFiles:(
        configuration:Configuration, plugins:Array<Plugin>
    ) => Promise<Array<File>>;
    render:(
        configuration:Configuration,
        plugins:Array<Plugin>,
        additionalCLIParameter?:Array<string>
    ) => Promise<Array<File>>;
    renderFile:(filePath:string, cliParameter?:Array<string>) => Promise<void>;
}}
export interface PluginHandler extends BasePluginHandler {
    /**
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
     * @param cliParameters - List of cli parameter provided to pre-renderers.
     * @param configuration - Configuration object extended by each plugin
     * specific configuration.
     * @param plugins - Topological sorted list of plugins.
     * @returns Given entry files.
     */
    prePreRendererCLIParameter?(
        cliParameters:Array<string>,
        configuration:Configuration,
        plugins:Array<Plugin>
    ):Promise<Array<string>>
    /**
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
