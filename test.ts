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
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import Tools from 'clientnode'
import {configuration as baseConfiguration, PluginAPI} from 'web-node'

import PreRender from './index'
import packageConfiguration from './package.json'
import {Configuration} from './type'
// endregion
describe('preRender', ():void => {
    // region mockup
    let configuration:Configuration
    beforeAll(async ():Promise<void> => {
        configuration = Tools.extend(
            true,
            (await PluginAPI.loadAll(baseConfiguration)) as
                unknown as
                Configuration,
            {template: packageConfiguration.webNode.preRender}
        )
    })
    // endregion
    // TODO
})
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
