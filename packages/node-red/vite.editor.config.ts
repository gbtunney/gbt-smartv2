import { FilePath, node } from '@snailicide/g-library/node'
import { defineConfig } from 'vite'
import {
    Config as SingleFileConfig,
    viteSingleFile,
} from 'vite-plugin-singlefile'

const viteSingleFileConfig: SingleFileConfig = {
    removeViteModuleLoader: true,
    useRecommendedBuildConfig: false,
}

const entryFiles = node
    .getFilePathArr('./src/nodes/**/ui.html')
    .map((value: FilePath) => {
        return value.absolute
    })
console.log('PATH ', entryFiles)
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: true,
        manifest: true,
        minify: false,
        outDir: './../../dist/nodes',
        rollupOptions: {
            input: entryFiles, // 'src/nodes/lower-case/ui.html',
            /*input: {
                'lower-case': 'src/nodes/lower-case/ui.html',
                'lower-case-index':'src/nodes/lower-case/index.ts',
            },*/
            output: { inlineDynamicImports: false },
        },
    },
    esbuild: {
        format: 'iife',
    },
    plugins: [viteSingleFile(viteSingleFileConfig)],
    root: './src/nodes/',
})
