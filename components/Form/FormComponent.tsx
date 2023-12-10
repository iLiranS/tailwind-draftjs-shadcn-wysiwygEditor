'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Editor, RawDraftContentState } from 'draft-js';
import RTEditor from '../Editor/RTEditor';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { getContentHTML } from '../Editor/Renderer/rendererFunctions';

const FormComponent = () => {
    const [content,setContent] = useState<RawDraftContentState>();
    const {toast} = useToast();

    const toastNotify = (title:string,description:string,variant:'default'|'destructive') =>{
      toast({title,description,variant})
    }

    const editorRef = useRef<Editor>(null);

    // updates on each editor change
    const updateContentHandler = useCallback((newContent:RawDraftContentState) =>{
      setContent(newContent);
    },[])

    // focus issues resolver
    useEffect(()=>{
      editorRef.current?.focus();
    },[content])

    // get finalize content data to html string.
    const getContent = () =>{
      if(!content) { toastNotify('Error','Enter some data first','destructive'); return};
      const htmlContent = getContentHTML(content);
      return htmlContent;
    }

    const saveToClipBoard=()=>{
      const htmlString = getContent();
      navigator.clipboard.writeText(JSON.stringify(htmlString)); 
      toastNotify('Success','Copied Text to clipboard','default');
    }
    
  return (
    <div className='h-[calc(100dvh-80px)] grid grid-rows-[1fr,max-content]'>
      <RTEditor ref={editorRef} setContent={updateContentHandler}/>
      <Button onClick={saveToClipBoard} className='w-fit mx-auto active:scale-95 transition-transform'>Copy Raw</Button>
    </div>
  )
}

export default FormComponent