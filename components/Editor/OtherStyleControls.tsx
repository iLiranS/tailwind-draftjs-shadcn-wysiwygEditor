import { EditorState } from 'draft-js';
import React from 'react'
import { CiUndo,CiRedo,CiLink,CiImageOn  } from "react-icons/ci";

import StylesControlHolder from './StylesControlHolder';
import StyleButton from './StyleButton';

type btnStyleProps= {label:any,style:string,title:string}

const OTHER_STYLES:btnStyleProps[] = [
    { label: <CiUndo/>, style: 'undo', title:'Undo (Ctrl+Z)' },
    { label: <CiRedo/>, style: 'redo', title:'Redo (Ctrl+Y)' },
    { label: <CiLink/>, style: 'link', title:'add link' },
    { label: <CiImageOn/>, style: 'image', title:'Image link'},
]

type Props = {
    editorState: EditorState
    onToggle: (action: string) => void
}

const OtherStyleControls = ({ editorState, onToggle }: Props) => {
    const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <StylesControlHolder>
    {OTHER_STYLES.map((type) => (
        <StyleButton
            className=''
            key={type.title}
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

export default OtherStyleControls