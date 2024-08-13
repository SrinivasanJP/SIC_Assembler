import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const Pass1Editor = () => {
    const [code, setCode] = useState('// Write your code here\n');
    const [intermediateFile, setIntermediateFile] = useState('');
    const [symtab, setSymtab] = useState('');
    const [programName, setProgramName] = useState('');
    const [locctr, setLocctr] = useState(0);

    const handleEditorChange = (value) => {
        setCode(value);
    };

    const processCode = () => {
        let lines = code.split('\n');
        let locctr = 0;
        let intermediateLines = [];
        let symtabLines = [];
        let programName = '';

        lines.forEach((line) => {
            let tokens = line.trim().split(/\s+/);

            if (tokens.length === 3) {
                let label = tokens[0];
                let opcode = tokens[1];
                let operand = tokens[2];

                if (opcode === "START") {
                    programName = label;
                    locctr = parseInt(operand, 16);
                    intermediateLines.push(`\t\t ${label} \t ${opcode} \t ${operand}`);
                } else {
                    symtabLines.push(`${locctr.toString(16).toUpperCase()} \t ${label}`);
                    intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t\t\t\t ${label} \t ${opcode} \t ${operand}`);

                    if (opcode === "WORD") {
                        locctr += 3;
                    } else if (opcode === "BYTE") {
                        locctr += 1;
                    } else if (opcode === "RESW") {
                        locctr += parseInt(operand) * 3;
                    } else if (opcode === "RESB") {
                        locctr += parseInt(operand);
                    } else {
                        locctr += 3;
                    }
                }
            } else if (tokens.length === 2) {
                let opcode = tokens[0];
                let operand = tokens[1];

                if (opcode === "END") {
                    intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t\t\t\t ${opcode} \t ${operand}`);
                } else {
                    intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t\t\t\t ${opcode} \t ${operand}`);
                    locctr += 3;
                }
            }
        });

        setIntermediateFile(intermediateLines.join('\n'));
        setSymtab(symtabLines.join('\n'));
        setProgramName(programName);
    };


    return (
        <div className=' flex flex-col gap-3 mt-3'>
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
                <div className='bg-[#1e1e1e] flex-1  rounded-lg p-3 overflow-auto max-h-[100em] min-h-[20em]'>
                    <h1>Intermediate File:</h1>
                    <pre>
                    {intermediateFile}
                    </pre>
                </div>
                <div className='flex-1 bg-[#1e1e1e] rounded-lg p-3 overflow-auto max-h-[100em] min-h-[20em]'>
                    <h1>SYMTAB:</h1>
                    <pre>
                    {symtab}
                    </pre>
                </div>
            </div>
        </div>
        <div onClick={()=>processCode()} className="w-full bg-slate-700 px-5 py-3 rounded-lg flex justify-center">
        <h1 className='text-xl font-bold '>Click here to get Output</h1>
        </div>
        </div>
        
    );
};
export default Pass1Editor