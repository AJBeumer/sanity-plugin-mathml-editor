// src/index.ts
import {definePlugin} from 'sanity'
import {mathFormulaType} from './mathFormulaType'

export const mathMLEditor = definePlugin(() => {
    return {
        name: 'sanity-plugin-mathml-editor',
        schema: {
            types: [mathFormulaType],
        },
    }
})

export {mathFormulaType}
