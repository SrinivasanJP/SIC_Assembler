import React from 'react'
import { common } from '../styles/common'
import pass1Img from"../assets/pass1.webp"
const Home = ({setPage}) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10'>
      <div className=' w-[50%] backdrop-blur-md rounded-md p-10 shadow-sm shadow-white'>
        <img src={pass1Img} alt="pass1 assembler" className={"w-full rounded-md translate-y-10 "} />
        <button onClick={()=>setPage("Pass1Editor")} className={' text-xl p-5 w-fit '+ common.Buttonblue}>
              Pass 1: Code to Intermediate File & SYMTAB
          </button>
      </div>
        
      
    </div>
  )
}

export default Home