import React from 'react';

const IntermediateTable = ({ intermediateFile,error }) => {
    // Split the intermediate file data into lines
    const lines = intermediateFile.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Parse lines into table rows
    const rows = lines.map(line => {
        const columns = line.split('\t').map(col => col.trim());
        return columns;
    });

    return (
        <div className={error.state?' bg-red-500/20 backdrop-blur-lg shadow-sm shadow-red-600 flex-1 rounded-lg p-3 overflow-auto':" bg-transparent backdrop-blur-lg shadow-sm shadow-white rounded-lg p-3 overflow-auto"}>
            
            <h1>Intermediate File:</h1>
            {error.state?<div className='w-full flex justify-center items-center h-[80%]'>{error.message}</div>:
            <table className="w-full border-collapse mt-4">
                <thead>
                    <tr>
                        <th className=" p-2">LOCCTR</th>
                        <th className="p-2">LABEL</th>
                        <th className="p-2">OPCODE</th>
                        <th className=" p-2">OPERAND</th>
                        <th className='p-2'>ObJ_CODE</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2">{row[0]}</td>
                            <td className="border border-gray-400 p-2">{row[1]}</td>
                            <td className="border border-gray-400 p-2">{row[2]}</td>
                            <td className="border border-gray-400 p-2">{row[3]}</td>
                           {row[4] && <td className="border border-gray-400 p-2">{row[4]}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    );
};

export default IntermediateTable;
