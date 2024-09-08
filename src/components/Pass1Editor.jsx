import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { common } from '../styles/common';
import {processPass1} from '../helpers/pass1Helper'
import IntermediateTable from './IntermediateTable';
const Pass1Editor = () => {
    const [code, setCode] = useState('COPY START 1000\n');
    const [isPass1Done, setPass1Done] = useState(false);
    const [intermediateFile, setIntermediateFile] = useState('');
    const [symtab, setSymtab] = useState('');
    const [programName, setProgramName] = useState('');
    const [locctr, setLocctr] = useState(0);
    const [error, setError] = useState({state:false, message:""});

    const handleEditorChange = (value) => {
        setCode(value);
    };


    return (
        <div className=' flex flex-col max-h-screen h-screen gap-3 p-3'>
            <div className='flex flex-wrap gap-5 flex-1'>
            <div className='w-full lg:w-[50%] bg-[#1e1e1e] p-5 rounded-lg flex-1'>
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
                <div className='flex-1 bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD11_14.06%,#709DF755_51.02%,#4D78EF55_79.09%)] backdrop-blur-md shadow-sm shadow-white rounded-lg p-3 overflow-auto max-h-[100em] min-h-[20em]'>
                    <h1>SYMTAB:</h1>
                    <pre>
                    {symtab}
                    </pre>
                </div>
            </div>
        </div>
        <div onClick={()=>processPass1(code,setProgramName,setSymtab,setIntermediateFile,setError,setPass1Done)} className={"w-full rounded-lg flex justify-center mt-5  "+common.Buttonblue}>
        <h1 className='text-xl font-bold '>{`Click here to get PASS ${isPass1Done?2:1} Output`}</h1>
        </div>
        </div>
        
    );
};
export default Pass1Editor