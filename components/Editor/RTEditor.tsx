'use client'
import React, { useState } from 'react'
    
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  ContentBlock,
  DraftHandleValue,
  convertFromRaw,
  convertToRaw,
  RawDraftContentState,
  Modifier,
  Editor,
  SelectionState,
} from 'draft-js'
import 'draft-js/dist/Draft.css'

import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'
import OtherStyleControls from './OtherStyleControls'
import { combinedDecorator } from './decorators'
import { useToast } from '../ui/use-toast'


// requires update function.
// initial state is for updating existing state. (for example editing post => give this component raw draft of content)
// ref -> used for focusing issue, MUST have.
type Props =  {
  setContent: (state: RawDraftContentState) => void,
  initialEditorState?:RawDraftContentState | null
}

const emptyContentState =convertFromRaw({
  entityMap: {},
  blocks: [
  {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
      depth:0,
      inlineStyleRanges:[]
  },
  ],
});




const RTEditor = React.forwardRef(({ setContent,initialEditorState,}: Props,ref:React.ForwardedRef<Editor>) => {
  const [editorState, setEditorState] = useState(initialEditorState ? EditorState.createWithContent(convertFromRaw(initialEditorState),combinedDecorator)  :EditorState.createWithContent(emptyContentState,combinedDecorator))
  const {toast} = useToast();

  const toastNotify = (title:string,description:string,variant:'default'|'destructive') =>{
    toast({title,description,variant})
  }

  const onChange = (state: EditorState) => {
    setEditorState(state);
    const rawData = convertToRaw(editorState.getCurrentContent());
    setContent(rawData)
  }

  const mapKeyToEditorCommand = (e: any): string | null => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, editorState, 2 /* maxDepth of tab spaces*/)
      if (newEditorState !== editorState) {
        onChange(newEditorState)
      }
      return null
    }
    // add here custom keybinds.

    return getDefaultKeyBinding(e)
  }

  const handleKeyCommand = (
    command: string,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType))
  }

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))

  }

  
  const getBlockStyle = (block: ContentBlock) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote'
  
      case 'code':
        return 'RichEditor-codeblock'
      
      case 'header-one':
        return 'RichEditor-h1'
  
      case 'header-two':
        return 'RichEditor-h2'
  
      case 'header-three':
        return 'RichEditor-h3'
  
      case 'header-four':
        return 'RichEditor-h4'
  
      case 'header-five':
        return 'RichEditor-h5'
  
      case 'header-six':
        return 'RichEditor-h6'
      

      
      
  
      default:
        return 'RichEditor-default'
    }
  }



  const deleteEntityIfExist = () =>{
    console.log('entity delete called');
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const startOffset = selection.getStartOffset();
    const blockKey = selection.getStartKey();
    const currentEntityKey = contentState.getBlockForKey(blockKey).getEntityAt(startOffset);
    // If there is an entity, remove it
    if (currentEntityKey) {
      console.log('entity found');
      const newContentState = Modifier.applyEntity(
      contentState,
      selection,
      null // Setting entityKey to null removes the entity
    );
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'apply-entity'
    );
    // return EditorState.forceSelection(newEditorState, selection);
    setEditorState(newEditorState);
      
    // const withoutLink = RichUtils.toggleLink(newEditorState,selection,)
  }
}

const addEntitiy = (url:string,entitiyName:string) =>{
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    entitiyName,
    'MUTABLE',
    {url}
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
  const withLink = RichUtils.toggleLink(newEditorState,selection,entityKey);
  setEditorState(withLink);
}

const getValidOrCanceledUrl = ():string|null =>{
  let linkURL = prompt('Enter link 🔗');

  const shouldContinuePrompt = () =>{
    if (linkURL === '') return true;
    if (!linkURL) return false;
    return true;
  }

  // initial empty confirm ==> meaning delete entity.
  if (!linkURL){
    let returnVal = null;
    if (shouldContinuePrompt()) returnVal = 'empty';
    return returnVal;
  }
  // entered valid string, check for valid URL
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  while (!urlRegex.test(linkURL)){
    linkURL = prompt('Enter valid link :');
    if(!linkURL && linkURL!=='') return null;

  }

  return linkURL
}

const areKeysSelected = ():boolean =>{
  const selection = editorState.getSelection();
  if (selection.isCollapsed()) return false; // no selection
  return true;

}


  const otherStylesToggle = (action:string) =>{
    switch(action){
      case 'link':
        if (!areKeysSelected()) { toastNotify('Link Error','Select Text to add link into!','destructive'); break;};
        const linkURL = getValidOrCanceledUrl();
        if (linkURL === 'empty') deleteEntityIfExist();
        else if (linkURL){
          addEntitiy(linkURL,'LINK');
        }
        else {}
        break;
      case 'undo':
        onChange(EditorState.undo(editorState))
        break;
      case 'redo':
        onChange(EditorState.redo(editorState))
        break;
      case 'image':
        if (!areKeysSelected()) {toastNotify('Image Error','Select alt text first','destructive');break;};
        const imgURL = getValidOrCanceledUrl();
        if (imgURL === 'empty') deleteEntityIfExist();
        if (imgURL === 'empty') deleteEntityIfExist();
        else if (imgURL){
          addEntitiy(imgURL,'IMG');
        }
        else {}
        break;
    }
  }

  return (
    <div className='w-full max-w-2xl relative mx-auto h-full overflow-auto rounded-md flex flex-col gap-2'>

      <ul className='border-b-2 pb-2 w-full  z-10 border-foreground/10  flex flex-col gap-3'>
        <BlockStyleControls
        editorState={editorState}
        onToggle={toggleBlockType}
        />
        <ul className='flex justify-between flex-wrap gap-1'>
          <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
          />
          <OtherStyleControls
          editorState={editorState}
          onToggle={otherStylesToggle}
          />
        </ul>
      </ul>

      <div className='rounded-md p-2 mx-auto w-full overflow-auto h-full'>
        <Editor
          ref={ref}
          editorState={editorState}
          placeholder='Enter Your Text...'
          blockStyleFn={(block: ContentBlock) => getBlockStyle(block)}
          keyBindingFn={(e) => mapKeyToEditorCommand(e)}
          onChange={onChange}
          spellCheck={true}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  )
})

RTEditor.displayName = 'RTEditor'
export default React.memo(RTEditor)


