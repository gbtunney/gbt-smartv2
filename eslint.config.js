import { EsLint } from '@snailicide/build-config'
import tsEslint from 'typescript-eslint'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const FLAT_CONFIG = await EsLint.flatConfig(__dirname)

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['**/.history/**', '**/*.map', '**/npm_node_modules/**'],
    },
    ...tsEslint.config({
        extends: [tsEslint.configs.disableTypeChecked],
        files: ['**/*.js', '**/*.d.*'],
        rules: {},
    }),
    {},
    ...tsEslint.config({
        files: ['**/*.{ts,mts,cts,js,mjs,cts}'],
        rules: {
            'import/no-default-export': 'off',
        },
    }),
]
