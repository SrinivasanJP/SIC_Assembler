import React from 'react'
import ToolCard from './ToolCard'
import pass1Img from"../assets/pass1.webp"

const Home = ({setPage}) => {
  const tools = [{
    toolName:"SIC and SIC\XE Pass 1 and Pass 2",
    pageName:"Pass1Editor",
    isUnderDev:false,
    img:pass1Img
  },
  {
    toolName:"SIC Playground",
    isUnderDev:true,
    pageName:""
  },{
    toolName:"Absolute Loader",
    isUnderDev:true,
    pageName:"absoluteLoader"
  },{
    toolName:"Direct Linker",
    isUnderDev:true,
    pageName:"directLinker"
  }
]
  return (
    <div className='flex justify-center items-center flex-wrap gap-10 mt-10'>
      {
        tools.map((data, index)=><ToolCard toolName={data.toolName} setPage={()=>setPage(data.pageName)} pass1Img={data.img && data.img} isUnderDev={data.isUnderDev} key={index}/>)}
    </div>
  )
}

export default Home