// #!/usr/bin/env babel-node
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
import {beforeAll, describe, expect, test} from '@jest/globals'
import {copy, extend, RecursivePartial} from 'clientnode'
import {configuration as baseConfiguration, loadAll, pluginAPI} from 'web-node'

import {postConfigurationHotLoaded} from './index'
import {Configuration} from './type'
// endregion
describe('preRender', (): void => {
    // region mockup
    let configuration: Configuration
    beforeAll(async (): Promise<void> => {
        configuration =
            (await loadAll(copy(baseConfiguration))).configuration as
                Configuration
    })
    // endregion
    test('postConfigurationLoaded', async (): Promise<void> => {
        const testConfiguration: Configuration = extend<Configuration>(
            true,
            copy(configuration),
            {preRender: {renderAfterConfigurationUpdates: false}} as
                RecursivePartial<Configuration>
        )

        await expect(postConfigurationHotLoaded({
            configuration: testConfiguration,
            data: undefined,
            hook: 'postConfigurationLoaded',
            plugins: [],
            pluginsWithChangedConfiguration: [],
            pluginAPI
        })).resolves.toBeUndefined()
    })
    // TODO test all methods
})
