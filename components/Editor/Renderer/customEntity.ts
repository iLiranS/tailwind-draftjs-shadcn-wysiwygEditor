import { DraftEntityMutability, DraftEntityType, RawDraftContentState } from "draft-js";
import React from "react";
import draftToHtml from 'draftjs-to-html'


type DraftEntity = {
    type: DraftEntityType;
    mutability: DraftEntityMutability;
    data: any;
};

export const customEntityTransform = (entity: DraftEntity, text: string):string | undefined | React.ReactNode => {
    if (entity.type === 'IMG')
    return(
    `<div className='relative w-full aspect-video RTEImageContainer grid place-items-center bg-red-200'>
        <img className='w-auto max-w-full' loading='lazy' src=${entity.data.url} alt=${entity.data.url}/>
    </div>`
    )
  // LINK
    if (entity.type === 'LINK') return `<a title=${entity.data.url} href="${entity.data.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
    if (text.length>1) { console.log('found come'); return `<p className='text-red-200'>${text}</p>`}
};


export const processHTMLString = (text: string): string => {
    //  "---" replace with divider style.
    const processedText = text.replace(/---/g, "<div class='w-full h-[0.1rem] bg-foreground/10'></div>");
    // const preToShikiCode= text.
    // add more if u want...
    return processedText;
};

export const dataToHTML = (content: RawDraftContentState) => {
        const markup = draftToHtml(content,{},false,customEntityTransform);
        return markup;
    }

