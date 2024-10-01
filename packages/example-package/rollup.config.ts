import { rollup } from '@snailicide/build-config'
import { stringUtils } from '@snailicide/g-library'
import type { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }
import { htmlBundle, nodeRedPkg } from './rollup.config.editor.js'
const testme: RollupOptions = {
    output: {
        file: 'dist/testme.js',
        // p
    },
}
const PRINT_EXPORTS: boolean = false

const directory_paths = {
    output_dir: './dist/',
    source_dir: './src/',
}
const getConfigItems = (nodeType: string) => {
    // rollup.getConfigEntries
    const directory_paths = {
        output_dir: `./dist/nodes/${nodeType}/${nodeType}.html`,
        source_dir: `./src/nodes/${nodeType}/${nodeType}.html/`,
    }
    const entry = rollup.getConfigEntries(
        directory_paths,
        [
            {
                export_key: '*',
                export_types: ['browser_default'],
                library_name: stringUtils.pascalCase(`node-red-${nodeType}`),
                out_file_name_override: nodeType,
                overrides: {
                    exports: 'default',
                },
            },
        ],
        [...rollup.CDN_PLUGINS_BUNDLED, htmlBundle()],
        pkg,
    )
    //console.log(`THE ENTRY IS::::: ${JSON.stringify(entry,undefined,4)}`)
    return entry
}
const allNodeTypes: Array<string> =
    nodeRedPkg['node-red'] && nodeRedPkg['node-red'].nodes
        ? Object.keys(nodeRedPkg['node-red'].nodes)
        : []
console.log('NODES R ', allNodeTypes)
const NRConfig = allNodeTypes.map((nodeType) => getConfigItems(nodeType))

const CONFIG_OBJ = [
    ...rollup.getConfigEntries(
        directory_paths,
        [
            {
                export_key: '*',
                export_types: ['default', 'import', 'require', 'types'],
                library_name: 'gbtBoilerplate',
            },
            {
                export_key: 'settings',
                export_types: ['require'],
                library_name: 'nodeRedSettings',

                overrides: {
                    exports: 'auto',
                },
            },
        ],
        rollup.DEFAULT_PLUGINS_BUNDLED,
        pkg,
    ),
    ...NRConfig.flat(),
]

//browser_default
/*
const makeConfigItem = (nodeType: string) => (

    {


    input: `src/nodes/${nodeType}/${nodeType}.html/index.ts`,
    output: {
        file: `dist/nodes/${nodeType}/${nodeType}.html`,
        format: 'iife',
    },
    plugins: makePlugins(nodeType),
    watch: {
        clearScreen: false,
    },
})
*/

//const nodes = allNodeTypes.map((nodeType) => makeConfigItem(nodeType))

const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
