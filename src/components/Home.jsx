import React from 'react'
import { common } from '../styles/common'
import pass1Img from"../assets/pass1.webp"
const Home = ({setPage}) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10'>
      <div className=' backdrop-blur-md rounded-md px-10 pb-5 pt-3 shadow-sm shadow-white group flex flex-col justify-center items-center'>
        <div className=' overflow-hidden mb-5'>
        <img src={pass1Img} alt="pass1 assembler" className={"w-[23em] rounded-md translate-y-10 transition-all duration-700 -rotate-6 scale-90 group-hover:rotate-0 hover:scale-100  group-hover:translate-y-0 "} />
        </div>
        
        <button onClick={()=>setPage("Pass1Editor")} className={' text-xl p-5 w-fit group-hover:animate-pulse hover:group-hover:animate-bounce '+ common.Buttonblue}>
              Pass 1: Code to Intermediate File & SYMTAB
          </button>
      </div>
        
      
    </div>
  )
}

export default Home