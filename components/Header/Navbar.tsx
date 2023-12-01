'use client'
import React from 'react'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  return (
    <div className='w-full p-2 flex justify-end'>
        <ModeToggle/>
    </div>
  )
}

export default Navbar