/** Rollup config compiles the node-red index file */
import { rollup } from '@snailicide/build-config'
import type { RollupOptions } from 'rollup'
import pkg from './package.json' assert { type: 'json' }

const PRINT_EXPORTS: boolean = true

const main_directory_paths = {
    output_dir: './dist/',
    source_dir: './src/',
}

const settingsConfig = rollup.getConfigEntries(
    main_directory_paths,
    [
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
)

const CONFIG_OBJ = [...settingsConfig]

const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
