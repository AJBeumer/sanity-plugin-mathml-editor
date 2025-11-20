// components/MathFormulaInput.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {useEffect, useRef} from 'react'
import 'mathlive'
import {Card, Stack, Text} from '@sanity/ui'
import {set, unset} from 'sanity'

type MathFormulaValue = {
    latex?: string
    mathml?: string
}

type Props = {
    value?: MathFormulaValue
    onChange: (patches: any) => void
    schemaType: any
}

// Wrap the <math-field> web component in a React component
const MathField = React.forwardRef<any, any>((props, ref) => {
    return React.createElement('math-field', {...props, ref})
})
MathField.displayName = 'MathField'

export function MathFormulaInput(props: Props) {
    const {value, onChange, schemaType} = props
    const mfRef = useRef<any>(null)

    // 🔹 Focus the math field as soon as the dialog opens
    useEffect(() => {
        const mf = mfRef.current
        if (mf && typeof mf.focus === 'function') {
            mf.focus()
        }
    }, [])

    // Sync stored latex → math-field when value changes externally
    useEffect(() => {
        const mf = mfRef.current
        if (!mf || !mf.getValue || !mf.setValue) return

        const current = mf.getValue()
        if (value?.latex && current !== value.latex) {
            mf.setValue(value.latex, {silenceNotifications: true})
        }
    }, [value?.latex])

    const updateFromMathField = (target: any) => {
        if (!target || !target.getValue) return

        const latex: string = target.getValue()
        const mathml: string = target.getValue('math-ml')

        if (!latex && !mathml) {
            onChange([unset(['latex']), unset(['mathml'])])
            return
        }

        onChange([
            set(latex, ['latex']),
            set(mathml, ['mathml']),
        ])
    }

    const handleInput = (event: any) => {
        updateFromMathField(event.target)
    }

    const handleBlur = (event: any) => {
        updateFromMathField(event.target)
    }

    return (
        <Stack space={3}>
            <Text weight="semibold">{schemaType.title}</Text>

            {/* Outer border */}
            <Card padding={2} radius={2} border>
                <MathField
                    ref={mfRef}
                    virtualKeyboardMode="onfocus"
                    onInput={handleInput}
                    onBlur={handleBlur}
                    style={{
                        width: '100%',
                        minHeight: '3rem',
                        fontSize: '1.4rem',
                        border: 'none',
                        boxShadow: 'none',
                        outline: 'none',
                    }}
                />
            </Card>

            {schemaType.description && (
                <Text size={1} muted>
                    {schemaType.description}
                </Text>
            )}
        </Stack>
    )
}
