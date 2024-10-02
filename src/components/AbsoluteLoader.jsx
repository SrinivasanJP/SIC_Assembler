import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import TypeWriter from './TypeWriter';
import { common } from '../styles/common';

const AbsoluteLoader = () => {
  const [code, setCode] = useState('H COPY 1000 00107A\nT 1000 1E 1410332810303010151615\nT 101E 15 201033221034151035\n');
  const [output, setOutput] = useState('');

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const processInput = () => {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length);
    let outputData = '';
    let fileName = '';
    let fileSize = '';
    let fileLength = '';
    let currentAddress = 0;
    let count = 0;
    let previousAddress = 0;

    const writeLoadOutput = (line) => {
      if (line[0] === 'H') {
        fileName = line[1];
        fileSize = line[2];
        fileLength = line[3];
        previousAddress = parseInt(fileSize, 16);
      } else if (line[0] === 'T') {
        let recordAddress = parseInt(line[1], 16);
        let recordLength = parseInt(line[2], 16);
        let gap = recordAddress - previousAddress;

        while (gap-- > 0) {
          if (count % 32 === 0) {
            outputData += `\n${previousAddress.toString(16).padStart(4, '0')} `;
          } else if (count % 8 === 0) {
            outputData += ' ';
          }
          outputData += 'xx';
          count += 2;
          previousAddress++;
        }

        for (let i = 3; i < line.length; i++) {
          for (let j = 0; j < line[i].length; j += 2) {
            if (count % 32 === 0) {
              outputData += `\n${previousAddress.toString(16).padStart(4, '0')} `;
            } else if (count % 8 === 0) {
              outputData += ' ';
            }
            outputData += line[i][j] + line[i][j + 1];
            count += 2;
            previousAddress++;
          }
        }
      }
    };

    lines.forEach((line) => {
      const parts = line.split(' ');
      writeLoadOutput(parts);
    });

    setOutput(outputData);
  };

  return (
    <div className="flex flex-col h-screen gap-3 p-3">
      <div className="flex flex-wrap gap-5 flex-1">
        <div className="lg:w-[50%] bg-[#1e1e1e] p-5 rounded-lg w-full">
          <h1 className="text-2xl font-bold mb-5">Enter Object Program: </h1>
          <Editor
            height="50vh"
            defaultLanguage="cpp"
            defaultValue={code}
            options={{
              fontSize: 14,
              lineNumbers: "on",
              wordWrap: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
            }}
            theme="vs-dark"
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex-1 bg-[radial-gradient(138.06%_1036.51%_at_95.25%_-2.54%,_#7ED4FD05_14.06%,#709DF711_51.02%,#4D78EF55_79.09%)] backdrop-blur-md shadow-sm shadow-white p-5 rounded-lg w-full">
          <h1 className="text-2xl font-bold mb-5">Output:</h1>
          <div className="text-white w-full whitespace-pre-line overflow-auto rounded-lg font-mono text-xl">
            {<TypeWriter data={output}/>}
          </div>
        </div>
      </div>
      <button
       className={" rounded-lg flex justify-center mt-5 cursor-pointer "+common.Buttonblue}
        onClick={processInput}
      >
        Process Object Program
      </button>
    </div>
  );
};

export default AbsoluteLoader;
