import { DraftEntityMutability, DraftEntityType, RawDraftContentState } from "draft-js";
import React from "react";
import draftToHtml from 'draftjs-to-html'
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import * as cheerio from 'cheerio';
import 'highlight.js/styles/atom-one-dark.css'


hljs.registerLanguage('javascript', javascript);

type DraftEntity = {
    type: DraftEntityType;
    mutability: DraftEntityMutability;
    data: any;
};

// transforms entities into components
const customEntityTransform = (entity: DraftEntity, text: string):string | undefined | React.ReactNode => {
    if (entity.type === 'IMG')
    return(
    `<div className='relative w-full aspect-video RTEImageContainer grid place-items-center bg-red-200'>
        <img className='w-auto max-w-full' loading='lazy' src=${entity.data.url} alt=${text}/>
    </div>`
    )
  // LINK
    if (entity.type === 'LINK') return `<a title=${entity.data.url} href="${entity.data.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
    // YOU CAN ADD OTHER ENTITIES HERE
};


const processHTMLString = (text: string): string => {
    //  "---" replace with divider style.
    const processedText = text.replace(/---/g, "<div class='w-full h-[0.1rem] bg-foreground/10'></div>");
    // add more if u want to render some text as component...
    return processedText;
};

const dataToHTML = (content: RawDraftContentState) => {
    const markup = draftToHtml(content,{},false,customEntityTransform);
    return markup;
}


export const getContentHTML = (content:RawDraftContentState) =>{
    const dataHTML = dataToHTML(content);
    const dataTransformedText = processHTMLString(dataHTML); 
    return dataTransformedText;
}
export const allPreCodeToHighlighted = (htmlString:string) =>{
    const $ = cheerio.load(htmlString);
    $('pre').each((index, element) => {
        const codeContent = $(element).text();
        const highlightedCode = hljs.highlight(codeContent, { language:'javascript'}).value;
      // Replace the original <code> content with the highlighted code
        $(element).html(highlightedCode);
    });
    return $.html();
}