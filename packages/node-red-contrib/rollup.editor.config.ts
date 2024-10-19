/** Rollup config compiles the node-red index file */
import { rollup } from '@snailicide/build-config'
import { stringUtils } from '@snailicide/g-library'
import { FilePath, node } from '@snailicide/g-library/node'
// @ts-expect-error: Could not find a declaration file for module 'rollup-plugin-bundle-inject'
import { omit } from 'ramda'
import { ensureArray } from 'ramda-adjunct'
import type { RollupOptions } from 'rollup'
import { OutputOptions } from 'rollup'
import bundleInject from 'rollup-plugin-bundle-inject'
import pkg from './package.json' assert { type: 'json' }

const ENTRY_FILE_PATH = './src/nodes/**/ui.ts'
const PRINT_EXPORTS: boolean = false

const entryFileInfo = node.getFilePathArr(ENTRY_FILE_PATH)

const entryOutputs = entryFileInfo.map((value: FilePath) => {
    const nodeName: string = value.parentdirname
    const _directory_paths = {
        output_dir: `./dist/nodes/${nodeName}`,
        source_dir: `./src/nodes/${nodeName}`,
    }
    const config = rollup.getConfigEntries(
        _directory_paths,
        [
            {
                export_key: 'ui',
                export_types: ['browser_default'],
                library_name: `gbtNodeRedUI${stringUtils.pascalCase(nodeName)}`,
                // out_file_name_override: nodeName,
            },
        ],
        [
            ...rollup.DEFAULT_PLUGINS_BUNDLED,
            bundleInject({
                rename: `${nodeName}.html`,
                // specify the template
                target: `./src/nodes/${nodeName}/ui.html`,
            }),
        ],
        pkg,
    )

    const newestObj = config.map((outer) => {
        const outputArr = ensureArray<OutputOptions>(
            outer.config.output !== undefined ? outer.config.output : [],
        )
        const newVal = {
            ...outer.config,
            output: outputArr.map((value: OutputOptions): OutputOptions => {
                const newObj = omit(['file'], value)
                return { ...newObj, dir: _directory_paths.output_dir }
            }),
        }
        return { ...outer, config: newVal }
    })
    return newestObj
})

const CONFIG_OBJ = entryOutputs.flat()

console.log(JSON.stringify(CONFIG_OBJ, undefined, 4))
const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
