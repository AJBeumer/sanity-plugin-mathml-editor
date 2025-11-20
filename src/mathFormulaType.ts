// src/mathFormulaType.ts
import {defineField, defineType} from 'sanity'
import {MathFormulaInput} from './MathFormulaInput'
import {MathFormulaPreview} from './MathFormulaPreview'

export const mathFormulaType = defineType({
    name: 'mathFormula',
    title: 'Math formula',
    type: 'object',
    fields: [
        defineField({
            name: 'latex',
            title: 'LaTeX',
            type: 'text',
        }),
        defineField({
            name: 'mathml',
            title: 'MathML',
            type: 'text',
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            latex: 'latex',
        },
    },
    components: {
        input: MathFormulaInput,
        preview: MathFormulaPreview as any,
    },
    description: 'Visual math editor (LaTeX + MathML).',
})
