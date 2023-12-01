import React, { ReactNode } from 'react'
    
type Props = {
  active: boolean
  style: string
  label: string | ReactNode
  title:string
  onToggle: (bockType: string) => void
  className?:string
}

const StyleButton = ({ active, style, label, onToggle,title,className }: Props) => {

  
  const _onToggle = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggle(style)
  }


  return (
    <button title={title}
      className={`${active ? 'opacity-100' : 'opacity-50'} ${!active && `hover:opacity-70`} rounded-md  aspect-square h-10 grid place-items-center p-2  bg-foreground/10`}
      onClick={_onToggle}
    >
      <section className={className}>
        {label}
      </section>
        
    </button>
  )
}

export default React.memo(StyleButton)