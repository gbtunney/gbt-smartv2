import { NodeInitializer } from 'node-red'
import type { Node, NodeDef } from 'node-red'

export enum TRANSFORM_TEXT_OPERATION {
    UpperCase = 'upper',
    LowerCase = 'lower',
}

export type TransformTextOptions = {
    operation: TRANSFORM_TEXT_OPERATION
}
export type TransformTextNodeDef = {} & NodeDef & TransformTextOptions
export type TransformTextNode = Node

/* eslint @typescript-eslint/naming-convention  : "warn" */
const nodeInit: NodeInitializer = (RED): void => {
    function LowerCaseNode(
        this: TransformTextNode,
        config: TransformTextNodeDef,
    ): void {
        RED.nodes.createNode(this, config)

        const _node: TransformTextNode = this

        this.on('input', (msg, send, done) => {
            if (typeof msg.payload === 'string') {
                msg.payload = msg.payload.toLowerCase()
            }
            send(msg)
            done()
        })
        RED.nodes.registerType('lower-case', LowerCaseNode)
    }
    console.log('CUSTOM NODE INITIALIZED', RED.nodes)
}

export default nodeInit
