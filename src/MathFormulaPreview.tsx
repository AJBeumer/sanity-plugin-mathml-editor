// src/MathFormulaPreview.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef} from 'react'
import 'mathlive'

// Wrap <math-field> as a React component
const MathFieldPreview = React.forwardRef<any, any>((props, ref) => {
    return React.createElement('math-field', {...props, ref})
})
MathFieldPreview.displayName = 'MathFieldPreview'

export const MathFormulaPreview: React.FC<any> = (props) => {
    const latex = (props as any).latex as string | undefined
    const mfRef = useRef<any>(null)

    useEffect(() => {
        const mf = mfRef.current
        if (!mf || !mf.setValue) return

        if (latex) {
            mf.setValue(latex, {silenceNotifications: true})
        } else {
            mf.setValue('', {silenceNotifications: true})
        }
    }, [latex])

    return (
        <MathFieldPreview
            ref={mfRef}
            readOnly
            style={{
                width: '100%',
                minHeight: '2.4rem',
                fontSize: '1.2rem',
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
                background: 'transparent',
            }}
        />
    )
}
