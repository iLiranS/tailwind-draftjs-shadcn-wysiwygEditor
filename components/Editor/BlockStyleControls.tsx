
import React from 'react'
import { EditorState } from 'draft-js'
import {AiOutlineUnorderedList,AiOutlineOrderedList} from 'react-icons/ai'

import StyleButton from './StyleButton'
import StylesControlHolder from './StylesControlHolder'

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one', title:'H1' },
  { label: 'H2', style: 'header-two', title:'H2' },
  { label: 'H3', style: 'header-three', title:'H3' },
  { label: 'H4', style: 'header-four', title:'H4' },
  { label: 'H5', style: 'header-five', title:'H5' },
  { label: 'H6', style: 'header-six' , title:'H6'},
  { label: '"', style: 'blockquote' , title:'quote'},
  { label: <AiOutlineUnorderedList/>, style: 'unordered-list-item', title:'dot list' },
  { label: <AiOutlineOrderedList/>, style: 'ordered-list-item', title:'num list' },
  { label: '</>', style: 'code-block', title:'code' },
]

type Props = {
  editorState: EditorState
  onToggle: (bockType: string) => void
}

const BlockStyleControls = ({ editorState, onToggle }: Props) => {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <StylesControlHolder>

      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
          title={type.title}
        />
      ))}
      
    </StylesControlHolder>
  )
}

export default React.memo(BlockStyleControls)