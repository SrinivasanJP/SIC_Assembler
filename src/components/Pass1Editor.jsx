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
        <div className='flex flex-wrap mt-10'>
            <div className='w-full lg:w-[50%]'>
                <h1 className='text-2xl font-bold mb-5'>Program:{} </h1>
            <Editor
                height="60vh"
                defaultLanguage="cpp"
                defaultValue={code}
                theme='vs-dark'
                onChange={handleEditorChange}
            />
            </div>
           
            <div style={{ marginLeft: '20px', whiteSpace: 'pre-wrap' }}>
                <h3>Output:</h3>
                <pre>{output}</pre>
            </div>
        </div>
    );
};
export default Pass1Editor