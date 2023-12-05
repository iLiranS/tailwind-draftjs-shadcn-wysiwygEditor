import React from 'react'
import draftToHtml from 'draftjs-to-html'
import { RawDraftContentState } from 'draft-js';
import { customEntityTransform } from '@/components/Editor/Renderer/customEntity';


// const fakeDataUpdated =`{"blocks":[{"key":"foo","text":"This is a header","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"91lk6","text":"this is a list","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2lhb5","text":"inner list","type":"unordered-list-item","depth":1,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f63ck","text":"inner inner list","type":"unordered-list-item","depth":2,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"85hm2","text":"inner list 2","type":"unordered-list-item","depth":1,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ah2br","text":"num list","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dk9l7","text":"inner num list","type":"ordered-list-item","depth":1,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dl8sl","text":"triple inner num list","type":"ordered-list-item","depth":2,"inlineStyleRanges":[{"offset":13,"length":4,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"f2lvj","text":"code block ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"epdeh","text":"second line code block","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4bsms","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6h4jj","text":"quote after a space ","type":"blockquote","depth":0,"inlineStyleRanges":[{"offset":0,"length":20,"style":"BOLD"},{"offset":0,"length":20,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"enb8b","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8mi9a","text":"link HERE","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":4,"key":0}],"data":{}},{"key":"ckjnh","text":"Random image :","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fu5tf","text":"random alt","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":10,"key":1}],"data":{}},{"key":"e7ul0","text":"Follow up with some header 3","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"125tu","text":"and finish up with some regular text. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"br6ai","text":"Thanks for visiting ^_^","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"https://lirans.vercel.app"}},"1":{"type":"IMG","mutability":"MUTABLE","data":{"url":"https://picsum.photos/1920/1080"}}}}`
const fakeDataUpdated=`{"blocks":[{"key":"foo","text":"now regular text  check now regular text  check now regular text  check now regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  checknow regular text  check","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b4l9m","text":"checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow checknow ","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`

const dataToHTML = (content: string) => {
    const parsedState = JSON.parse(content) as RawDraftContentState;
    const markup = draftToHtml(parsedState,{},false,customEntityTransform);
    return markup;
  }

const page = () => {
    const dataHTML = dataToHTML(fakeDataUpdated);
  return (
    <div className='max-w-2xl mx-auto relative'>
        <div dir='' className='data' dangerouslySetInnerHTML={{__html:dataHTML}}/>
    </div>

  )
}

export default page
