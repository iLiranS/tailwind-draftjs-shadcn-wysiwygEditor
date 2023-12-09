import {ContentState,ContentBlock, EntityInstance, DraftDecorator} from 'draft-js'

interface LinkProps {
  contentState: ContentState;
  entityKey: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  const entity = contentState.getEntity(entityKey) as EntityInstance;


  const handleClick = (event: React.MouseEvent) => {
    if (!entity.getMutability().includes('IMMUTABLE')) {
      event.preventDefault();
      // Handle the link click (e.g., open a new window or navigate)
      window.open(url, '_blank');
    }
  };


  return (
    <a title={url} href={url} onClick={handleClick} className='a_link' target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

function findLinkEntities(contentBlock: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) {
  contentBlock.findEntityRanges(
    (character:any) => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },
    callback
  );
}

// vercel deployment typesafe error solution
interface CustomDraftDecorator extends DraftDecorator<LinkProps> {
  component:any;
}

export const testLink:CustomDraftDecorator = {strategy:findLinkEntities,component:Link}
