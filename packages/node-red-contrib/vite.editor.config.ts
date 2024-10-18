/** Vite config compiles the node-red editor ui file */
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
    .getFilePathArr('./src/nodes/**/*.html')
    .map((value: FilePath) => {
        return value.absolute
    })
export default defineConfig({
    build: {
        emptyOutDir: false,
        manifest: true,
        minify: false,
        outDir: './../../dist/nodes',
        rollupOptions: {
            input: entryFiles,
            output: { inlineDynamicImports: false },
        },
    },
    esbuild: {
        format: 'iife',
    },
    plugins: [viteSingleFile(viteSingleFileConfig)],
    root: './src/nodes/',
})
