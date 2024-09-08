export const processPass2 = (intermediateLines, symtab, OPTAB, setObjectCode, setError) => {
    let pc = 0;
    let base = 0;
    let objectCodeLines = [];

    intermediateLines.split('\n').forEach((line, index) => {
        let [locctr, label, opcode, operand] = line.trim().split(/\s+/);
        let objectCode = '';
        
        // Convert locctr to integer
        locctr = parseInt(locctr, 16);
        
        // Handle opcodes
        if (opcode in OPTAB || opcode.includes("+")) {
            let format = determineFormat(opcode);  // Determine instruction format
            let opcodeBinary = OPTAB[opcode.replace("+", "")];  // Remove "+" for format 4

            if (format === 4) {
                // Format 4
                objectCode = handleFormat4(opcodeBinary, operand, symtab);
            } else if (format === 3) {
                // Format 3 with PC-relative or base-relative addressing
                objectCode = handleFormat3(opcodeBinary, operand, symtab, locctr, base, pc);
            }
        } else if (opcode === "BYTE" || opcode === "WORD") {
            objectCode = handleDataDirective(opcode, operand);
        }

        // Add the object code to the intermediate line
        objectCodeLines.push(`${line}\t${objectCode}`);

        // Update PC for next instruction
        pc = locctr + determineFormat(opcode);  // Assuming format is 3 or 4

        // Handle BASE directive to set the base register value
        if (opcode === "BASE") {
            base = parseInt(symtab[operand], 16);
        }
    });

    setObjectCode(objectCodeLines.join('\n'));
};

// Function to handle Format 4 (extended format) instructions
const handleFormat4 = (opcodeBinary, operand, symtab) => {
    let targetAddress = symtab[operand] ? parseInt(symtab[operand], 16) : parseInt(operand, 16);
    let niBits = "11";  // Assume simple addressing (neither immediate nor indirect)
    let xbpeBits = "0001";  // Set the extended bit for format 4

    let opcodeHex = parseInt(opcodeBinary, 16).toString(2).padStart(8, "0").slice(0, 6);
    let fullOpcode = parseInt(opcodeHex + niBits, 2).toString(16).toUpperCase();

    return fullOpcode.padStart(2, "0") + xbpeBits + targetAddress.toString(16).padStart(5, "0").toUpperCase();
};

// Function to handle Format 3 instructions with PC-relative and base-relative addressing
const handleFormat3 = (opcodeBinary, operand, symtab, locctr, base, pc) => {
    let niBits = "11";  // Assume simple addressing (neither immediate nor indirect)
    let xbpeBits = "0000";  // By default, no extended, base, or PC-relative
    let displacement = 0;

    let targetAddress = symtab[operand] ? parseInt(symtab[operand], 16) : parseInt(operand, 16);

    // PC-relative addressing
    displacement = targetAddress - (pc + 3);
    if (displacement >= -2048 && displacement <= 2047) {
        xbpeBits = "0010";  // Set the PC-relative bit
    } else {
        // If PC-relative addressing is not possible, try base-relative
        displacement = targetAddress - base;
        if (displacement >= 0 && displacement <= 4095) {
            xbpeBits = "0100";  // Set the base-relative bit
        } else {
            console.error(`Error: Displacement out of range for operand ${operand}`);
            // setError({state:true,message:`Error: Displacement out of range for operand ${operand} at line ${index + 1}`});
            return '';
        }
    }

    let opcodeHex = parseInt(opcodeBinary, 16).toString(2).padStart(8, "0").slice(0, 6);
    let fullOpcode = parseInt(opcodeHex + niBits, 2).toString(16).toUpperCase();

    return fullOpcode.padStart(2, "0") + xbpeBits + displacement.toString(16).padStart(3, "0").toUpperCase();
};

// Function to handle BYTE and WORD directives
const handleDataDirective = (opcode, operand) => {
    let objectCode = '';

    if (opcode === "WORD") {
        objectCode = parseInt(operand).toString(16).padStart(6, "0").toUpperCase();
    } else if (opcode === "BYTE") {
        if (operand.startsWith("C'")) {
            objectCode = operand.slice(2, -1).split('').map(c => c.charCodeAt(0).toString(16)).join('').toUpperCase();
        } else if (operand.startsWith("X'")) {
            objectCode = operand.slice(2, -1).toUpperCase();
        }
    }

    return objectCode;
};

// Example helper function to determine the format of an opcode
const determineFormat = (opcode) => {
    if (opcode.startsWith("+")) return 4;  // Format 4
    return 3;  // Assume format 3 for all other opcodes
};
