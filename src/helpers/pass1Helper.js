import { OPTAB } from "./constants";

export const processPass1 = (code,setProgramName,setSymtab,setIntermediateFile,setError,setProgramLen) => {
    setError({state:false,message:""})
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
        } else if(tokens.length ===1){
            [opcode] = tokens;
        }
        if(opcode ==''){
            return;
        }

        // Handle the START directive
        if (opcode === "START") {
            programName = label;
            startAddr = parseInt(operand, 16);
            locctr = startAddr;
            intermediateLines.push(`${locctr.toString(16).toUpperCase().padStart(4,"0")} \t ${label} \t ${opcode} \t ${operand}`);
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

        intermediateLines.push(`${locctr.toString(16).toUpperCase().padStart(4,"0")} \t ${label} \t ${opcode} \t ${operand}`);
        // Handle opcodes and directives
        if (opcode in OPTAB || opcode.includes("+") || opcode.includes("@") || opcode.includes("#")) {
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
            return;
        }else if(opcode === "BASE"){
            return;
        }else {
            console.log("Error"+opcode)
            setError({state:true,message:`Error: Invalid opcode ${opcode} at line ${index + 1}`});
        }

        
    });

    let programLength = locctr - startAddr;
    
    // Store or display results
    setIntermediateFile(intermediateLines.join('\n'));
    setSymtab(JSON.stringify(symtab, null, 2));
    setProgramName(programName);
    console.log(`Program length: ${programLength.toString(16).toUpperCase()}H`);
    setProgramLen(programLength.toString(16).toUpperCase())
};

// Example helper functions
const determineFormat = (opcode) => {
    if(opcode[0]=="+") return 4;
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