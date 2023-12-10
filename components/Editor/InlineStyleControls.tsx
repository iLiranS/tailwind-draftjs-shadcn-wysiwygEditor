import React from 'react'
    import { EditorState } from 'draft-js'
    
    import StyleButton from './StyleButton'
import StylesControlHolder from './StylesControlHolder'
    
    const INLINE_STYLES = [
        { label: 'B', style: 'BOLD', title:'Bold (Ctrl+B)' },
        { label: 'I', style: 'ITALIC', title:'Italic (Ctrl+I)' },
        { label: 'U', style: 'UNDERLINE', title:'Underline (Ctrl+U)' },
        { label: 'M', style: 'CODE', title:'Inline code' },
    ]
    
    type Props = {
        editorState: EditorState
        onToggle: (bockType: string) => void
    }
    
    const InlineStyleControls = ({ editorState, onToggle }: Props) => {
    const currentStyle = editorState.getCurrentInlineStyle()
    
    return (
        <StylesControlHolder className=''>
        {INLINE_STYLES.map((type) => (
            <StyleButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={onToggle}
                style={type.style}
                title={type.title}
            />
        ))}
        </StylesControlHolder>
        )
    }
    
    export default React.memo(InlineStyleControls)