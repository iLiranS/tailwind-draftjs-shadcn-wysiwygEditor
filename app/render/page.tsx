import React from 'react'



const previewContent="<h1>Hello</h1>\n<pre>code block</pre>\n<pre>console.log(\"hello\");</pre>\n"


const page = async() => {

  return (
    <div className='max-w-2xl mx-auto relative'>
        <div dir='' className='data' dangerouslySetInnerHTML={{__html:previewContent}}/>
    </div>

  )
}

export default page
