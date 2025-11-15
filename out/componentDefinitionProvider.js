"use strict";
/**
 * Component Definition Provider for PRO/II
 * Provides "Show Component Definition" context menu for component indices
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
exports.ComponentDefinitionProvider = void 0;
const vscode = __importStar(require("vscode"));
class ComponentDefinitionProvider {
    constructor() {
        this.componentMap = new Map();
    }
    /**
     * Extract all components from LIBID statements in the document
     * Handles multiple LIBID...BANK= sections
     */
    extractComponents(document) {
        this.componentMap.clear();
        this.documentUri = document.uri;
        const text = document.getText();
        const lines = text.split('\n');
        // Find all LIBID sections (can be multiple LIBID...BANK= groups)
        let inLibid = false;
        let libidText = '';
        let libidStartLine = -1;
        let libidCount = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Check if this line starts LIBID
            if (/^\s*LIBID\b/i.test(line)) {
                // If we were already in a LIBID, process the previous one first
                if (inLibid && libidText) {
                    this.extractComponentsFromLibidText(libidText, libidStartLine, document, text);
                    libidCount++;
                }
                // Start new LIBID section
                inLibid = true;
                libidStartLine = i;
                libidText = line;
                console.log(`Found LIBID section ${libidCount + 1} at line ${i + 1}`);
                continue;
            }
            // If we're in LIBID section
            if (inLibid) {
                // Check if this line contains BANK= (ends current LIBID section)
                if (/BANK\s*=/i.test(line)) {
                    libidText += '\n' + line;
                    console.log(`LIBID section ${libidCount + 1} ends at line ${i + 1}`);
                    // Process this LIBID section
                    this.extractComponentsFromLibidText(libidText, libidStartLine, document, text);
                    libidCount++;
                    // Reset for next LIBID
                    inLibid = false;
                    libidText = '';
                    libidStartLine = -1;
                    continue;
                }
                // Continue accumulating LIBID lines
                libidText += '\n' + line;
            }
        }
        // Process last LIBID section if file ends without explicit terminator
        if (inLibid && libidText) {
            this.extractComponentsFromLibidText(libidText, libidStartLine, document, text);
            libidCount++;
        }
        console.log(`Processed ${libidCount} LIBID section(s)`);
        console.log(`Total unique components extracted: ${this.componentMap.size}`);
    }
    /**
     * Extract components from a single LIBID text block
     */
    extractComponentsFromLibidText(libidText, startLine, document, fullDocumentText) {
        console.log(`Processing LIBID text (${libidText.length} chars)`);
        // Remove line continuations (/& or just & at end of line)
        const cleanedText = libidText.replace(/\s*\/?\s*&\s*$/gm, ' ');
        // Also remove BANK= and everything after it
        const libidOnly = cleanedText.replace(/,?\s*BANK\s*=.*$/i, '');
        console.log('Cleaned LIBID preview:', libidOnly.substring(0, 150));
        // Extract component pairs: number,name
        // Handles: 1,H2O  or  1,H20  or  10,NC4  or  33,OXYLENE
        const componentRegex = /(\d+)\s*,\s*([A-Z][A-Z0-9\-]*)/gi;
        let componentMatch;
        let count = 0;
        while ((componentMatch = componentRegex.exec(libidOnly)) !== null) {
            const id = parseInt(componentMatch[1], 10);
            const name = componentMatch[2].trim();
            // Skip if already exists (first occurrence wins)
            if (this.componentMap.has(id)) {
                console.log(`  Component ${id}: ${name} (duplicate, skipping)`);
                continue;
            }
            // Find the position of this component in the ORIGINAL document
            const searchPattern = new RegExp(`\\b${id}\\s*,\\s*${name}\\b`, 'i');
            const originalMatch = searchPattern.exec(fullDocumentText);
            let position;
            if (originalMatch) {
                position = document.positionAt(originalMatch.index);
            }
            else {
                // Fallback to line-based position
                position = new vscode.Position(startLine, 0);
            }
            this.componentMap.set(id, {
                id,
                name: name.toUpperCase(),
                line: position.line,
                character: position.character
            });
            console.log(`  Component ${id}: ${name}`);
            count++;
        }
        console.log(`  Extracted ${count} components from this LIBID section`);
    }
    /**
     * Show component definition for the selected text
     */
    async showComponentDefinition(editor) {
        const document = editor.document;
        const selection = editor.selection;
        // Extract components if not already done
        if (this.documentUri?.toString() !== document.uri.toString()) {
            this.extractComponents(document);
        }
        // Get the word at cursor
        const wordRange = document.getWordRangeAtPosition(selection.active);
        if (!wordRange) {
            vscode.window.showInformationMessage('No component index selected');
            return;
        }
        const word = document.getText(wordRange);
        // Check if it's a number
        const componentId = parseInt(word, 10);
        if (isNaN(componentId)) {
            vscode.window.showInformationMessage('Selected text is not a component index');
            return;
        }
        // Look up component
        const component = this.componentMap.get(componentId);
        if (!component) {
            vscode.window.showWarningMessage(`Component index ${componentId} not found in LIBID`);
            return;
        }
        // Show component information
        await this.displayComponentInfo(component, editor);
    }
    /**
     * Display component information in multiple ways
     */
    async displayComponentInfo(component, editor) {
        // Get additional info about common components
        const extraInfo = this.getComponentInfo(component.name);
        // Build information message
        let message = `**Component ${component.id}: ${component.name}**`;
        if (extraInfo) {
            message += `\n\n**Type:** ${extraInfo.type}`;
            message += `\n**Formula:** ${extraInfo.formula}`;
            if (extraInfo.mw) {
                message += `\n**MW:** ${extraInfo.mw} g/mol`;
            }
        }
        // Show quick pick with options
        const action = await vscode.window.showQuickPick([
            {
                label: '$(info) Show Info',
                description: `Component ${component.id}: ${component.name}`,
                detail: extraInfo ? `${extraInfo.type} - ${extraInfo.formula}` : 'Component definition',
                action: 'info'
            },
            {
                label: '$(go-to-file) Go to LIBID Definition',
                description: `Line ${component.line + 1}`,
                detail: 'Jump to component definition in LIBID statement',
                action: 'goto'
            },
            {
                label: '$(list-unordered) Show All Components',
                description: `${this.componentMap.size} components defined`,
                detail: 'List all components from LIBID',
                action: 'list'
            }
        ], {
            title: `Component ${component.id}: ${component.name}`,
            placeHolder: 'Choose an action'
        });
        if (!action) {
            return;
        }
        switch (action.action) {
            case 'info':
                await this.showComponentInfoMessage(component, extraInfo);
                break;
            case 'goto':
                await this.goToDefinition(component, editor);
                break;
            case 'list':
                await this.showAllComponents();
                break;
        }
    }
    /**
     * Show component info as a message
     */
    async showComponentInfoMessage(component, extraInfo) {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.appendMarkdown(`### 🧪 Component ${component.id}: ${component.name}\n\n`);
        if (extraInfo) {
            markdown.appendMarkdown(`**Type:** ${extraInfo.type}  \n`);
            markdown.appendMarkdown(`**Formula:** ${extraInfo.formula}  \n`);
            if (extraInfo.mw) {
                markdown.appendMarkdown(`**Molecular Weight:** ${extraInfo.mw} g/mol  \n`);
            }
        }
        else {
            markdown.appendMarkdown(`Component defined in LIBID at line ${component.line + 1}\n`);
        }
        vscode.window.showInformationMessage(`Component ${component.id}: ${component.name}${extraInfo ? ` (${extraInfo.formula})` : ''}`);
    }
    /**
     * Jump to the component definition in LIBID
     */
    async goToDefinition(component, editor) {
        const position = new vscode.Position(component.line, component.character);
        const range = new vscode.Range(position, position.translate(0, component.name.length + 3));
        // Reveal and select the component in LIBID
        editor.selection = new vscode.Selection(range.start, range.end);
        editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
        vscode.window.showInformationMessage(`Jumped to ${component.name} definition`);
    }
    /**
     * Show all components in a quick pick list
     */
    async showAllComponents() {
        const items = Array.from(this.componentMap.values())
            .sort((a, b) => a.id - b.id)
            .map(comp => {
            const extraInfo = this.getComponentInfo(comp.name);
            return {
                label: `$(symbol-number) ${comp.id}`,
                description: comp.name,
                detail: extraInfo ? `${extraInfo.type} - ${extraInfo.formula}` : `Line ${comp.line + 1}`,
                component: comp
            };
        });
        const selected = await vscode.window.showQuickPick(items, {
            title: 'All Components',
            placeHolder: `${items.length} components defined in LIBID`
        });
        if (selected) {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                await this.goToDefinition(selected.component, editor);
            }
        }
    }
    /**
     * Get additional information about common components
     */
    getComponentInfo(name) {
        const components = {
            'H2O': { type: 'Inorganic', formula: 'H₂O', mw: '18.02' },
            'WATER': { type: 'Inorganic', formula: 'H₂O', mw: '18.02' },
            'H2': { type: 'Inorganic Gas', formula: 'H₂', mw: '2.02' },
            'HYDROGEN': { type: 'Inorganic Gas', formula: 'H₂', mw: '2.02' },
            'N2': { type: 'Inorganic Gas', formula: 'N₂', mw: '28.01' },
            'NITROGEN': { type: 'Inorganic Gas', formula: 'N₂', mw: '28.01' },
            'O2': { type: 'Inorganic Gas', formula: 'O₂', mw: '32.00' },
            'OXYGEN': { type: 'Inorganic Gas', formula: 'O₂', mw: '32.00' },
            'CO2': { type: 'Inorganic Gas', formula: 'CO₂', mw: '44.01' },
            'H2S': { type: 'Inorganic Gas', formula: 'H₂S', mw: '34.08' },
            'NH3': { type: 'Inorganic Gas', formula: 'NH₃', mw: '17.03' },
            'AMMONIA': { type: 'Inorganic Gas', formula: 'NH₃', mw: '17.03' },
            'C1': { type: 'Hydrocarbon', formula: 'CH₄ (Methane)', mw: '16.04' },
            'METHANE': { type: 'Hydrocarbon', formula: 'CH₄', mw: '16.04' },
            'C2': { type: 'Hydrocarbon', formula: 'C₂H₆ (Ethane)', mw: '30.07' },
            'ETHANE': { type: 'Hydrocarbon', formula: 'C₂H₆', mw: '30.07' },
            'C3': { type: 'Hydrocarbon', formula: 'C₃H₈ (Propane)', mw: '44.10' },
            'PROPANE': { type: 'Hydrocarbon', formula: 'C₃H₈', mw: '44.10' },
            'IC4': { type: 'Hydrocarbon', formula: 'C₄H₁₀ (i-Butane)', mw: '58.12' },
            'I-BUTANE': { type: 'Hydrocarbon', formula: 'C₄H₁₀', mw: '58.12' },
            'NC4': { type: 'Hydrocarbon', formula: 'C₄H₁₀ (n-Butane)', mw: '58.12' },
            'N-BUTANE': { type: 'Hydrocarbon', formula: 'C₄H₁₀', mw: '58.12' },
            'IC5': { type: 'Hydrocarbon', formula: 'C₅H₁₂ (i-Pentane)', mw: '72.15' },
            'I-PENTANE': { type: 'Hydrocarbon', formula: 'C₅H₁₂', mw: '72.15' },
            'NC5': { type: 'Hydrocarbon', formula: 'C₅H₁₂ (n-Pentane)', mw: '72.15' },
            'N-PENTANE': { type: 'Hydrocarbon', formula: 'C₅H₁₂', mw: '72.15' },
            'NC6': { type: 'Hydrocarbon', formula: 'C₆H₁₄ (Hexane)', mw: '86.18' },
            'HEXANE': { type: 'Hydrocarbon', formula: 'C₆H₁₄', mw: '86.18' },
            'NC7': { type: 'Hydrocarbon', formula: 'C₇H₁₆ (Heptane)', mw: '100.20' },
            'HEPTANE': { type: 'Hydrocarbon', formula: 'C₇H₁₆', mw: '100.20' },
            'NC8': { type: 'Hydrocarbon', formula: 'C₈H₁₈ (Octane)', mw: '114.23' },
            'OCTANE': { type: 'Hydrocarbon', formula: 'C₈H₁₈', mw: '114.23' },
            'NC9': { type: 'Hydrocarbon', formula: 'C₉H₂₀ (Nonane)', mw: '128.26' },
            'NONANE': { type: 'Hydrocarbon', formula: 'C₉H₂₀', mw: '128.26' },
            'NC10': { type: 'Hydrocarbon', formula: 'C₁₀H₂₂ (Decane)', mw: '142.28' },
            'DECANE': { type: 'Hydrocarbon', formula: 'C₁₀H₂₂', mw: '142.28' },
            'NC12': { type: 'Hydrocarbon', formula: 'C₁₂H₂₆ (Dodecane)', mw: '170.34' },
            'DODECANE': { type: 'Hydrocarbon', formula: 'C₁₂H₂₆', mw: '170.34' },
            'BENZENE': { type: 'Aromatic', formula: 'C₆H₆', mw: '78.11' },
            'TOLUENE': { type: 'Aromatic', formula: 'C₇H₈', mw: '92.14' },
        };
        return components[name.toUpperCase()] || null;
    }
}
exports.ComponentDefinitionProvider = ComponentDefinitionProvider;
//# sourceMappingURL=componentDefinitionProvider.js.map