import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const Pass1Editor = () => {
    const [code, setCode] = useState('// Write your code here\n');
    const [output, setOutput] = useState('');
    const [programName, setProgramName] = useState("");
    const handleEditorChange = (value) => {
        setCode(value);
        processCode(value);
    };

    const processCode = (code) => {
        // Implement your code processing logic here
        // Example: Display the code directly as output (for demonstration)
        setOutput(code);
    };

    return (
        <div className=' flex flex-col gap-3 mt-3'>
            <div className='flex flex-wrap gap-5 flex-1'>
            <div className='w-full lg:w-[50%] bg-[#1e1e1e] p-5 rounded-lg flex-1'>
                <h1 className='text-2xl font-bold mb-5'>Program:{} </h1>
            <Editor
                height="60vh"
                defaultLanguage="cpp"
                defaultValue={code}
                options={{
                    fontSize: 14, 
                    lineNumbers: "on",
                    wordWrap: "on",
                    automaticLayout: true,
                }}
                theme='vs-dark'
                onChange={handleEditorChange}
            />
            </div>
           
            <div className='flex justify-around flex-col gap-5 flex-1'>
                <div className='bg-[#1e1e1e] flex-1  rounded-lg p-3 overflow-scroll max-h-[100em] min-h-[20em]'>
                    <h1>Intermediate File:</h1>
                </div>
                <div className='flex-1 bg-[#1e1e1e] rounded-lg p-3 overflow-scroll max-h-[100em] min-h-[20em]'>
                    <h1>SYMTAB:</h1>
                </div>
            </div>
        </div>
        <div className="w-full bg-slate-700 px-5 py-3 rounded-lg flex justify-center">
        <h1 className='text-xl font-bold '>Click here to get Output</h1>
        </div>
        </div>
        
    );
};
export default Pass1Editor