import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import TypeWriter from './TypeWriter';
import { common } from '../styles/common';

const Pass1Processor = () => {
  const [files, setFiles] = useState([
    { code: 'H^PROGC^000000^0051\nD^LISTC^000030^ENDC^000042^\n' },
  ]);
  const [output, setOutput] = useState('');

  const handleEditorChange = (index, value) => {
    const newFiles = [...files];
    newFiles[index].code = value;
    setFiles(newFiles);
  };

  console.log(files)
  const processInput = () => {
    let outputResult = '';
    let PROGADDR = 16384; // Initial Program Address
    let CSADDR = PROGADDR; // Current Section Address
    let PROGRAM_NAME = '';
    let LENGTH = 0;

    files.forEach(file => {
      const lines = file.code.split('\n');
      lines.forEach(line => {
        const parts = line.split('^').filter(part => part); // Split by ^ and remove empty parts

        const record = parts[0]; // The first character determines the record type
        if (record === 'H') {
          CSADDR = PROGADDR;
          outputResult += `${parts[1]}\t\t\t${PROGADDR.toString(16).toUpperCase()}\t${parts[3]}\n`;
          PROGRAM_NAME = parts[1];
          LENGTH = parseInt(parts[3], 16);
          PROGADDR += LENGTH; // Update the Program Address
        } else if (record === 'D') {
          for (let i = 1; i < parts.length - 1; i += 2) {
            outputResult += `\t\t${parts[i]}\t${(CSADDR + parseInt(parts[i + 1], 16)).toString(16).toUpperCase()}\n`;
          }
        }
      });
    });

    setOutput(outputResult);
  };

  const addEditor = () => {
    setFiles([...files, { code: '' }]);
  };

  return (
    <div className="flex flex-col h-screen gap-3 p-3">
      <div className="flex flex-wrap gap-5 flex-1">
        {files.map((file, index) => (
          <div key={index} className=" bg-[#1e1e1e] p-5 rounded-lg w-full">
            <h1 className="text-2xl font-bold mb-5">Enter Object Program: </h1>
            <Editor
              height="50vh"
              defaultLanguage="cpp"
              defaultValue={file.code}
              options={{
                fontSize: 14,
                lineNumbers: "on",
                wordWrap: "on",
                automaticLayout: true,
                scrollBeyondLastLine: false,
              }}
              theme="vs-dark"
              onChange={(value) => handleEditorChange(index, value)}
            />
          </div>
        ))}
      </div>
      <button
        className={"rounded-lg flex justify-center mt-5 cursor-pointer " + common.Buttonblue}
        onClick={addEditor}
      >
        Add Another Input File
      </button>
      <div className="bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD05_14.06%,#709DF711_51.02%,#4D78EF55_79.09%)] backdrop-blur-md shadow-sm shadow-white p-5 rounded-lg w-full">
        <h1 className="text-2xl font-bold mb-5">Output:</h1>
        <div className="text-white w-full whitespace-pre-line overflow-auto rounded-lg font-mono text-xl">
          <TypeWriter data={output} />
        </div>
      </div>
      <button
        className={"rounded-lg flex justify-center mt-5 cursor-pointer " + common.Buttonblue}
        onClick={processInput}
      >
        Process Object Program
      </button>
    </div>
  );
};

export default Pass1Processor;
