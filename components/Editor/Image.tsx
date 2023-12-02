import {ContentState,ContentBlock, DraftDecorator} from 'draft-js'
import React from 'react';


interface ImageProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}


export const Img:React.FC<ImageProps> = ({ entityKey, contentState,children }) => {
    const { url, alt } = contentState.getEntity(entityKey).getData();

    return (<div className='overflow-hidden mx-auto relative w-fit max-w-full RTEImageContainer'>
                <img className='w-auto max-w-full maxHeightSize rounded-md' src={url} alt={url} />
                <section className='absolute bottom-2 right-2 bg-background text-foreground p-1 rounded-md text-sm opacity-80'>
                {children}
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