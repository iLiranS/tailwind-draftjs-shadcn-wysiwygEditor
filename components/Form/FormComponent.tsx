'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Editor, RawDraftContentState } from 'draft-js';
import RTEditor from '../Editor/RTEditor';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { dataToHTML, processHTMLString } from '../Editor/Renderer/customEntity';

const FormComponent = () => {
    const [content,setContent] = useState<RawDraftContentState>();
    const {toast} = useToast();

    const toastNotify = (title:string,description:string,variant:'default'|'destructive') =>{
      toast({title,description,variant})
    }


    const editorRef = useRef<Editor>(null);

    const updateContentHandler = useCallback((newContent:RawDraftContentState) =>{
      setContent(newContent);
    },[])

    useEffect(()=>{
      editorRef.current?.focus();
    },[content])

    const saveToClipBoard=async()=>{
      if(!content) { toastNotify('Error','Enter some data first','destructive'); return};
      console.log(JSON.stringify(content));
      const dataHTML = dataToHTML(content); // convert data raw content to html elements string
      const dataTransformedText = processHTMLString(dataHTML); // custom specific text to display as something else (like dividor line)
      // const modifiedText = await modifyHTML(dataTransformedText); // 
      navigator.clipboard.writeText(JSON.stringify(dataTransformedText)); 
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