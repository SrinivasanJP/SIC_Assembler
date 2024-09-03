import { OPTAB } from "./constants";

export const processPass1 = (code,setProgramName,setSymtab,setIntermediateFile) => {
    let lines = code.split('\n');
    let locctr = 0;
    let intermediateLines = [];
    let symtab = {};
    let programName = '';
    let startAddr = 0;

    lines.forEach((line, index) => {
        let tokens = line.trim().split(/\s+/);
        let label = '', opcode = '', operand = '';

        if (tokens.length === 3) {
            [label, opcode, operand] = tokens;
        } else if (tokens.length === 2) {
            [opcode, operand] = tokens;
        }

        // Handle the START directive
        if (opcode === "START") {
            programName = label;
            startAddr = parseInt(operand, 16);
            locctr = startAddr;
            intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t ${label} \t ${opcode} \t ${operand}`);
            return;
        }

        // Handle symbol definition
        if (label) {
            if (symtab.hasOwnProperty(label)) {
                console.error(`Error: Duplicate symbol ${label} at line ${index + 1}`);
            } else {
                symtab[label] = locctr.toString(16).toUpperCase();
            }
        }

        // Handle opcodes and directives
        if (opcode in OPTAB) {
            let format = determineFormat(opcode);  // Assume this function determines instruction format based on OPCODE
            locctr += format;
        } else if (opcode === "WORD") {
            locctr += 3;
        } else if (opcode === "BYTE") {
            let length = calculateByteLength(operand);  // Assume this function calculates length for BYTE directive
            locctr += length;
        } else if (opcode === "RESW") {
            locctr += parseInt(operand) * 3;
        } else if (opcode === "RESB") {
            locctr += parseInt(operand);
        } else if (opcode === "END") {
            intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t\t ${opcode} \t ${operand}`);
            return;
        } else {
            console.error(`Error: Invalid opcode ${opcode} at line ${index + 1}`);
        }

        intermediateLines.push(`${locctr.toString(16).toUpperCase()} \t ${label} \t ${opcode} \t ${operand}`);
    });

    let programLength = locctr - startAddr;
    
    // Store or display results
    setIntermediateFile(intermediateLines.join('\n'));
    setSymtab(JSON.stringify(symtab, null, 2));
    setProgramName(programName);
    console.log(`Program length: ${programLength.toString(16).toUpperCase()}H`);
};

// Example helper functions
const determineFormat = (opcode) => {
    // Logic to determine the format based on opcode for SIC/XE
    // Return 1, 2, 3, or 4 based on the instruction format
    return 3;  // Assume format 3 for demonstration
};

const calculateByteLength = (operand) => {
    // Logic to calculate the length of a BYTE operand
    if (operand.startsWith('C')) {
        return operand.length - 3;  // Subtract 3 for C'...'
    } else if (operand.startsWith('X')) {
        return Math.ceil((operand.length - 3) / 2);  // Subtract 3 for X'...' and divide by 2 for hex digits
    }
    return 0;
};