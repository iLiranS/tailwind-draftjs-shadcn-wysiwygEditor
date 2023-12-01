import { DraftEntityMutability, DraftEntityType } from "draft-js";


type DraftEntity = {
    type: DraftEntityType;
    mutability: DraftEntityMutability;
    data: any;
};

export const customEntityTransform = (entity: DraftEntity, text: string):string | undefined => {
    if (entity.type === 'IMG')
    return(
    `<div class='overflow-hidden mx-auto relative w-fit max-w-full RTEImageContainer'>
        <img class='w-auto max-w-full rounded-md maxHeightSize' src='${entity.data.url}' alt='${text}' />
        <section class='absolute bottom-2 right-2 bg-background text-foreground p-1 rounded-md text-sm opacity-80'>
            ${text}
        </section>
    </div>`
    )
  // LINK
    if (entity.type === 'LINK') return `<a title=${entity.data.url} href="${entity.data.url}" target="_blank" rel="noopener noreferrer">${text}</a>`
};