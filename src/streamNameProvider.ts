/**
 * Stream Name Provider for PRO/II Language Support
 * Parses NAME section and provides semantic highlighting for stream names
 * This ensures only actual defined streams are highlighted
 */

import * as vscode from 'vscode';

export class StreamNameProvider implements vscode.DocumentSemanticTokensProvider {
    
    /**
     * Parse the NAME section and extract all stream names
     */
    private parseNameSection(document: vscode.TextDocument): Set<string> {
        const streamNames = new Set<string>();
        const text = document.getText();
        
        // Find NAME section
        const nameStartMatch = text.match(/^[\s]*NAMES?[\s]*[\r\n]/mi);
        if (!nameStartMatch) {
            return streamNames;
        }
        
        const nameStartIndex = nameStartMatch.index! + nameStartMatch[0].length;
        
        // Find next major section (case-insensitive)
        const nextSectionMatch = text.substring(nameStartIndex).match(/^[\s]*[A-Z]+[\s]+[\s]*[\r\n]/m);
        const nameEndIndex = nextSectionMatch 
            ? nameStartIndex + nextSectionMatch.index! 
            : text.length;
        
        const nameSection = text.substring(nameStartIndex, nameEndIndex);
        
        // Parse stream names - first word/alphanumeric on each line that's not indented under description
        // Format in NAME section:
        // NAME streamname ,description1 ,description2 ,description3 /*
        
        const lines = nameSection.split(/[\r\n]/);
        for (const line of lines) {
            // Skip empty lines and lines starting with comment
            if (!line.trim() || line.trim().startsWith('$')) {
                continue;
            }
            
            // Match stream name at beginning of line (with optional leading whitespace for continuation)
            // Stream names must start with letter
            const streamMatch = line.match(/^\s{0,4}([A-Za-z][A-Za-z0-9_]*)\s*[,\s]/);
            if (streamMatch) {
                const streamName = streamMatch[1].toUpperCase();
                // Avoid common keywords
                if (!this.isKeyword(streamName)) {
                    streamNames.add(streamName);
                }
            }
        }
        
        return streamNames;
    }
    
    /**
     * Check if a word is a known keyword (not a stream name)
     */
    private isKeyword(word: string): boolean {
        const keywords = [
            'NAME', 'NAMES', 'STREAM', 'STRM', 'DATA', 'COMPONENT', 'THERMODYNAMIC',
            'UNIT', 'OPERATIONS', 'PRINT', 'TITLE', 'DBASE', 'TOLERANCE', 'DIMENSION',
            'METHOD', 'LIBID', 'ASSAY', 'CUTPOINTS', 'WATER', 'PROCEDURE', 'RETURN',
            'DEFINE', 'FEED', 'PROD', 'PRODUCT', 'FPROD', 'CALL', 'CALC'
        ];
        return keywords.includes(word);
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
        const streamPattern = new RegExp(`\\b(${sortedStreams.join('|')})\\b`, 'gi');
        
        // Iterate through document to find stream references
        // Exclude NAME section itself and UNIT OPERATIONS section headers
        let inNameSection = false;
        let inUnitOpsSection = false;
        let currentIndex = 0;
        
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            const lineText = line.toUpperCase();
            
            // Check if entering NAME section
            if (lineText.match(/^[\s]*NAMES?[\s]*$/)) {
                inNameSection = true;
                continue;
            }
            
            // Check if entering UNIT OPERATIONS section
            if (lineText.match(/^[\s]*UNIT\s+OPERATIONS[\s]*$/)) {
                inUnitOpsSection = true;
                inNameSection = false;
                continue;
            }
            
            // Check if entering other major section
            if (lineText.match(/^[\s]*[A-Z]+[\s]+DATA[\s]*$/) || 
                lineText.match(/^[\s]*COMPONENT[\s]+DATA[\s]*$/) ||
                lineText.match(/^[\s]*STREAM[\s]+DATA[\s]*$/) ||
                lineText.match(/^[\s]*THERMODYNAMIC[\s]+DATA[\s]*$/)) {
                inNameSection = false;
                inUnitOpsSection = false;
            }
            
            // Skip highlighting in NAME section itself
            if (inNameSection) {
                continue;
            }
            
            // Only highlight in UNIT OPERATIONS section and beyond
            if (!inUnitOpsSection && lineText.match(/^[\s]*[A-Z]+/)) {
                if (!lineText.match(/^[\s]*(FEED|PROD|PRODUCT|STRM|DEFINE|RETURN|CALC)/)) {
                    inUnitOpsSection = true;
                }
            }
            
            // Find stream names in this line
            if (inUnitOpsSection || lineText.match(/^[\s]*(FEED|PROD|PRODUCT|STRM|DEFINE|RETURN|CALC)/)) {
                let match;
                streamPattern.lastIndex = 0; // Reset regex
                
                while ((match = streamPattern.exec(line)) !== null) {
                    const startChar = match.index;
                    const endChar = match.index + match[1].length;
                    
                    // Create semantic token for this stream name
                    const startLine = lineNum;
                    const startCol = startChar;
                    const length = endChar - startChar;
                    
                    builder.push(startLine, startCol, length, 0, 0); // Type 0 = variable, modifier 0 = streamName
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
