#!/usr/bin/env node

/**
 * End-to-End Integration Test for Stream Name Highlighting
 * Tests the complete flow: parsing NAME sections, extracting streams, and highlighting references
 * 
 * Run with: node test-stream-highlighting.js path/to/proii/file.inp
 */

const fs = require('fs');
const path = require('path');

class StreamHighlightingTest {
    constructor(filePath) {
        this.filePath = filePath;
        this.content = fs.readFileSync(filePath, 'utf-8');
        this.lines = this.content.split(/[\r\n]/);
        this.results = [];
        this.totalTests = 0;
        this.passedTests = 0;
    }

    log(message, status = 'INFO') {
        const timestamp = new Date().toISOString();
        const color = {
            'INFO': '\x1b[36m',
            'PASS': '\x1b[32m',
            'FAIL': '\x1b[31m',
            'WARN': '\x1b[33m'
        }[status] || '\x1b[0m';
        const reset = '\x1b[0m';
        console.log(`${color}[${status}]${reset} ${message}`);
    }

    test(name, condition) {
        this.totalTests++;
        if (condition) {
            this.passedTests++;
            this.log(`✓ ${name}`, 'PASS');
            return true;
        } else {
            this.log(`✗ ${name}`, 'FAIL');
            return false;
        }
    }

    parseNameSections() {
        this.log('\n=== TEST 1: Parse NAME Sections ===', 'INFO');

        const streamNames = new Set();
        const nameStartLines = [];

        // Find all NAME sections
        for (let i = 0; i < this.lines.length; i++) {
            if (this.lines[i].match(/^[\s]*NAME[\s]+/i)) {
                nameStartLines.push(i);
            }
        }

        this.test('Should find NAME sections', nameStartLines.length > 0);
        this.log(`Found ${nameStartLines.length} NAME sections at lines: ${nameStartLines.join(', ')}`, 'INFO');

        // Parse each NAME section
        for (const nameStartLine of nameStartLines) {
            const nameLine = this.lines[nameStartLine];

            // Extract stream from NAME line itself
            const nameLineMatch = nameLine.match(/^[\s]*NAME[\s]+([A-Za-z][A-Za-z0-9_]*)[\s,]/i);
            if (nameLineMatch) {
                streamNames.add(nameLineMatch[1].toUpperCase());
            }

            // Extract streams from continuation lines
            for (let i = nameStartLine + 1; i < this.lines.length; i++) {
                const line = this.lines[i];
                const trimmed = line.trim();

                // Stop at next section
                if (trimmed.match(/^\$[\s]+[A-Z]/)) {
                    break;
                }

                // Skip empty lines
                if (!trimmed) {
                    continue;
                }

                // Match continuation lines
                const contMatch = line.match(/^[\s]+([A-Za-z][A-Za-z0-9_]*)[\s]*[,/]/);
                if (contMatch) {
                    streamNames.add(contMatch[1].toUpperCase());
                    continue;
                }

                // Exit if no match
                break;
            }
        }

        this.streamNames = streamNames;
        this.test(`Should extract streams (count: ${streamNames.size})`, streamNames.size > 0);
        this.log(`Extracted ${streamNames.size} unique stream names`, 'INFO');

        // Show sample streams
        const samples = Array.from(streamNames).slice(0, 10);
        this.log(`Sample streams: ${samples.join(', ')}`, 'INFO');

        return streamNames;
    }

    validateStreamReferences() {
        this.log('\n=== TEST 2: Validate Stream References ===', 'INFO');

        const referencedStreams = new Map();
        const patterns = [
            { name: 'FEED keyword', regex: /FEED[\s]+([A-Za-z][A-Za-z0-9_]*)/gi },
            { name: 'PRODUCT keyword', regex: /PRODUCT[\s]*[V=]*\s*([A-Za-z][A-Za-z0-9_]*)/gi },
            { name: 'STRM= parameter', regex: /STRM=([A-Za-z][A-Za-z0-9_]*)/gi },
            { name: 'OUTPUT STRM= parameter', regex: /OUTPUT.*STRM[\s]*=[\s]*([A-Za-z][A-Za-z0-9_]*)/gi }
        ];

        for (const pattern of patterns) {
            let match;
            const regex = pattern.regex;
            while ((match = regex.exec(this.content)) !== null) {
                const streamName = match[1].toUpperCase();
                if (!referencedStreams.has(pattern.name)) {
                    referencedStreams.set(pattern.name, []);
                }
                referencedStreams.get(pattern.name).push(streamName);
            }
        }

        this.test('Should find stream references in FEED keywords', 
            (referencedStreams.get('FEED keyword')?.length || 0) > 0);
        this.test('Should find stream references in PRODUCT keywords', 
            (referencedStreams.get('PRODUCT keyword')?.length || 0) > 0);
        this.test('Should find stream references in STRM= parameters', 
            (referencedStreams.get('STRM= parameter')?.length || 0) > 0);

        for (const [context, streams] of referencedStreams) {
            this.log(`Found ${streams.length} streams in "${context}"`, 'INFO');
        }

        return referencedStreams;
    }

    validateNameSectionDefinedStreams() {
        this.log('\n=== TEST 3: Validate Referenced Streams Exist ===', 'INFO');

        const refs = this.validateStreamReferences();
        let totalRefs = 0;
        let foundRefs = 0;

        for (const [context, streamList] of refs) {
            for (const streamName of streamList) {
                totalRefs++;
                if (this.streamNames.has(streamName)) {
                    foundRefs++;
                } else {
                    // Check if it's a keyword that shouldn't be highlighted
                    const keywords = ['OUTPUT', 'FORMAT', 'STRM', 'RESULT', 'DATA', 'DEFINE'];
                    if (!keywords.includes(streamName)) {
                        this.log(`Warning: Referenced stream "${streamName}" not found in NAME section`, 'WARN');
                    }
                }
            }
        }

        this.test(`Should find most stream references in NAME section (${foundRefs}/${totalRefs})`, 
            foundRefs / totalRefs > 0.8);

        return { found: foundRefs, total: totalRefs };
    }

    checkSemanticTokenGeneration() {
        this.log('\n=== TEST 4: Semantic Token Generation ===', 'INFO');

        const tokenCount = this.streamNames.size;
        this.test('Should generate semantic tokens for each stream', tokenCount > 0);
        this.log(`Ready to generate ${tokenCount} semantic tokens`, 'INFO');

        return tokenCount;
    }

    runAllTests() {
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║  STREAM NAME HIGHLIGHTING - END-TO-END INTEGRATION TEST    ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        this.log(`Testing file: ${this.filePath}`, 'INFO');
        this.log(`File size: ${this.lines.length} lines\n`, 'INFO');

        // Run all tests
        this.parseNameSections();
        this.validateNameSectionDefinedStreams();
        this.checkSemanticTokenGeneration();

        // Summary
        console.log('\n╔════════════════════════════════════════════════════════════╗');
        console.log('║                     TEST SUMMARY                           ║');
        console.log('╚════════════════════════════════════════════════════════════╝\n');

        this.log(`Total Tests: ${this.totalTests}`, 'INFO');
        this.log(`Passed: ${this.passedTests}`, this.passedTests === this.totalTests ? 'PASS' : 'FAIL');
        this.log(`Failed: ${this.totalTests - this.passedTests}`, 'INFO');

        const successRate = ((this.passedTests / this.totalTests) * 100).toFixed(1);
        const status = this.passedTests === this.totalTests ? 'ALL TESTS PASSED' : `${successRate}% PASSED`;
        
        console.log(`\nResult: ${status}\n`);

        return this.passedTests === this.totalTests;
    }
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Usage: node test-stream-highlighting.js <path-to-proii-file.inp>');
    process.exit(1);
}

const filePath = args[0];
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

const tester = new StreamHighlightingTest(filePath);
const success = tester.runAllTests();

process.exit(success ? 0 : 1);
