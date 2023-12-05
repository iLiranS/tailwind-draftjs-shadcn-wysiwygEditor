import { DraftEntityMutability, DraftEntityType } from "draft-js";
import React from "react";


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
};

