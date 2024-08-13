import React, { useState } from 'react'
import Home from './components/Home';
import Pass1Editor from './components/Pass1Editor';

const App = () => {
  const [page, setPage] = useState("home");
  const renderPage = ()=>{
    switch (page) {
      case "home":
        return <Home setPage={setPage}/>
      case "Pass1Editor":
        return <Pass1Editor setPage={setPage}/>
      default:
        return <Home setPage={setPage}/>
    }
  }
  return (
    <div className='bg-gray-950 w-screen h-screen text-white p-5'>
      <div onClick={()=>setPage("home")} className='bg-slate-700 p-5 rounded-lg text-2xl font-bold cursor-pointer'>SIC Assembler</div>
    
    
     {renderPage()}

    </div>
  )
}

export default App