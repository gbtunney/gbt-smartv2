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

//import { TransformTextNode, TransformTextNodeDef } from './modules/types.js'
//import { TRANSFORM_TEXT_OPERATION } from './shared/types.js'

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
        //_node.on('input',(msg:{payload:string})=>{
        //  msg.payload = msg.payload.toLowerCase();
        //_node.send(msg)
        //  })
        /*   node.on('input', function(msg:{payload:string},send,done){
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });*/
        RED.nodes.registerType('lower-case', LowerCaseNode)
    }
    /*  function TransformTextNodeConstructor(
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
          }*/

    //  RED.nodes.registerType('lowercase-text', funcLowercase)
    console.log('THE NODE INIT!!!!!!!!!!', RED.nodes)
}

console.log('THE NODE INIT!!!!!!!!!!plain')

export default nodeInit
