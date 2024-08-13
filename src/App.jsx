import React, { useEffect, useState } from 'react'
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
    <div className='bg-gray-900 w-screen h-screen text-white'>
      <div className='bg-slate-700 m-10 p-5 rounded-lg text-2xl font-bold'>SIC Assembler helper</div>
    
    
     {renderPage()}

    </div>
  )
}

export default App