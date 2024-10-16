import { NodeInitializer } from 'node-red'
import { TransformTextNode, TransformTextNodeDef } from './modules/types.js'
import { TRANSFORM_TEXT_OPERATION } from './shared/types.js'

/* eslint @typescript-eslint/naming-convention  : "warn" */
const nodeInit: NodeInitializer = (RED): void => {
    function TransformTextNodeConstructor(
        this: TransformTextNode,
        config: TransformTextNodeDef,
    ): void {
        RED.nodes.createNode(this, config)

        switch (config.operation) {
            case TRANSFORM_TEXT_OPERATION.UpperCase: {
                this.on('input', (msg, send, done) => {
                    if (typeof msg.payload === 'string') {
                        msg.payload = msg.payload.toUpperCase()
                    }
                    send(msg)
                    done()
                })
                break
            }
            case TRANSFORM_TEXT_OPERATION.LowerCase: {
                this.on('input', (msg, send, done) => {
                    if (typeof msg.payload === 'string') {
                        msg.payload = msg.payload.toLowerCase()
                    }
                    send(msg)
                    done()
                })
                break
            }
        }
    }

    RED.nodes.registerType('transform-text', TransformTextNodeConstructor)
}

export default nodeInit
