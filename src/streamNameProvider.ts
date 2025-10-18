/**
 * Stream Name Provider for PRO/II Language Support
 * Parses NAME section and provides semantic highlighting for stream names
 * This ensures only actual defined streams are highlighted
 */

import * as vscode from 'vscode';

export class StreamNameProvider implements vscode.DocumentSemanticTokensProvider {
    
    /**
     * Parse ALL NAME sections and extract all stream names
     * PRO/II files can have multiple NAME sections for different unit operations
     */
    private parseNameSection(document: vscode.TextDocument): Set<string> {
        const streamNames = new Set<string>();
        const text = document.getText();
        const lines = text.split(/[\r\n]/);
        
        // Find ALL lines starting with "NAME" keyword
        const nameStartLines: number[] = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
                nameStartLines.push(i);
            }
        }
        
        // Process each NAME section
        for (const nameStartLine of nameStartLines) {
            const nameLine = lines[nameStartLine];
            
            // FIRST: Extract stream from NAME line itself
            // Pattern: NAME keyword, then first stream name, then comma or space+comma
            const nameLineMatch = nameLine.match(/^[\s]*NAME[\s]+([A-Za-z][A-Za-z0-9_]*)[\s,]/i);
            if (nameLineMatch) {
                const streamName = nameLineMatch[1].toUpperCase();
                streamNames.add(streamName);
            }
            
            // THEN: Extract streams from continuation lines
            for (let i = nameStartLine + 1; i < lines.length; i++) {
                const line = lines[i];
                const trimmed = line.trim();
                
                // Stop at next section (lines starting with $ followed by text)
                if (trimmed.match(/^\$[\s]+[A-Z]/)) {
                    break;
                }
                
                // Skip empty lines
                if (!trimmed) {
                    continue;
                }
                
                // For continuation lines: must start with whitespace, then identifier, then comma or /*
                // This pattern specifically requires comma or /* to distinguish from keywords
                const contMatch = line.match(/^[\s]+([A-Za-z][A-Za-z0-9_]*)[\s]*[,/]/);
                
                if (contMatch) {
                    const streamName = contMatch[1].toUpperCase();
                    streamNames.add(streamName);
                    continue;
                }
                
                // No valid stream found - exit this NAME section
                break;
            }
        }
        
        return streamNames;
    }

    /**
     * Check if a line is within a NAME section
     */
    private isInNameSection(lineNum: number, lines: string[]): boolean {
        // Find which NAME section (if any) this line belongs to
        let lastNameLine = -1;
        let nextSectionLine = lines.length;
        
        for (let i = 0; i < lineNum; i++) {
            if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
                lastNameLine = i;
            }
        }
        
        // If no NAME line before this, not in NAME section
        if (lastNameLine === -1) {
            return false;
        }
        
        // Find next section marker after lastNameLine
        for (let i = lastNameLine + 1; i < lineNum; i++) {
            if (lines[i].trim().match(/^\$[\s]+[A-Z]/)) {
                nextSectionLine = i;
                break;
            }
        }
        
        // We're in NAME section if we're between NAME line and next section marker
        return lineNum > lastNameLine && lineNum < nextSectionLine;
    }
    
    /**
     * Find all uses of stream names in the document and return as semantic tokens
     */
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        const streamNames = this.parseNameSection(document);
        
        if (streamNames.size === 0) {
            // Return empty tokens if no streams found
            return new vscode.SemanticTokens(new Uint32Array());
        }
        
        const builder = new vscode.SemanticTokensBuilder();
        const text = document.getText();
        const lines = text.split(/[\r\n]/);
        
        // Build regex pattern from stream names (sorted by length, longest first, for greedy matching)
        const sortedStreams = Array.from(streamNames).sort((a, b) => b.length - a.length);
        
        // Iterate through document to find stream references
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            
            // Skip lines that are in NAME sections themselves
            if (this.isInNameSection(lineNum, lines)) {
                continue;
            }
            
            // Skip section headers (lines starting with $)
            if (line.trim().match(/^\$[\s]*[A-Z]/)) {
                continue;
            }
            
            // Find stream names in this line
            // We need to check for stream names as whole tokens (not part of other words)
            // Look for: space/comma/= before the stream name, and space/comma/=/end-of-line after
            for (const streamName of sortedStreams) {
                // Pattern 1: Stream with required separator before AND after
                const pattern1 = new RegExp(`([\\s,=\\(\\[])${streamName}([\\s,=\\)\\];/*]|$)`, 'gi');
                
                let match;
                while ((match = pattern1.exec(line)) !== null) {
                    // The stream name is in group 1 match, but we need to offset by the first group
                    const startChar = match.index + match[1].length; // Skip the leading separator
                    const length = streamName.length;
                    
                    builder.push(lineNum, startChar, length, 0, 0); // Type 0 = streamName
                }
                
                // Pattern 2: Stream at start of line (after whitespace) - for continuation lines
                // Matches: "    QLIQ2,-1.0" or "    LRY , -1#" after /&
                const pattern2 = new RegExp(`^(\\s*)${streamName}([\\s,=\\)\\];/*]|$)`, 'i');
                const match2 = line.match(pattern2);
                if (match2) {
                    const startChar = match2[1].length;
                    const length = streamName.length;
                    builder.push(lineNum, startChar, length, 0, 0); // Type 0 = streamName
                }
            }
        }
        
        return builder.build();
    }
}

/**
 * Legend for semantic token types and modifiers
 */
export const semanticTokenLegend = new vscode.SemanticTokensLegend(
    ['streamName'], // types
    [''] // modifiers
);
