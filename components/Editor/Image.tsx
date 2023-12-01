import {ContentState,CompositeDecorator,ContentBlock, EntityInstance} from 'draft-js'


interface ImageProps {
    contentState: ContentState;
    entityKey: string;
    children: React.ReactNode;
}


export const Img = ({ entityKey, contentState,children }:ImageProps) => {
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


export const testImage = {strategy:findImageEntities,component:Img}