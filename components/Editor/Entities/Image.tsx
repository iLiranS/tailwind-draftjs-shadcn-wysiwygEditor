import {ContentState,ContentBlock, DraftDecorator} from 'draft-js'
import React from 'react';


interface ImageProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}


export const Img:React.FC<ImageProps> = ({ entityKey, contentState,children }) => {
    const { url, alt } = contentState.getEntity(entityKey).getData();

    return (
        <div className=' relative w-full aspect-video RTEImageContainer'>
                <img className='w-auto max-w-full mx-auto' loading='lazy' src={url} alt={url}/>
                <section className='flex items-center gap-1 absolute bottom-2 right-2 bg-darkBG/75 dark:bg-lightBG/75 text-lightBG dark:text-darkBG text-foreground p-1 rounded-md text-sm opacity-80'>
                    <p className='opacity-50'>Editor:</p> {children ?? ''}
                </section>
        </div>)
}

export const findImageEntities = (contentBlock:ContentBlock, callback:(start: number, end: number)=>void, contentState:ContentState) => {
    contentBlock.findEntityRanges(
    (character:any) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMG';
    },
    callback
    );
}
// vercel deployment typesafe error solution
interface CustomDraftDecorator extends DraftDecorator<ImageProps> {
    component:any;
}

export const testImage:CustomDraftDecorator = {strategy:findImageEntities,component:Img}