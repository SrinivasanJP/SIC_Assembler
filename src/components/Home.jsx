import React from 'react'
import ToolCard from './ToolCard'
import pass1Img from"../assets/pass1.webp"

const Home = ({setPage}) => {
  return (
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10'>
      <ToolCard toolName="SIC and SIC\XE Pass 1 and Pass 2" setPage={()=>setPage("Pass1Editor")} pass1Img={pass1Img}/>
    </div>
  )
}

export default Home