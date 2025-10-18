/**
 * Stream Name Provider for PRO/II Language Support
 * Parses NAME section and provides semantic highlighting for stream names
 * This ensures only actual defined streams are highlighted
 */

import * as vscode from 'vscode';

export class StreamNameProvider implements vscode.DocumentSemanticTokensProvider {
    private static outputChannel = vscode.window.createOutputChannel('PRO/II Stream Highlighting');
    
    /**
     * Get stream name length configuration from VS Code settings
     */
    private getStreamNameConfig(): { enabledLengths: number[], minLength: number, maxLength: number } {
        const config = vscode.workspace.getConfiguration('proii.streamNames');
        const enabledLengths = config.get<number[]>('enabledLengths', [3, 4, 5, 6]);
        const minLength = config.get<number>('minLength', 3);
        const maxLength = config.get<number>('maxLength', 6);
        
        return { enabledLengths, minLength, maxLength };
    }

    /**
     * Check if a stream name length should be highlighted based on configuration
     */
    private shouldHighlightStreamName(streamName: string): boolean {
        const config = this.getStreamNameConfig();
        const length = streamName.length;
        
        return config.enabledLengths.includes(length) && 
               length >= config.minLength && 
               length <= config.maxLength;
    }

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
                // Use configurable stream name length validation
                if (this.shouldHighlightStreamName(streamName)) {
                    streamNames.add(streamName);
                }
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
                    // Use configurable stream name length validation
                    if (this.shouldHighlightStreamName(streamName)) {
                        streamNames.add(streamName);
                    }
                    continue;
                }
                
                // No valid stream found - exit this NAME section
                break;
            }
        }
        
        return streamNames;
    }

    /**
     * Check if a line is within a NAME section - must be precise to avoid interfering with grammar highlighting
     */
    private isInNameSection(lineNum: number, lines: string[]): boolean {
        const line = lines[lineNum];
        
        // If this line starts with NAME, it's definitely in a NAME section
        if (line.match(/^[\s]*NAME[\s]+/i)) {
            return true;
        }
        
        // Look backwards for the most recent NAME line
        let nameLineIndex = -1;
        for (let i = lineNum - 1; i >= 0; i--) {
            const currentLine = lines[i].trim();
            
            // If we find a NAME line, record it
            if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
                nameLineIndex = i;
                break;
            }
            
            // If we hit a section boundary or unit operation, stop looking
            if (currentLine.match(/^\$[\s]+[A-Z]/) || 
                lines[i].match(/^[\s]*(FLASH|CALC|CALCULATOR|COMPRESSOR|STCALC|COLUMN|PUMP|MIXER|SPLITTER|HX|HCURVE|VALVE|CONTROLLER|OPTIMIZER|SIDESTRIPPER|EQUREACTOR)[\s]/i)) {
                break;
            }
        }
        
        // If no NAME line found before this line, not in NAME section
        if (nameLineIndex === -1) {
            return false;
        }
        
        // Now check if this line is a valid continuation of that NAME section
        // NAME continuation lines must start with whitespace followed by identifier and comma
        if (line.match(/^[\s]+[A-Za-z][A-Za-z0-9_]*[\s]*,/)) {
            // Verify there's no section boundary between the NAME line and this line
            for (let i = nameLineIndex + 1; i < lineNum; i++) {
                const checkLine = lines[i].trim();
                if (checkLine.match(/^\$[\s]+[A-Z]/) || 
                    lines[i].match(/^[\s]*(FLASH|CALC|CALCULATOR|COMPRESSOR|STCALC|COLUMN|PUMP|MIXER|SPLITTER|HX|HCURVE|VALVE|CONTROLLER|OPTIMIZER|SIDESTRIPPER|EQUREACTOR)[\s]/i)) {
                    return false; // Section boundary found, not in NAME section
                }
            }
            return true;
        }
        
        return false;
    }
    
    /**
     * Find all uses of stream names in the document and return as semantic tokens
     */
    async provideDocumentSemanticTokens(
        document: vscode.TextDocument,
        token: vscode.CancellationToken
    ): Promise<vscode.SemanticTokens> {
        const config = this.getStreamNameConfig();
        const startMessage = `🔍 StreamNameProvider: Starting semantic token analysis for ${document.fileName}`;
        console.log(startMessage);
        StreamNameProvider.outputChannel.appendLine(startMessage);
        
        const configMessage = `🎛️ Configuration: Lengths [${config.enabledLengths.join(', ')}], Min: ${config.minLength}, Max: ${config.maxLength}`;
        console.log(configMessage);
        StreamNameProvider.outputChannel.appendLine(configMessage);
        
        const streamNames = this.parseNameSection(document);
        
        const namesMessage = `🔍 Found ${streamNames.size} stream names: ${Array.from(streamNames).join(', ')}`;
        console.log(namesMessage);
        StreamNameProvider.outputChannel.appendLine(namesMessage);
        
        console.log(`🔍 StreamNameProvider: Found ${streamNames.size} stream names:`, Array.from(streamNames));
        
        if (streamNames.size === 0) {
            console.log('🔍 StreamNameProvider: No streams found, returning empty tokens');
            // Return empty tokens if no streams found
            return new vscode.SemanticTokens(new Uint32Array());
        }
        
        const builder = new vscode.SemanticTokensBuilder();
        
        // Use VS Code's line access instead of manual splitting to handle line endings properly
        const lineCount = document.lineCount;
        
        // Build lines array for isInNameSection method
        const lines: string[] = [];
        for (let i = 0; i < lineCount; i++) {
            lines.push(document.lineAt(i).text);
        }
        
        // Stream names are configurable length (default: 3-6 characters)
        const sortedStreams = Array.from(streamNames).sort((a, b) => b.length - a.length);
        let tokenCount = 0;
        
        // Iterate through document to find stream references
        // Skip NAME sections (where streams are DEFINED) and only highlight in Unit Operations
        for (let lineNum = 0; lineNum < lineCount; lineNum++) {
            const lineObj = document.lineAt(lineNum);
            const line = lineObj.text;
            const trimmed = line.trim();
            
            // Skip section headers (lines starting with $)
            if (trimmed.match(/^\$[\s]*[A-Z]/)) {
                continue;
            }
            
            // Skip NAME sections completely - these are where streams are DEFINED, not referenced
            if (this.isInNameSection(lineNum, lines)) {
                const message = `🚫 Skipping NAME section line ${lineNum + 1}: ${trimmed}`;
                console.log(message);
                StreamNameProvider.outputChannel.appendLine(message);
                continue;
            }
            
            // Only highlight in Unit Operations sections where streams are REFERENCED
            for (const streamName of sortedStreams) {
                // Use word boundary matching for configured stream lengths
                const pattern = new RegExp(`\\b${streamName}\\b`, 'gi');
                
                let match;
                while ((match = pattern.exec(line)) !== null) {
                    const startChar = match.index;
                    const tokenLength = streamName.length;
                    const actualLineLength = document.lineAt(lineNum).text.length;
                    
                    // Validate token bounds to prevent "end character > model.getLineLength" error
                    if (startChar + tokenLength <= actualLineLength && startChar >= 0) {
                        const message = `🎯 StreamNameProvider: Found token '${streamName}' at line ${lineNum + 1}, col ${startChar + 1}`;
                        console.log(message);
                        StreamNameProvider.outputChannel.appendLine(message);
                        builder.push(lineNum, startChar, tokenLength, 0, 0);
                        tokenCount++;
                    } else {
                        const errorMessage = `⚠️ Token bounds error: '${streamName}' at line ${lineNum + 1}, start ${startChar}, length ${tokenLength}, actual line length ${actualLineLength}`;
                        console.warn(errorMessage);
                        StreamNameProvider.outputChannel.appendLine(errorMessage);
                    }
                }
            }
        }
        
        const finalMessage = `🔍 StreamNameProvider: Generated ${tokenCount} semantic tokens`;
        console.log(finalMessage);
        StreamNameProvider.outputChannel.appendLine(finalMessage);
        StreamNameProvider.outputChannel.show(); // Show the output channel
        return builder.build();
    }
    
    /**
     * Check if a line is definitely a stream reference line (not a definition)
     * Only highlight in these specific contexts to avoid false positives
     */
    private isDefiniteStreamReferenceLine(trimmedLine: string): boolean {
        // Only process lines that start with these specific keywords
        const streamReferencePatterns = [
            /^FEED\s+/i,              // FEED statements
            /^PRODUCT\s+/i,           // PRODUCT statements  
            /^PROP\s+STRM\s*=/i,      // PROP STRM= statements
            /^REFS\s*=/i,             // REFS= statements
            /^UID\s*=/i,              // UID= statements (when stream name matches)
        ];
        
        return streamReferencePatterns.some(pattern => pattern.test(trimmedLine));
    }
}

/**
 * Legend for semantic token types and modifiers
 */
export const semanticTokenLegend = new vscode.SemanticTokensLegend(
    ['streamName'], // types
    [''] // modifiers
);
