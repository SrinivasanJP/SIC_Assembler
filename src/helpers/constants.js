export const OPTAB = {
    "ADD": "18",    // SIC/XE format 3/4
    "AND": "40",    // SIC/XE format 3/4
    "COMP": "28",   // SIC/XE format 3/4
    "DIV": "24",    // SIC/XE format 3/4
    "J": "3C",      // SIC/XE format 3/4
    "JEQ": "30",    // SIC/XE format 3/4
    "JGT": "34",    // SIC/XE format 3/4
    "JLT": "38",    // SIC/XE format 3/4
    "JSUB": "48",   // SIC/XE format 3/4
    "LDA": "00",    // SIC/XE format 3/4
    "LDCH": "50",   // SIC/XE format 3/4
    "LDL": "08",    // SIC/XE format 3/4
    "LDX": "04",    // SIC/XE format 3/4
    "MUL": "20",    // SIC/XE format 3/4
    "OR": "44",     // SIC/XE format 3/4
    "RD": "D8",     // SIC/XE format 3/4
    "RSUB": "4C",   // SIC/XE format 3/4
    "STA": "0C",    // SIC/XE format 3/4
    "STCH": "54",   // SIC/XE format 3/4
    "STL": "14",    // SIC/XE format 3/4
    "STSW": "E8",   // SIC/XE format 3/4
    "STX": "10",    // SIC/XE format 3/4
    "SUB": "1C",    // SIC/XE format 3/4
    "TD": "E0",     // SIC/XE format 3/4
    "TIX": "2C",    // SIC/XE format 3/4
    "WD": "DC",     // SIC/XE format 3/4

    // SIC/XE specific opcodes
    "ADDF": "58",   // Floating-point Add
    "ADDR": "90",   // Add Register
    "CLEAR": "B4",  // Clear Register
    "COMPF": "88",  // Floating-point Compare
    "COMPR": "A0",  // Compare Register
    "DIVF": "64",   // Floating-point Divide
    "DIVR": "9C",   // Divide Register
    "FIX": "C4",    // Convert to Fixed Point
    "FLOAT": "C0",  // Convert to Floating Point
    "HIO": "F4",    // Halt I/O
    "LDB": "68",    // Load Base Register
    "LDF": "70",    // Load Floating-point Register
    "LDS": "6C",    // Load S Register
    "LDT": "74",    // Load T Register
    "LPS": "D0",    // Load Processor Status
    "MULF": "60",   // Floating-point Multiply
    "MULR": "98",   // Multiply Register
    "NORM": "C8",   // Normalize
    "RMO": "AC",    // Register Move
    "SHIFTL": "A4", // Shift Left Logical
    "SHIFTR": "A8", // Shift Right Logical
    "SIO": "F0",    // Start I/O
    "SSK": "EC",    // Store Secure Key
    "STB": "78",    // Store Base Register
    "STF": "80",    // Store Floating-point Register
    "STI": "D4",    // Store Interrupt Mask
    "STS": "7C",    // Store S Register
    "STT": "84",    // Store T Register
    "SUBF": "5C",   // Floating-point Subtract
    "SUBR": "94",   // Subtract Register
    "SVC": "B0",    // Supervisor Call
    "TIO": "F8",    // Test I/O
    "TIXR": "B8"    // Test Index Register
};
