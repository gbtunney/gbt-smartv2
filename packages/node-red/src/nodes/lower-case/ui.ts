import { EditorNodeProperties, EditorRED } from 'node-red'
import { TransformTextOptions } from './index.js'

export type TransformTextEditorNodeProperties = EditorNodeProperties &
    TransformTextOptions

declare const RED: EditorRED
const regType = (): EditorRED => {
    RED.nodes.registerType('lower-case', {
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: { value: '' },
        },
        icon: 'file.svg',
        inputs: 1,
        label: function () {
            return this.name || 'lower-case'
        },
        outputs: 1,
    })

    /*    RED.nodes.registerType<TransformTextEditorNodeProperties>(
        'lower-case',
        {
            category: 'function',
            color: '#a6bbcf',
            defaults: {
                name: { value: '' },
                operation: { value: TRANSFORM_TEXT_OPERATION.UpperCase },
            },
            icon: 'transform-text.png',
            inputs: 1,
            label: function () {
                if (this.name) {
                    return this.name
                }
                switch (this.operation) {
                    case TRANSFORM_TEXT_OPERATION.UpperCase: {
                        return 'to upper case'
                    }
                    case TRANSFORM_TEXT_OPERATION.LowerCase: {
                        return 'to lower case'
                    }
                }
            },
            outputs: 1,
            paletteLabel: 'lowercase text',
        }
   )*/
    return RED
}
export default regType()
