'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Editor, RawDraftContentState } from 'draft-js';
import RTEditor from '../Editor/RTEditor';
import { Button } from '../ui/button';

const FormComponent = () => {
    const [content,setContent] = useState<RawDraftContentState>();
    const editorRef = useRef<Editor>(null);

    const updateContentHandler = (newContent:RawDraftContentState) =>{
      setContent(newContent);
    }

    useEffect(()=>{
      editorRef.current?.focus();
    },[content])
    
  return (
    <div className='h-[calc(100dvh-80px)] grid grid-rows-[1fr,max-content]'>
      <RTEditor ref={editorRef} setContent={updateContentHandler}/>
      <Button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(content))}} className='w-fit mx-auto'>Copy Raw</Button>
    </div>
  )
}

export default FormComponent