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
import Tools from 'clientnode'
import type {File, PlainObject} from 'clientnode'
import ejs from 'ejs'
import fileSystem from 'fs'
import path from 'path'
// NOTE: Only needed for debugging this file.
try {
    require('source-map-support/register')
} catch (error) {}
import WebNodePluginAPI from 'web-node/pluginAPI'
import type {Configuration, Plugin, Services} from 'web-node/type'

import PluginAPI from 'web-node/pluginAPI'
// endregion
/**
 * Provides a pre-rendering hook for webNode applications.
 */
export default class PreRender {
}
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
