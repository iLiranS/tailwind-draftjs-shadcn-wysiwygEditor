import React from 'react'

const StylesControlHolder = (props:any) => {
  return (
    <li className={`flex  gap-1 h-max flex-wrap ${props.className}`}>
        {props.children}
    </li>
  )
}

export default StylesControlHolder