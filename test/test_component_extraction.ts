/**
 * Test component extraction from LIBID
 */

const testText = `    LIBID   1,H20/2,H2/3,N2/4,H2S/5,NH3/6,C1/7,C2/8,C3/9,IC4/10,NC4 /&
            11,IC5/12,NC5/13,CP/14,NC6/15,CO2/16,MEA/17,CO/18,NC13  /&
            19,NC14/20,NC15/21,NC16/22,NC17/23,NC18/24,HCL/25,DMDS  /&
            26,O2/27,NC7/28,NC8/29,BENZENE/30,TOLUENE/31,EBENZENE   /&
            32,PXYLENE/33,OXYLENE,                                    &
            BANK=SIMSCI,PROCESS,SHLB=NONE`;

console.log('Original text:');
console.log(testText);
console.log('\n===================\n');

// Step 1: Normalize text - remove line continuations
const normalizedText = testText.replace(/\s*\/?\s*&/g, ' ');
console.log('Normalized text (continuations removed):');
console.log(normalizedText);
console.log('\n===================\n');

// Step 2: Extract LIBID content
const libidRegex = /\bLIBID\b\s+([\d,A-Z0-9\-\/\s]+?)(?=\s*,?\s*BANK\s*=)/gi;
const match = libidRegex.exec(normalizedText);

if (match) {
    console.log('LIBID content found:');
    console.log(match[1]);
    console.log('\n===================\n');
    
    const libidContent = match[1];
    
    // Step 3: Extract components
    const componentRegex = /(\d+)\s*,\s*([A-Z][A-Z0-9\-]*)/gi;
    let componentMatch;
    const components: { id: number; name: string }[] = [];
    
    while ((componentMatch = componentRegex.exec(libidContent)) !== null) {
        const id = parseInt(componentMatch[1], 10);
        const name = componentMatch[2].trim();
        components.push({ id, name });
        console.log(`Component ${id}: ${name}`);
    }
    
    console.log(`\n===================`);
    console.log(`Total components found: ${components.length}`);
    console.log(`Expected: 33`);
    console.log(`Missing: ${33 - components.length}`);
} else {
    console.log('ERROR: No LIBID match found!');
}
