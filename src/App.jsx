import React, { useState } from 'react'
import Home from './components/Home';
import Pass1Editor from './components/Pass1Editor';
import { common } from './styles/common';

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
    <div className=" text-white p-5 w-screen h-screen bg-[url('https://firebasestorage.googleapis.com/v0/b/roxssoftware.appspot.com/o/backSpace.jpg?alt=media&token=f8fdd6e5-c240-4a2d-81cc-b72bad0f69b9')] shadow-[inset_0_0_100px_100px_#0c1015] bg-cover bg-[center_right_45em] md:bg-center flex  flex-col">
      <div onClick={()=>setPage("home")} className={' bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD_14.06%,#709DF744_51.02%,#4D78EF11_79.09%)] backdrop-blur-lg shadow-sm shadow-white p-5 rounded-lg text-2xl font-bold cursor-pointer'}><h1 className={common.textNabula}>SIC Assembler</h1></div>
    
    
     {renderPage()}

    </div>
  )
}

export default App