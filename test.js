// @flow
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
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import type {PlainObject} from 'clientnode'
import Tools from 'clientnode'
import fileSystem from 'fs'
import path from 'path'
import registerTest from 'clientnode/test'
import baseConfiguration from 'web-node/configurator'
import type {Configuration} from 'web-node/type'

import Index from './index'
// endregion
registerTest(async function():Promise<void> {
    // TODO
}, ['plain'])
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
