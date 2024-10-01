import { EditorNodeProperties } from 'node-red'
import { TransformTextOptions } from '../../shared/types.js'

export type TransformTextEditorNodeProperties = {} & EditorNodeProperties &
    TransformTextOptions
