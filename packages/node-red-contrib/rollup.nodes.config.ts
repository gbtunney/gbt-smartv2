/** Rollup config compiles the node-red index file */
import { rollup } from '@snailicide/build-config'
import { stringUtils } from '@snailicide/g-library'
import { FilePath, node } from '@snailicide/g-library/node'
import type { RollupOptions } from 'rollup'
import pkg from './package.json' assert { type: 'json' }

const ENTRY_FILE_PATH = './src/nodes/**/index.ts'
const PRINT_EXPORTS: boolean = false

const entryFileInfo = node.getFilePathArr(ENTRY_FILE_PATH)

const entryOutputs = entryFileInfo.map((value: FilePath) => {
    const nodeName: string = value.parentdirname
    const _directory_paths = {
        output_dir: `./dist/nodes/${nodeName}`,
        source_dir: `./src/nodes/${nodeName}`,
    }
    return [
        ...rollup.getConfigEntries(
            _directory_paths,
            [
                {
                    export_key: '*',
                    export_types: ['require'],
                    library_name: `gbtNodeRed${stringUtils.pascalCase(nodeName)}`,
                    out_file_name_override: nodeName,
                },
            ],
            rollup.DEFAULT_PLUGINS_BUNDLED,
            pkg,
        ),
    ]
})

const CONFIG_OBJ = entryOutputs.flat()

const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
