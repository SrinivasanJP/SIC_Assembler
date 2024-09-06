import React from 'react'
import { common } from '../styles/common'

const ToolCard = ({toolName="Pass 1: Code to Intermediate File & SYMTAB",setPage,pass1Img}) => {
  return (
    <div className=' backdrop-blur-md rounded-md px-10 pb-5 pt-3 shadow-sm shadow-white group flex flex-col justify-center items-center' onClick={(toolPage)=>setPage(toolPage)} >
        <div className=' overflow-hidden mb-5'>
        <img src={pass1Img} alt="pass1 assembler" className={"w-[23em] rounded-md translate-y-10 transition-all duration-700 -rotate-6 scale-90 group-hover:rotate-0 hover:scale-100  group-hover:translate-y-0 "} />
        </div>
        
        <button onClick={(toolPage)=>setPage(toolPage)} className={' text-xl p-5 w-fit group-hover:animate-pulse '+ common.Buttonblue}>
              {toolName}
          </button>
      </div>
        
  )
}

export default ToolCard