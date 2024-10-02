import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { common } from '../styles/common';
import {processPass1} from '../helpers/pass1Helper'
import IntermediateTable from './IntermediateTable';
import { processPass2 } from '../helpers/pass2Helper';
import { OPTAB } from '../helpers/constants';
import TypeWriter from './TypeWriter';
const Pass1Editor = () => {
    const [code, setCode] = useState('COPY START 1000\n');
    const [intermediateFile, setIntermediateFile] = useState('');
    const [symtab, setSymtab] = useState('');
    const [programName, setProgramName] = useState('');
    const [error, setError] = useState({state:false, message:""});
    const [objCode, setObjCode] = useState();
    const [programLen, setProgramLen] = useState();

    console.log(objCode);
    const handleEditorChange = (value) => {
        setCode(value);
    };
    const clearCache = ()=>{
        setObjCode("");
        setProgramLen("");
        setSymtab("");
        setIntermediateFile("");

    }
    return (
        <div className=' flex flex-col h-screen gap-3 p-3'>
            <div className=' flex w-full justify-evenly gap-10 '>
        <div onClick={()=>processPass1(code,setProgramName,setSymtab,setIntermediateFile,setError,setProgramLen)} className={"flex-1 rounded-lg flex justify-center mt-5 cursor-pointer items-center "+common.Buttonblue}>
        <h1 className='text-xl font-bold text-center '>{`PASS 1 Output`}</h1>
        </div>
        <div onClick={()=>processPass2(intermediateFile, symtab, setObjCode, setError, setIntermediateFile,programLen)} className={"flex-1 rounded-lg flex justify-center mt-5 cursor-pointer "+common.Buttonblue}>
        <h1 className='text-xl font-bold '>{`PASS 2 Output`}</h1>
        </div>
        <div onClick={()=>clearCache()} className={"flex-1 rounded-lg flex justify-center mt-5 cursor-pointer "+common.Buttonblue}>
        <h1 className='text-xl font-bold '>{`Clear Cache`}</h1>
        </div>
        
        </div>
            <div className='flex flex-wrap gap-5 flex-1'>
            <div className=' lg:w-[50%] bg-[#1e1e1e] p-5 rounded-lg w-full '>
                <h1 className='text-2xl font-bold mb-5'>Program: {programName} </h1>
            <Editor
                height="50vh"
                defaultLanguage="cpp"
                defaultValue={code}
                options={{
                    fontSize: 14, 
                    lineNumbers: "on",
                    wordWrap: "on",
                    automaticLayout:true,
                    scrollBeyondLastLine:false
                }}
                theme='vs-dark'
                onChange={handleEditorChange}
            />
            </div>
           
            <div className='flex justify-around flex-col gap-5 flex-1'>
                
                    <IntermediateTable intermediateFile={intermediateFile} error={error}/>
                <div className='flex-1 bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD05_14.06%,#709DF711_51.02%,#4D78EF55_79.09%)] backdrop-blur-md shadow-sm shadow-white rounded-lg p-3 overflow-auto max-h-[100em] min-h-[20em]'>
                    <h1 className='mb-10'>SYMTAB:</h1>
                    {/* <pre>
                    {symtab}
                    </pre> */}
                    <TypeWriter data={symtab}/>
                </div>
                <div className='flex-1 bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD05_14.06%,#709DF711_51.02%,#4D78EF55_79.09%)] backdrop-blur-md shadow-sm shadow-white rounded-lg p-3 overflow-auto'>
                    
                <h1 className='mb-10'>OBJECT PROGRAM:</h1>
                <TypeWriter data={objCode}/>
                </div>
            </div>
        </div>
        
        
        </div>
        
    );
};
export default Pass1Editor