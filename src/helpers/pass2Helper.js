import { OPTAB } from "./constants";

export const processPass2 = (intermediateFile, symtab, setObjCode, setError, setIntermediateFile, programLen) => {
    setError({ state: false, message: "" });

    let objCode = [];
    let startAddress = 0;
    let currentAddress = 0;
    let textRecord = '';
    let textRecordStartAddr = ''; 
    let intermediateLines = [];
    let sym = JSON.parse(symtab);

    console.log(intermediateFile);
    intermediateFile.split('\n').forEach(line => {
        const list = line.trim().split(/\s+/);
        let loc = '', label = '', opcode = '', operand = '';

        if (list.length === 4) {
            [loc, label, opcode, operand] = list;
        } else if (list.length === 3) {
            [loc, opcode, operand] = list;
        }

        // Skip if no opcode
        if (!opcode) return;

        // Handle the START directive
        if (opcode === "START") {
            startAddress = parseInt(loc, 16);
            currentAddress = startAddress;
            textRecordStartAddr = startAddress; // Initialize the start address for the first text record
            intermediateLines.push(`${loc} \t ${label} \t ${opcode} \t ${operand}`);
            objCode.push(`H ${label} ${operand.padStart(6, '0')} ${programLen.padStart(6, '0')}`);
            return;
        }

        // Generate object code for OPCODEs
        if (opcode in OPTAB) {
            const objOpcode = OPTAB[opcode];
            const operandAddress = sym[operand] || '0000';
            const objectInstruction = objOpcode + operandAddress;
            intermediateLines.push(`${loc} \t ${label} \t ${opcode} \t ${operand} \t ${objectInstruction}`);

            // Add the object instruction to the text record
            if (!textRecordStartAddr) {
                textRecordStartAddr = loc; // Set start address of the text record
            }

            // If adding this object instruction exceeds 60 characters, flush the current text record
            if (textRecord.length + objectInstruction.length > 60) {
                objCode.push(`T ${String(textRecordStartAddr).padStart(6, '0')} ${(textRecord.length / 2).toString(16).padStart(2, '0')} ${textRecord}`);

                textRecord = objectInstruction; // Start a new text record
                textRecordStartAddr = loc; // Set the new text record's start address
            } else {
                textRecord += objectInstruction; // Add to existing text record
            }
            currentAddress += 3;
        } else if (opcode === "RESW" || opcode === "RESB" || opcode === "WORD" || opcode === "BYTE") {
            // Flush the current text record since no object code is generated for RESW/RESB
            if (textRecord.length > 0) {
                objCode.push(`T ${String(textRecordStartAddr).padStart(6, '0')} ${(textRecord.length / 2).toString(16).padStart(2, '0')} ${textRecord}`);

                textRecord = '';
                textRecordStartAddr = ''; // Reset the start address for the next text record
            }
            intermediateLines.push(`${loc} \t ${label} \t ${opcode} \t ${operand}`);
            if (opcode === "RESW") {
                currentAddress += parseInt(operand) * 3;
            } else {
                currentAddress += parseInt(operand);
            }
        } else if (opcode === "END") {
            // Flush any remaining text record before ending
            if (textRecord.length > 0) {
                objCode.push(`T ${String(textRecordStartAddr).padStart(6, '0')} ${(textRecord.length / 2).toString(16).padStart(2, '0')} ${textRecord}`);

            }
            intermediateLines.push(`${loc} \t ${label} \t ${opcode} \t ${operand}`);
            objCode.push(`E ${startAddress.toString(16).padStart(6, '0')}`);
            return; // Exit loop
        } else {
            console.error(`Error: Invalid opcode ${opcode}`);
            setError({ state: true, message: `Error: Invalid opcode ${opcode}` });
            return;
        }
    });

    // Store the intermediate lines and object code
    setIntermediateFile(intermediateLines.join("\n"));
    setObjCode(objCode.join('\n'));
};

// Helper function to calculate the object code for BYTE directives
const calculateByteObjectCode = (operand) => {
    if (operand.startsWith('C')) {
        return operand.slice(2, -1).split('').map(c => c.charCodeAt(0).toString(16).toUpperCase()).join('');
    } else if (operand.startsWith('X')) {
        return operand.slice(2, -1); // Extract the hex value directly
    }
    return ''; // Fallback case if operand is not C'' or X''
};
