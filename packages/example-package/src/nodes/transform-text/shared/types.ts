export enum TRANSFORM_TEXT_OPERATION {
    UpperCase = 'upper',
    LowerCase = 'lower',
}

export type TransformTextOptions = {
    operation: TRANSFORM_TEXT_OPERATION
}
