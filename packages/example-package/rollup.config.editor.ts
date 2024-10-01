import { glob } from 'glob'
import { Plugin, PreRenderedChunk } from 'rollup'
import type {
    LiteralToPrimitiveDeep,
    Merge,
    PackageJson,
    ReadonlyDeep,
} from 'type-fest'
import fs from 'fs'
import path from 'path'
import packageJson from './package.json' assert { type: 'json' }

type NodeRed = {
    'node-red'?: {
        nodes?: Record<string, string>
    }
}
type NodeRedPackage = Merge<LiteralToPrimitiveDeep<PackageJson>, NodeRed>
const _pkg: ReadonlyDeep<typeof packageJson> = packageJson

export const nodeRedPkg: NodeRedPackage = packageJson

const allNodeTypes: Array<string> =
    nodeRedPkg['node-red'] && nodeRedPkg['node-red'].nodes
        ? Object.keys(nodeRedPkg['node-red'])
        : []

/*
const htmlBundle = () => {
  return {
    name: "htmlBundle",
    renderChunk(code, chunk, _options) {
      const editorDir = path.dirname(chunk.facadeModuleId);
      const htmlFiles = glob.sync(path.join(editorDir, "*.html"));
      const htmlContents = htmlFiles.map((fPath) => fs.readFileSync(fPath));
console.log(
    "HTML CONTENTS:::",htmlFiles,htmlContents
)
      code =
        '<script type="text/javascript">\n' +
        code +
        "\n" +
        "</script>\n" +
        htmlContents.join("\n");

      return {
        code,
        map: { mappings: "" },
      };
    },
  };
};
56
"node-red": {
    "nodes": {
      "transform-text": "./dist/nodes/transform-text/transform-text.js"
    }
  },
  const htmlWatch = ()=> {
  const _plugin :PluginContext= {
    name: "htmlWatch",
    load(id:string) {
      const editorDir = path.dirname(id);
      const htmlFiles = glob.sync(path.join(editorDir, "*.html"));
      htmlFiles.map((file) => this.addWatchFile(file));
    },
  };
  return _plugin
};*/

//export default function PluginVue(userOptions: Partial<Options> = {}): Plugin {

export const htmlBundle = (): Plugin => {
    const _plugin: Plugin = {
        name: 'htmlBundle',
        renderChunk(code: string, chunk: PreRenderedChunk) {
            if (chunk.facadeModuleId !== null) {
                const editorDir = path.dirname(chunk.facadeModuleId)
                const htmlFiles = glob.sync(path.join(editorDir, '*.html'))
                const htmlContents = htmlFiles.map((fPath: string) =>
                    fs.readFileSync(fPath),
                )

                code =
                    '<script type="text/javascript">\n' +
                    code +
                    '\n' +
                    '</script>\n' +
                    htmlContents.join('\n')
                console.log(`THE HTMLENTRY IS:::::${code}`)

                return {
                    code,
                    map: { mappings: '' },
                }
            }
            return undefined
        },
    }
    return _plugin
}

const makePlugins = (nodeType: string) => [
    // htmlWatch(),
    /*typescript({
    lib: ["es5", "es6", "dom"],
    include: [
      `src/nodes/${nodeType}/${nodeType}.html/!**!/!*.ts`,
      `src/nodes/${nodeType}/shared/!**!/!*.ts`,
      "src/nodes/shared/!*
      *!/!*.ts",
    ],
    target: "es5",
    tsconfig: false,
    noEmitOnError: process.env.ROLLUP_WATCH ? false : true,
  }),*/
    // htmlBundle(),
]

const makeConfigItem = (nodeType: string) => ({
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

export default allNodeTypes.map((nodeType) => makeConfigItem(nodeType))
