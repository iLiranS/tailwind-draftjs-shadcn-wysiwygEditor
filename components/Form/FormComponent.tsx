'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Editor, RawDraftContentState } from 'draft-js';
import RTEditor from '../Editor/RTEditor';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';
import { getContentHTML } from '../Editor/Renderer/rendererFunctions';

const initialDraft={"blocks":[{"key":"foo","text":"My Editor","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"alt16","text":"Features:---","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bftea","text":"Headings 1-6","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c08tp","text":"Quote","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c6tu","text":"Dot list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"731ff","text":"Num list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"evq9t","text":"Code blocks","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"84v3i","text":"Inline styling : Bold, Italic, Underline, Monospace","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":17,"length":4,"style":"BOLD"},{"offset":23,"length":6,"style":"ITALIC"},{"offset":42,"length":9,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"e0nvn","text":"Image & link inserting (url only) into text.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"90fd9","text":"seperator line","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"44kjq","text":"Examples :---","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7agkt","text":"Quote","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eqctr","text":"This is a quote","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"14oo3","text":"Lists","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"agd4a","text":"Dot list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"n40f","text":"Dot list 2","type":"unordered-list-item","depth":1,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dudg4","text":"Dot list 3 (max)","type":"unordered-list-item","depth":2,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31hkl","text":"there is also num list","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ogr1","text":"num list","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5b6l6","text":"num list 2","type":"ordered-list-item","depth":1,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9962f","text":"num list 3","type":"ordered-list-item","depth":2,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"20ecj","text":"Code block---","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"a7qca","text":"the code block is not highlighted in the editor, but can be highlighted when you render it (explanation below).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b2ank","text":"//this is a code block\nconsole.log(\"hello world\");","type":"code","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3drq8","text":"for inline code, use monospace","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":17,"length":13,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"3p4nl","text":"Images & links---","type":"header-five","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4c3sg","text":"To add an image, select text to be an alt and click on the image button.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1di14","text":"example","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":7,"key":0}],"data":{}},{"key":"7uc0q","text":"to insert link, simply paste it, or select a text and click on the link icon, my github","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":78,"length":9,"key":1}],"data":{}},{"key":"e20da","text":"there are also undo and redo buttons, alongside some keyboard shortcuts.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5vdcf","text":"Tech stack :---","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"urp9","text":"Next.js","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b9mjj","text":"Draft.js + Draftjs-to-html","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"em47k","text":"cheerio","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"egcgl","text":"highlight.js","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d25nl","text":"Shadcn + next themes","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eramh","text":"Tailwind","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"11mi2","text":"Typescript","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3c7p3","text":"React icons","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1ug68","text":"Notes---","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b6ic1","text":"Unfortunately, this editor will not work well in mobile, because Draft.js mobile pairing is bad (selection problems).","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"b4hdg","text":"To use the seperator line, simply write \"-\" three times.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":40,"length":3,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"2ghu","text":"Using num list or dot list one after another without anything in between will cause weird behavior in rendering them, so simply seperate them using text or empty row in between.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7ckv","text":"How to use the editor:---","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6uffi","text":"make sure to copy the editor file, the editor styles, Shadcn, and initialize theme and css variables. (If you don't want to use shadcn or css variables, you can customize it with some work).","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6sam6","text":"Create a component of which you will render the Editor inside and give it basic styles as width and height.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"t1lg","text":"Create a react ref to forward to the editor and content state to store the content. (optionally) : give the editor initial content in a form of RawDraftContentState, useful for editing existing forms.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":144,"length":20,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"65oeq","text":"When you are done with editing the form, use the getContent function to convert it to html string and save it how you want to.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":49,"length":10,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"cpuvj","text":"when you want to render the html string, use the allPreCodeToHighlighted function on the string, then you can render it as dangerouslySetInnerHTML.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":17,"length":7,"style":"BOLD"},{"offset":49,"length":23,"style":"CODE"},{"offset":123,"length":23,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"4tntd","text":"To view this page as a render view, visit here","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":42,"length":4,"key":2}],"data":{}}],"entityMap":{"0":{"type":"IMG","mutability":"MUTABLE","data":{"url":"https://i.ibb.co/WBHKj5X/best-text-editors-1024x512.webp"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://github.com/iLiranS","rel":"noopener noreferrer","target":"_blank","title":"https://github.com/iLiranS","url":"https://github.com/iLiranS"}},"2":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://lirans-draft-editor.vercel.app/render"}}}}

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
      if(!content) { toastNotify('Error','Enter some data first','destructive'); return null};
      const htmlContent = getContentHTML(content);
      return htmlContent;
    }

    const saveToClipBoard=(text:string)=>{
      navigator.clipboard.writeText(text); 
      toastNotify('Success','Copied Text to clipboard','default');
    }
    const copyJSONHandler = () =>{
      saveToClipBoard(JSON.stringify(content));
    }
    const copyHTMLHandler = () =>{
      const contentHTML = getContent();
      if (!contentHTML) return;
      saveToClipBoard(JSON.stringify(contentHTML));
    }

    
  return (
    <div className='h-[calc(100dvh-80px)] grid grid-rows-[1fr,max-content] gap-2'>
      <RTEditor initialEditorState={initialDraft as RawDraftContentState} ref={editorRef} setContent={updateContentHandler}/>
      <div className='flex items-center gap-2 w-full justify-center'>
      <Button onClick={copyJSONHandler} className='w-fit  active:scale-95 transition-transform'>Copy JSON</Button>
      <Button onClick={copyHTMLHandler} className='w-fit  active:scale-95 transition-transform'>Copy HTML</Button>
      </div>
    </div>
  )
}

export default FormComponent