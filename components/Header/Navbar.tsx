'use client'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { FaGithub } from "react-icons/fa";
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <div className='w-full p-2 flex justify-end gap-2'>
        <Button>
        <a href='https://github.com/iLiranS/tailwind-draftjs-shadcn-wysiwygEditor' target='_blank'><FaGithub/></a>
        </Button>
        <ModeToggle/>
    </div>
  )
}

export default Navbar