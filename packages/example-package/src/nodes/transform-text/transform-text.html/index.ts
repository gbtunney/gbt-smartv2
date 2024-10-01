import { EditorRED } from 'node-red'
import { TransformTextEditorNodeProperties } from './modules/types.js'
import { TRANSFORM_TEXT_OPERATION } from '../shared/types.js'

declare const RED: EditorRED
const regType = (): EditorRED => {
    RED.nodes.registerType<TransformTextEditorNodeProperties>(
        'transform-text',
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
            paletteLabel: 'transform text',
        },
    )
    return RED
}
export default regType()
