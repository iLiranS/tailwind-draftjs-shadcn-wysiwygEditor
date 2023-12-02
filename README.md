### WYSIWYG Editor based on the following technologies:
- Draft.js : the core of the editor (react)
- tailwind : styling the editor and the result html.
- shadcn  alongside next themes for buttons, editor toasts and theme.
- draftjs-to-html : used to render the result as html page for server components.

## Features

- Light/dark mode toggle
- Headings H1-H6
- inline styling : bold, underline, monospace, italic
- responsive full all screen types editor.
- undo/redo functions.
- link inserting to selected text
- Image inserting via link (to selected text which will be the alt)



## Tech Stack

**Client:** React Icons, React, radix-ui (shadcn), TailwindCSS, Next, Typescript

**Server:** None.



## FAQ

#### How to implement the Editor?

import the RTEditor and give it the required props:
- `ref` : react ref to forward it to the editor. required in order to handle focusing the editor after applying styles.
- `setContent` : a function which updates the content state.
now you've got the Editor set up and running.

#### What to do with the content? how to render it?

you can save it with `JSON.stringify` method in the db, and later on render with as you wish.

#### How to render the json content ?
you can see implementetion in the `app/render` page.
- I used `draftjs-to-html` to render it like this :
```javascript
// fetch the content from your database
const dataToHTML = (content: string) => {
    const parsedState = JSON.parse(content) as RawDraftContentState;
    const markup = draftToHtml(parsedState,{},false,customEntityTransform);
    return markup;
  }

const page = () => {
    const dataHTML = dataToHTML(content);
  return (
    <div className='max-w-2xl mx-auto'>
        <div dir='' className='data' dangerouslySetInnerHTML={{__html:dataHTML}}/>
    </div>

  )
}
```
#### How to style the rendered content ?
you can see my files as example, you can style it as you wish.

#### How to give initial content ?
To give initial content for the editor, you need to give it `RawDraftContentState`. here is an example :
```javascript
// initialPost.data  is a stringified json saved in the database.
initialRawDraftState = JSON.parse(initialPost.data) as RawDraftContentState;
// ... in return
<RTEditor initialEditorState={initialRawDraftState} ref={EditorRef} setContent={setContentHandler}/>
```

## License

Feel free to use and customize it as you wish.

