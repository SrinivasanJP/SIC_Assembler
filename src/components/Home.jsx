import React from 'react'

const Home = ({setPage}) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10'>
        <button onClick={()=>setPage("Pass1Editor")} className='bg-gray-900 p-5 w-[47.5%] rounded-2xl hover:bg-gray-800'>
            Pass 1: Code to Intermediate File & SYMTAB
        </button>
      
    </div>
  )
}

export default Home