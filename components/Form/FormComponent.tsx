'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Editor, RawDraftContentState } from 'draft-js';
import RTEditor from '../Editor/RTEditor';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const FormComponent = () => {
    const [content,setContent] = useState<RawDraftContentState>();
    const {toast} = useToast();

    const toastNotify = (title:string,description:string,variant:'default'|'destructive') =>{
      toast({title,description,variant})
    }


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
      <Button onClick={()=>{navigator.clipboard.writeText(JSON.stringify(content)); toastNotify('Success','copied to clipboard','default')}} className='w-fit mx-auto active:scale-95 transition-transform'>Copy Raw</Button>
    </div>
  )
}

export default FormComponent