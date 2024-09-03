import React from 'react';

const IntermediateTable = ({ intermediateFile }) => {
    // Split the intermediate file data into lines
    const lines = intermediateFile.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Parse lines into table rows
    const rows = lines.map(line => {
        const columns = line.split('\t').map(col => col.trim());
        return columns;
    });

    return (
        <div className='bg-transparent backdrop-blur-lg shadow-sm shadow-white flex-1 rounded-lg p-3 overflow-auto max-h-[100em] min-h-[20em]'>
            <h1>Intermediate File:</h1>
            <table className="w-full border-collapse mt-4">
                <thead>
                    <tr>
                        <th className=" p-2">LOCCTR</th>
                        <th className="p-2">LABEL</th>
                        <th className="p-2">OPCODE</th>
                        <th className=" p-2">OPERAND</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border border-gray-400 p-2">{row[0]}</td>
                            <td className="border border-gray-400 p-2">{row[1]}</td>
                            <td className="border border-gray-400 p-2">{row[2]}</td>
                            <td className="border border-gray-400 p-2">{row[3]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IntermediateTable;
