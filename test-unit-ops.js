/**
 * Test stream name highlighting in unit operations
 */

// Sample unit operations content with stream names
const unitOpsContent = `
  NAME SRGO        ,FRESH FEED  ,SRGO        ,INLET       /*
       LRY         ,LIQUID RECY ,LRY         ,RECYCLE     /*
       DMDS        ,DMDS INJECT ,DMDS        ,INJECTION   /*
       DHTF        ,HDO FEED    ,MIXER       ,OUTLET      /*

$ UNIT OPERATIONS DATA
  FLASH       UID=DHTF, NAME=HDO FEED MIXER
    FEED SRGO, LRY, DMDS
    Product m = DHTF
    ISOT TEMP = 55, PRES = 81

  COMPRESSOR  UID=FGC1, NAME=COMPRESSOR
    FEED FRSHBL
    PRODUCT   M=FRSH1
    OPERATION EFF=90, PRES=50

  COLUMN      UID=HPICN, NAME=HP COLUMN
    Parameter TRAY = 5, IO = 15
    FEED      HPIS,1,TSEPARATE /&
              R2OUV,5
    PRODUCT   OVHD(M)=HPOVN,120.4331784,&
              BTMS(M)=HPLF ,38.28197232
`;

// Use the same parsing logic from the extension
function parseNameSection(text) {
    const streamNames = new Set();
    const lines = text.split(/[\r\n]/);
    
    const nameStartLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
            nameStartLines.push(i);
        }
    }
    
    for (const nameStartLine of nameStartLines) {
        const nameLine = lines[nameStartLine];
        
        const nameLineMatch = nameLine.match(/^[\s]*NAME[\s]+([A-Za-z][A-Za-z0-9_]*)[\s,]/i);
        if (nameLineMatch) {
            const streamName = nameLineMatch[1].toUpperCase();
            streamNames.add(streamName);
        }
        
        for (let i = nameStartLine + 1; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            
            if (trimmed.match(/^\$[\s]+[A-Z]/)) {
                break;
            }
            
            if (!trimmed) {
                continue;
            }
            
            const contMatch = line.match(/^[\s]+([A-Za-z][A-Za-z0-9_]*)[\s]*[,/]/);
            
            if (contMatch) {
                const streamName = contMatch[1].toUpperCase();
                streamNames.add(streamName);
                continue;
            }
            
            break;
        }
    }
    
    return streamNames;
}

function isInNameSection(lineNum, lines) {
    let lastNameLine = -1;
    
    for (let i = 0; i <= lineNum; i++) {
        if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
            lastNameLine = i;
        }
    }
    
    if (lastNameLine === -1) {
        return false;
    }
    
    for (let i = lastNameLine + 1; i < lines.length; i++) {
        if (lines[i].trim().match(/^\$[\s]+[A-Z]/)) {
            return lineNum > lastNameLine && lineNum < i;
        }
    }
    
    return lineNum > lastNameLine;
}

function findStreamReferences(text, streamNames) {
    const lines = text.split(/[\r\n]/);
    const sortedStreams = Array.from(streamNames).sort((a, b) => b.length - a.length);
    const matches = [];
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
        const line = lines[lineNum];
        
        // Skip lines that are in NAME sections themselves
        if (isInNameSection(lineNum, lines)) {
            console.log(`  Skipping NAME section line ${lineNum + 1}: ${line.trim()}`);
            continue;
        }
        
        // Skip section headers
        if (line.trim().match(/^\$[\s]*[A-Z]/)) {
            continue;
        }
        
        for (const streamName of sortedStreams) {
            const pattern = new RegExp(`(?:^|([\\s,=\\(\\[]))${streamName}(?=[\\s,=\\)\\];/*]|$)`, 'gi');
            
            let match;
            while ((match = pattern.exec(line)) !== null) {
                const startChar = match[1] ? match.index + match[1].length : match.index;
                matches.push({
                    line: lineNum + 1,
                    column: startChar + 1,
                    stream: streamName,
                    context: line.trim(),
                    type: getContextType(line)
                });
            }
        }
    }
    
    return matches;
}

function getContextType(line) {
    if (line.trim().match(/^\s*FEED\s/i)) return 'FEED';
    if (line.trim().match(/^\s*PRODUCT\s/i)) return 'PRODUCT';
    if (line.trim().match(/^\s*PROP\s/i)) return 'PROP';
    if (line.trim().match(/^\s*NAME\s/i)) return 'NAME';
    return 'OTHER';
}

console.log('Testing stream name highlighting in unit operations:');
const streams = parseNameSection(unitOpsContent);
console.log('Found streams:', Array.from(streams).sort());

console.log('\nStream references found:');
const references = findStreamReferences(unitOpsContent, streams);
references.forEach(ref => {
    console.log(`  Line ${ref.line}: ${ref.stream} (${ref.type}) - ${ref.context}`);
});

console.log('\nSummary by context type:');
const byType = {};
references.forEach(ref => {
    if (!byType[ref.type]) byType[ref.type] = [];
    byType[ref.type].push(ref.stream);
});

Object.keys(byType).forEach(type => {
    console.log(`  ${type}: ${byType[type].join(', ')}`);
});