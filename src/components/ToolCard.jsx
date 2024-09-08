import React from 'react'
import { common } from '../styles/common'

const ToolCard = ({toolName="",setPage="",pass1Img,isUnderDev=false}) => {
  return (
    <div className=' backdrop-blur-md rounded-md px-10 pb-5 pt-3 shadow-sm shadow-white group flex flex-col justify-center items-center w-[20em] h-[25em]' onClick={(toolPage)=>setPage(toolPage)} >

        {isUnderDev?<div className=' h-[60%] flex justify-center items-center'>
          <h1 className=' text-red-400'>Tool under Development</h1>
        </div>:<div className=' overflow-hidden mb-5'>
        {pass1Img && <img src={pass1Img} alt="pass1 assembler" className={"w-[23em] rounded-md translate-y-10 transition-all duration-700 -rotate-6 scale-90 group-hover:rotate-0 hover:scale-100  group-hover:translate-y-0 "} />}
        </div>}
        
        <button onClick={(toolPage)=>setPage(toolPage)} className={' text-xl p-5 w-fit group-hover:animate-pulse  flex-none '+ common.Buttonblue}>
              {toolName}
          </button>
      </div>
        
  )
}

export default ToolCard