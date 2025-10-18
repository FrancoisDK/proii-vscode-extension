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
        const lines = text.split(/[\r\n]/);
        
        // Find the line starting with "NAME" keyword
        let nameStartLine = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
                nameStartLine = i;
                break;
            }
        }
        
        if (nameStartLine === -1) {
            return streamNames;
        }
        
        // Process lines after NAME header until we hit a section marker ($ at start)
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
            
            // Extract FIRST WORD on the line (the stream name)
            // Match: optional whitespace + word (starts with letter, contains alphanumeric/underscore) + (whitespace or comma)
            const streamMatch = line.match(/^[\s]*([A-Za-z][A-Za-z0-9_]*)[\s,]/);
            
            if (streamMatch) {
                const streamName = streamMatch[1].toUpperCase();
                streamNames.add(streamName);
            }
        }
        
        return streamNames;
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
        let inNameSection = false;
        let passedNameSection = false;
        
        for (let lineNum = 0; lineNum < lines.length; lineNum++) {
            const line = lines[lineNum];
            const lineText = line.toUpperCase();
            
            // Check if entering NAME section
            if (lineText.match(/^[\s]*NAME[\s]+/) && !passedNameSection) {
                inNameSection = true;
                continue;
            }
            
            // Check if we've left NAME section
            if (inNameSection && lineText.match(/^[\s]*\$[\s]+[A-Z]/)) {
                inNameSection = false;
                passedNameSection = true;
                continue;
            }
            
            // Skip highlighting in NAME section itself
            if (inNameSection) {
                continue;
            }
            
            // Skip if we're past NAME section and on a comment line or section header
            if (passedNameSection && (lineText.trim().startsWith('$') || 
                lineText.match(/^[\s]*[A-Z]+[\s]+DATA[\s]*$/))) {
                continue;
            }
            
            // Find stream names in this line
            let match;
            streamPattern.lastIndex = 0; // Reset regex
            
            while ((match = streamPattern.exec(line)) !== null) {
                const startChar = match.index;
                const endChar = match.index + match[1].length;
                
                // Create semantic token for this stream name
                const startLine = lineNum;
                const startCol = startChar;
                const length = endChar - startChar;
                
                builder.push(startLine, startCol, length, 0, 0); // Type 0 = streamName
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
