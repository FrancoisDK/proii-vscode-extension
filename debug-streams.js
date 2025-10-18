/**
 * Debug script to test stream name parsing and semantic token generation
 */

const fs = require('fs');

// Simple test for stream name parsing
function parseNameSection(text) {
    const streamNames = new Set();
    const lines = text.split(/[\r\n]/);
    
    // Find ALL lines starting with "NAME" keyword
    const nameStartLines = [];
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
            nameStartLines.push(i);
        }
    }
    
    console.log(`Found ${nameStartLines.length} NAME sections at lines:`, nameStartLines.map(l => l + 1));
    
    // Process each NAME section
    for (const nameStartLine of nameStartLines) {
        const nameLine = lines[nameStartLine];
        console.log(`\nProcessing NAME line ${nameStartLine + 1}: ${nameLine}`);
        
        // FIRST: Extract stream from NAME line itself
        const nameLineMatch = nameLine.match(/^[\s]*NAME[\s]+([A-Za-z][A-Za-z0-9_]*)[\s,]/i);
        if (nameLineMatch) {
            const streamName = nameLineMatch[1].toUpperCase();
            streamNames.add(streamName);
            console.log(`  Found stream in NAME line: ${streamName}`);
        }
        
        // THEN: Extract streams from continuation lines
        for (let i = nameStartLine + 1; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();
            
            // Stop at next section (lines starting with $ followed by text)
            if (trimmed.match(/^\$[\s]+[A-Z]/)) {
                console.log(`  Stopped at section marker on line ${i + 1}: ${trimmed}`);
                break;
            }
            
            // Skip empty lines
            if (!trimmed) {
                continue;
            }
            
            // For continuation lines: must start with whitespace, then identifier, then comma or /*
            const contMatch = line.match(/^[\s]+([A-Za-z][A-Za-z0-9_]*)[\s]*[,/]/);
            
            if (contMatch) {
                const streamName = contMatch[1].toUpperCase();
                streamNames.add(streamName);
                console.log(`  Found stream in continuation line ${i + 1}: ${streamName}`);
                continue;
            }
            
            // No valid stream found - exit this NAME section
            console.log(`  Exited NAME section at line ${i + 1}: ${line}`);
            break;
        }
    }
    
    return streamNames;
}

// Test with a sample from a test PRO/II file
const testContent = `
  NAME ACI1       ,AIRCOOLER   ,AIR INLET   ,E1105       /*
       ACI2       ,AIRCOOLER   ,AIR INLET   ,E1106       /*
       ACI5       ,AIRCOOLER   ,AIR INLET   ,E1107       /*
       ACI8       ,AIRCOOLER   ,AIR INLET   ,E1301       /*
       ACI12      ,AIRCOOLER   ,AIR INLET   ,E1305       /*

$ Next section
  PROP STRM=ACI1, TEMP=25, PRES=1.013
  PROP STRM=ACI2, REFS=ACI1, RATE(W,KG/H)=764587.912
`;

console.log('Testing stream name parsing:');
const streams = parseNameSection(testContent);
console.log('\nAll found streams:', Array.from(streams).sort());

// Check if a line is within a NAME section
function isInNameSection(lineNum, lines) {
    // Find which NAME section (if any) this line belongs to
    let lastNameLine = -1;
    
    for (let i = 0; i <= lineNum; i++) {
        if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
            lastNameLine = i;
        }
    }
    
    // If no NAME line before or at this line, not in NAME section
    if (lastNameLine === -1) {
        return false;
    }
    
    // Find next section marker after lastNameLine
    for (let i = lastNameLine + 1; i < lines.length; i++) {
        if (lines[i].trim().match(/^\$[\s]+[A-Z]/)) {
            // We're in NAME section if we're between NAME line and next section marker
            return lineNum > lastNameLine && lineNum < i;
        }
    }
    
    // No section marker found after NAME line, so check if we're after the NAME line
    return lineNum > lastNameLine;
}

// Test finding stream references
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
            // Create a comprehensive pattern that matches all valid stream name contexts
            const pattern = new RegExp(`(?:^|([\\s,=\\(\\[]))${streamName}(?=[\\s,=\\)\\];/*]|$)`, 'gi');
            
            let match;
            while ((match = pattern.exec(line)) !== null) {
                // If match[1] exists, it's the separator before the stream name
                const startChar = match[1] ? match.index + match[1].length : match.index;
                matches.push({
                    line: lineNum + 1,
                    column: startChar + 1,
                    stream: streamName,
                    context: line.trim()
                });
            }
        }
    }
    
    return matches;
}

console.log('\nTesting stream reference finding:');
const references = findStreamReferences(testContent, streams);
console.log('Found references:', references);