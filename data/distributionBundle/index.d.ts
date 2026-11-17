import type { File, ProcessCloseReason } from 'clientnode';
import type { pluginAPI as pluginAPIType } from 'web-node';
import type { ChangedConfigurationState, Plugin } from 'web-node/type';
import type { Configuration, PluginHandler, ServicesState, State } from './type';
/**
 * Triggered hook when at least one plugin has a new configuration file and
 * configuration object has been changed.
 * @param state - Application state.
 * @returns Promise resolving to nothing.
 */
export declare const postConfigurationHotLoaded: (state: ChangedConfigurationState) => Promise<void>;
/**
 * Appends a pre-renderer to the web node services.
 * @param state - Application state.
 * @returns Promise resolving to nothing.
 */
export declare const preLoadService: (state: ServicesState) => Promise<void>;
/**
 * Triggers when application will be closed soon and removes created files.
 * @param state - Application state.
 * @param state.configuration - Applications configuration.
 * @param state.pluginAPI - Applications plugin api.
 * @param state.plugins - Applications plugins.
 * @param state.services - Applications services.
 * @returns Promise resolving to nothing.
 */
export declare const shouldExit: ({ configuration, pluginAPI, plugins, services }: State) => Promise<void>;
/**
 * Retrieves all directories which have a pre-rendered structure.
 * @param configuration - Updated configuration object.
 * @param plugins - List of all loaded plugins.
 * @param pluginAPI - Plugin api reference.
 * @returns A promise holding all resolved file objects.
 */
export declare const getPrerenderedOutputDirectories: (configuration: Configuration, plugins: Array<Plugin>, pluginAPI: typeof pluginAPIType) => Promise<Array<File>>;
/**
 * Retrieves all files to process.
 * @param configuration - Updated configuration object.
 * @param plugins - List of all loaded plugins.
 * @param pluginAPI - Plugin api reference.
 * @returns A promise holding all resolved file objects.
 */
export declare const getPrerendererExecuter: (configuration: Configuration, plugins: Array<Plugin>, pluginAPI: typeof pluginAPIType) => Promise<Array<File>>;
/**
 * Triggers pre-rendering.
 * @param state - Application state.
 * @returns A Promise resolving to nothing.
 */
export declare const render: (state: State<Array<string> | string | undefined>) => Promise<void>;
/**
 * Executes given pre-renderer file.
 * @param filePath - File path to execute as pre-renderer.
 * @param cliParameter - List of cli parameter to use.
 * @returns A promise resolving after pre-rendering has finished.
 */
export declare const renderFile: (filePath: string, cliParameter?: Array<string>) => Promise<ProcessCloseReason>;
export declare const preRender: PluginHandler;
export default preRender;
