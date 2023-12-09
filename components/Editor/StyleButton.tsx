import React, { ReactNode} from 'react'
    
type Props = {
  active: boolean
  style: string
  label: string | ReactNode
  title:string
  onToggle: (bockType: string) => void
  className?:string
}

const StyleButton = ({ active, style, label, onToggle,title,className }: Props) => {

  
  const _onToggleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    onToggle(style);
  }

  return (
    <button  onClick={_onToggleClick} title={title}
      className={`${active ? 'opacity-100  bg-foreground/30' : 'opacity-50  bg-foreground/10'} ${!active && `hover:opacity-70`} select-text rounded-md aspect-square h-10 grid place-items-center p-2 `}
    >
      <section className={className}>
        {label}
      </section>
        
    </button>
  )
}

export default React.memo(StyleButton)