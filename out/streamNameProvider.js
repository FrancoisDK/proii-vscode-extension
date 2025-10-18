"use strict";
/**
 * Stream Name Provider for PRO/II Language Support
 * Parses NAME section and provides semantic highlighting for stream names
 * This ensures only actual defined streams are highlighted
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.semanticTokenLegend = exports.StreamNameProvider = exports.streamDescriptions = void 0;
const vscode = __importStar(require("vscode"));
// Global map to store stream descriptions accessible to hover provider
exports.streamDescriptions = new Map();
class StreamNameProvider {
    /**
     * Check if a word is a PRO/II keyword that should never be highlighted as a stream
     */
    isProIIKeyword(word) {
        const keywords = new Set([
            'TEMP', 'PRES', 'PRESS', 'PRESSURE', 'TEMPERATURE', 'UID', 'NAME', 'AREA',
            'SET', 'CONFIG', 'CONFIGURE', 'STRM', 'CALC', 'COMP', 'SMR', 'SGVR',
            'DEFINE', 'CASE', 'REAL', 'INTEGER', 'CALL', 'PRINT', 'OPERATION',
            'METHOD', 'TYPE', 'FEED', 'FROM', 'TO', 'VAPOR', 'LIQUID', 'BOTTOMS',
            'DISTILLATE', 'PRODUCT', 'FLASH', 'PUMP', 'MIXER', 'SPLITTER', 'COLUMN',
            'COMPRESSOR', 'VALVE', 'CONTROLLER', 'CALCULATOR', 'STCALC', 'EQUREACTOR',
            'NSTG', 'RATE', 'FRAC', 'DUTY', 'DELT', 'SPEC', 'VARY', 'MAXR', 'MINR',
            'COND', 'REB', 'SIDE', 'REAC', 'CONV', 'SELE', 'METH', 'COOL', 'HEAT',
            'FPROD', 'FOVHD', 'ROVHD', 'FBTMS', 'RBTMS', 'XOVHD', 'XBTMS',
            'RETURN', 'PSPEC', 'PTOP', 'PART', 'VAPO', 'LIQU', 'ADIA', 'OPER',
            'SRXSTR', 'TIMES', 'PLUS', 'MINUS', 'DIVIDE', 'VALUE', 'EST2', 'MAXI',
            'MINI', 'ATOL', 'RTOL', 'ITER', 'SOLVE', 'CPARAM', 'RESULT', 'SEQUENCE',
            'TRAY', 'PASS', 'DPCALC', 'MODEL', 'DP', 'HOT', 'COLD', 'OVHD', 'BTMS',
            'AIRCOOLER', 'INLET', 'OUTLET', 'EFFLUENT', 'STAGE', 'REAC'
        ]);
        return keywords.has(word.toUpperCase());
    }
    /**
     * Check if a position is within a comment (after $ or %)
     */
    isInComment(line, position) {
        const commentStart = line.indexOf('$');
        const commentStartPercent = line.indexOf('%');
        if (commentStart >= 0 && position >= commentStart) {
            return true;
        }
        if (commentStartPercent >= 0 && position >= commentStartPercent) {
            return true;
        }
        return false;
    }
    /**
     * Check if a word appears in a stream context (not just any word)
     */
    isInStreamContext(line, word, position) {
        // Skip if in comment
        if (this.isInComment(line, position)) {
            return false;
        }
        // Look for specific stream contexts
        const beforeWord = line.substring(0, position).toUpperCase();
        const afterWord = line.substring(position + word.length).toUpperCase();
        const trimmedLine = line.trim().toUpperCase();
        // STRM= patterns (check this FIRST before other exclusions)
        if (beforeWord.match(/STRM\s*=\s*$/)) { // Removed \b word boundary
            console.log(`✅ STRM= pattern matched for word: ${word} in line: ${line.trim()}`);
            return true;
        }
        // Skip lines that are clearly not stream references 
        // BUT only if they don't contain STRM= patterns (which we already checked above)
        if (!line.toUpperCase().includes('STRM=') && (trimmedLine.startsWith('DEFINE') ||
            trimmedLine.startsWith('CASE') ||
            trimmedLine.startsWith('PRINT') ||
            trimmedLine.startsWith('SET '))) {
            return false;
        }
        // Skip obvious parameter assignments
        if (beforeWord.match(/\b(TEMP|PRES|PRESSURE|DUTY|RATE|FRAC|SPEC|VARY|NSTG|DELT|UID|METHOD|TYPE|AREA|REAL|INTEGER)\s*=\s*$/)) {
            return false;
        }
        // More permissive approach: Accept most contexts except obvious exclusions
        // This allows for the wide variety of PRO/II syntax patterns
        // Always accept these explicit stream contexts
        if (beforeWord.match(/(FEED|FROM|TO|VAPOR|LIQUID|BOTTOMS|DISTILLATE|PRODUCT|REFS)\s*=\s*$/)) {
            return true;
        }
        // FEED statements without equals (e.g., "FEED SACO, HPSW1")
        if (beforeWord.match(/\bFEED\s+$/)) {
            return true;
        }
        // PRODUCT statements (various patterns)
        if (beforeWord.match(/\bPRODUCT\s+(M|V|L|VAPOR|LIQUID)\s*=\s*$/)) {
            return true;
        }
        // Stream in comma-separated lists or after keywords
        if (afterWord.match(/^\s*[,;]/) || beforeWord.match(/[,\s]\s*$/)) {
            return true;
        }
        // Stream assignments (but exclude obvious parameter assignments already filtered above)
        if (afterWord.match(/^\s*=/)) {
            return true;
        }
        // Unit operation lines - be more liberal
        if (trimmedLine.match(/^(MIXER|SPLITTER|FLASH|PUMP|VALVE|COMPRESSOR|COLUMN|CALCULATOR|STCALC|EQUREACTOR|HX|HCURVE|CONTROLLER|OPTIMIZER)\b/)) {
            return true;
        }
        // Accept streams that appear to be in operational contexts
        // (This is more permissive but relies on our strong keyword exclusions)
        if (!beforeWord.match(/\b(SELECT|CONFIG|CONFIGURE|CALL|OPERATION|SMR|SGVR)\s*$/)) {
            return true;
        }
        return false;
    }
    /**
     * Find potential stream name references in the document
     * This scans for words that could be stream names based on context and length
     */
    findPotentialStreamReferences(document) {
        const potentialStreams = new Map();
        const config = this.getStreamNameConfig();
        const lineCount = document.lineCount;
        // Build lines array for isInNameSection method
        const lines = [];
        for (let i = 0; i < lineCount; i++) {
            lines.push(document.lineAt(i).text);
        }
        let processedLines = 0;
        let skippedLines = 0;
        let foundMatches = 0;
        let contextFailures = 0;
        // Precompute RESULT block ranges to avoid tokenizing descriptions inside them
        const resultRanges = [];
        for (let i = 0; i < lineCount; i++) {
            const t = lines[i].trim().toUpperCase();
            if (t.startsWith('RESULT')) {
                // capture block until PROCEDURE or blank line or a non-continuation line
                let j = i + 1;
                while (j < lineCount) {
                    const ln = lines[j];
                    if (ln.trim() === '' || ln.trim().match(/^[A-Z][A-Z\s]+/) || ln.trim().startsWith('PROCEDURE')) {
                        break;
                    }
                    j++;
                }
                resultRanges.push({ start: i, end: j - 1 });
            }
        }
        const isInResultRange = (ln) => {
            return resultRanges.some(r => ln >= r.start && ln <= r.end);
        };
        for (let lineNum = 0; lineNum < lineCount; lineNum++) {
            const line = document.lineAt(lineNum).text;
            const trimmed = line.trim();
            // Skip section headers, NAME sections and RESULT descriptions
            if (trimmed.match(/^\$[\s]*[A-Z]/) || this.isInNameSection(lineNum, lines)) {
                skippedLines++;
                continue;
            }
            if (isInResultRange(lineNum)) {
                skippedLines++;
                continue;
            }
            processedLines++;
            // Look for potential stream patterns in unit operations
            // Use word boundary pattern to find stream-like words
            const streamPattern = /\b([A-Za-z][A-Za-z0-9_]*)\b/g;
            let match;
            while ((match = streamPattern.exec(line)) !== null) {
                const streamName = match[1].toUpperCase();
                const startChar = match.index;
                // Apply length filters, exclude PRO/II keywords, and check if it's in a valid stream context
                if (this.shouldHighlightStreamName(streamName) &&
                    !this.isProIIKeyword(streamName)) {
                    if (this.isInStreamContext(line, streamName, startChar)) {
                        const location = { line: lineNum, start: startChar, length: streamName.length };
                        if (!potentialStreams.has(streamName)) {
                            potentialStreams.set(streamName, []);
                        }
                        potentialStreams.get(streamName).push(location);
                        foundMatches++;
                        // Debug STRM= patterns specifically
                        if (line.toUpperCase().includes('STRM=')) {
                            console.log(`🎯 Found STRM= pattern: ${streamName} in line: ${line.trim()}`);
                        }
                    }
                    else {
                        contextFailures++;
                        // Debug failed STRM= patterns
                        if (line.toUpperCase().includes('STRM=')) {
                            const beforeWord = line.substring(0, startChar).toUpperCase();
                            const afterWord = line.substring(startChar + streamName.length).toUpperCase();
                            console.log(`❌ Failed STRM= context: ${streamName} in line: ${line.trim()}`);
                            console.log(`   beforeWord: "${beforeWord}"`);
                            console.log(`   afterWord: "${afterWord}"`);
                            console.log(`   position: ${startChar}`);
                        }
                    }
                }
            }
        }
        console.log(`📊 Stream reference scan: processed ${processedLines} lines, skipped ${skippedLines} lines`);
        console.log(`📊 Found ${foundMatches} stream matches, ${contextFailures} context failures`);
        return potentialStreams;
    }
    /**
     * Get stream name length configuration from VS Code settings
     */
    getStreamNameConfig() {
        const config = vscode.workspace.getConfiguration('proii.streamNames');
        const enabledLengths = config.get('enabledLengths', [3, 4, 5, 6]);
        const minLength = config.get('minLength', 3);
        const maxLength = config.get('maxLength', 6);
        return { enabledLengths, minLength, maxLength };
    }
    /**
     * Check if a stream name length should be highlighted based on configuration
     */
    shouldHighlightStreamName(streamName) {
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
    parseNameSection(document) {
        const streamNames = new Set();
        const text = document.getText();
        const lines = text.split(/[\r\n]/);
        // Clear previous descriptions
        exports.streamDescriptions.clear();
        // Find ALL lines starting with "NAME" keyword
        const nameStartLines = [];
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].match(/^[\s]*NAME[\s]+/i)) {
                nameStartLines.push(i);
            }
        }
        console.log(`🔍 Found ${nameStartLines.length} NAME sections`);
        // Process each NAME section
        for (const nameStartLine of nameStartLines) {
            const nameLine = lines[nameStartLine];
            // Extract stream name from NAME line itself (first identifier after NAME keyword)
            const nameLineMatch = nameLine.match(/^[\s]*NAME[\s]+([A-Za-z][A-Za-z0-9_]*)/i);
            if (nameLineMatch) {
                const streamName = nameLineMatch[1].toUpperCase();
                if (streamName !== 'NAME' && !this.isProIIKeyword(streamName) && this.shouldHighlightStreamName(streamName)) {
                    streamNames.add(streamName);
                    // Extract description from the rest of the NAME line
                    // Format: "NAME STREAMNAME     ,DESC1    ,DESC2    ,DESC3       /*"
                    const descriptionMatch = nameLine.match(/^[\s]*NAME[\s]+[A-Za-z][A-Za-z0-9_]*\s+(.*?)(?:\/\*|$)/);
                    if (descriptionMatch) {
                        const descriptionPart = descriptionMatch[1].trim();
                        // Extract descriptions from comma-separated format
                        const descriptions = descriptionPart
                            .split(',')
                            .map(s => s.trim())
                            .filter(s => s.length > 0)
                            .join(' ');
                        if (descriptions) {
                            exports.streamDescriptions.set(streamName, descriptions);
                            console.log(`   📝 Added stream from NAME line: ${streamName} -> "${descriptions}"`);
                        }
                        else {
                            console.log(`   📝 Added stream from NAME line: ${streamName} (no description)`);
                        }
                    }
                }
            }
            // Collect description lines from continuation
            let fullDescription = '';
            // Process continuation lines in this NAME section
            for (let i = nameStartLine + 1; i < lines.length; i++) {
                const line = lines[i];
                const trimmed = line.trim();
                // Stop at next section (lines starting with $ followed by text)
                if (trimmed.match(/^\$[\s]+[A-Z]/)) {
                    console.log(`   🔚 Stopped at section boundary: ${trimmed}`);
                    break;
                }
                // Stop if we hit a unit operation keyword  
                if (trimmed.match(/^(HX|MIXER|SPLITTER|FLASH|PUMP|VALVE|COMPRESSOR|COLUMN|CALCULATOR|STCALC|EQUREACTOR|CONTROLLER|OPTIMIZER|RXGIBBS|PLUGFLOW|CSTR)\b/i)) {
                    console.log(`   🔚 Stopped at unit operation: ${trimmed}`);
                    break;
                }
                // Skip empty lines
                if (!trimmed) {
                    continue;
                }
                // For continuation lines: extract stream name and description
                if (line.match(/^[\s]+/)) {
                    // Extract stream name and description from this line
                    // Format: "       STREAMNAME     ,DESC1    ,DESC2    ,DESC3       /*"
                    const fullLineMatch = line.match(/^\s*([A-Za-z][A-Za-z0-9_]*)\s+(.*?)(?:\/\*|$)/);
                    if (fullLineMatch) {
                        const streamName = fullLineMatch[1].toUpperCase();
                        const descriptionPart = fullLineMatch[2].trim();
                        if (streamName !== 'NAME' && !this.isProIIKeyword(streamName) && this.shouldHighlightStreamName(streamName)) {
                            streamNames.add(streamName);
                            // Extract descriptions from comma-separated format
                            // Remove leading comma and split by comma, then filter and join
                            const descriptions = descriptionPart
                                .split(',')
                                .map(s => s.trim())
                                .filter(s => s.length > 0)
                                .join(' ');
                            if (descriptions) {
                                exports.streamDescriptions.set(streamName, descriptions);
                                console.log(`   📝 Added stream from continuation: ${streamName} -> "${descriptions}"`);
                            }
                            else {
                                console.log(`   📝 Added stream from continuation: ${streamName} (no description)`);
                            }
                        }
                    }
                    continue;
                }
                // If we reach a line that doesn't start with whitespace and isn't a section boundary,
                // this might be the end of the NAME section
                console.log(`   🔚 End of NAME section at: ${trimmed}`);
                break;
            }
        }
        console.log(`🔍 Parsed ${streamNames.size} stream names:`, Array.from(streamNames));
        return streamNames;
    }
    /**
     * Check if a line is within a NAME section - must be precise to avoid interfering with grammar highlighting
     */
    isInNameSection(lineNum, lines) {
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
    async provideDocumentSemanticTokens(document, token) {
        const definedStreams = this.parseNameSection(document);
        const potentialStreams = this.findPotentialStreamReferences(document);
        // Debug logging to see what's happening
        console.log(`🔍 Found ${potentialStreams.size} potential stream references`);
        const referenceCount = Array.from(potentialStreams.values()).reduce((total, locations) => total + locations.length, 0);
        console.log(`📍 Total reference locations: ${referenceCount}`);
        const builder = new vscode.SemanticTokensBuilder();
        // Only highlight DEFINED streams in blue (no red for undefined)
        for (const [streamName, locations] of potentialStreams.entries()) {
            const isDefined = definedStreams.has(streamName);
            // Only add tokens for defined streams
            if (isDefined) {
                for (const location of locations) {
                    const actualLineLength = document.lineAt(location.line).text.length;
                    // Validate token bounds
                    if (location.start + location.length <= actualLineLength && location.start >= 0) {
                        builder.push(location.line, location.start, location.length, 0, 0); // 0 = streamName (blue)
                    }
                }
            }
        }
        return builder.build();
    }
    /**
     * Check if a line is definitely a stream reference line (not a definition)
     * Only highlight in these specific contexts to avoid false positives
     */
    isDefiniteStreamReferenceLine(trimmedLine) {
        // Only process lines that start with these specific keywords
        const streamReferencePatterns = [
            /^FEED\s+/i, // FEED statements
            /^PRODUCT\s+/i, // PRODUCT statements  
            /^PROP\s+STRM\s*=/i, // PROP STRM= statements
            /^REFS\s*=/i, // REFS= statements
            /^UID\s*=/i, // UID= statements (when stream name matches)
        ];
        return streamReferencePatterns.some(pattern => pattern.test(trimmedLine));
    }
}
exports.StreamNameProvider = StreamNameProvider;
/**
 * Legend for semantic token types and modifiers
 */
exports.semanticTokenLegend = new vscode.SemanticTokensLegend(['streamName'], // types: 0 = defined streams (blue only)
[''] // modifiers
);
//# sourceMappingURL=streamNameProvider.js.map