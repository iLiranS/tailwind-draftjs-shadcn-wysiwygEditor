
import React from 'react'
import { EditorState } from 'draft-js'
import {AiOutlineUnorderedList,AiOutlineOrderedList} from 'react-icons/ai'
import { BsChatSquareQuote } from "react-icons/bs";

import StyleButton from './StyleButton'
import StylesControlHolder from './StylesControlHolder'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'

const HEADERS=[
  { label: 'H1', style: 'header-one', title:'H1' },
  { label: 'H2', style: 'header-two', title:'H2' },
  { label: 'H3', style: 'header-three', title:'H3' },
  { label: 'H4', style: 'header-four', title:'H4' },
  { label: 'H5', style: 'header-five', title:'H5' },
  { label: 'H6', style: 'header-six' , title:'H6'},
]

const BLOCK_TYPES = [
  { label: <BsChatSquareQuote/>, style: 'blockquote' , title:'quote'},
  { label: <AiOutlineUnorderedList/>, style: 'unordered-list-item', title:'dot list' },
  { label: <AiOutlineOrderedList/>, style: 'ordered-list-item', title:'num list' },
  { label: '<>', style: 'code', title:'code' },
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

      <HeadersMenu blockType={blockType} onToggle={onToggle}/>

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

const HeadersMenu:React.FC<{onToggle: (bockType: string) => void,blockType:string}> = ({onToggle,blockType}) =>{

  return(
  <DropdownMenu>
    <DropdownMenuTrigger>
      <p className={`select-text rounded-md aspect-square h-10 grid place-items-center p-2  bg-foreground/10 opacity-50 hover:opacity-70`}>T</p>
      <DropdownMenuContent>
        {HEADERS.map((header) =><DropdownMenuItem className={`${header.style === blockType ? 'opacity-100 bg-foreground/10' : 'opacity-70'}`} onClick={()=>{onToggle(header.style)}} key={header.label}>{header.label}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenuTrigger>
  </DropdownMenu>
  )
}

export default React.memo(BlockStyleControls)