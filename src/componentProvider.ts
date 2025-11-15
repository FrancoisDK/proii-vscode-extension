/**
 * Component Hover Provider for PRO/II
 * Extracts component information from LIBID statements and provides hover tooltips
 */

import * as vscode from 'vscode';

interface ComponentInfo {
    [componentName: string]: {
        id: number;
        name: string;
    };
}

export class ComponentHoverProvider implements vscode.HoverProvider {
    private componentMap: ComponentInfo = {};

    /**
     * Extract all components from LIBID statements in the document
     */
    private extractComponents(document: vscode.TextDocument): void {
        this.componentMap = {};
        
        const text = document.getText();
        
        // Match LIBID statements (including multi-line with /&)
        // Pattern: LIBID followed by component pairs (number,name/number,name...)
        const libidRegex = /\bLIBID\b([^]*?)(?=\b(?:BANK|ASSAY|CUTPOINTS|CURVEFIT|FORMATION|WATER|SHLB|FIT|SPLINE|CONVERSION|TBPCUTS|BLEND|NAME|COMP|SET|UID|DEFINE|SPEC|VARY|RESULT|FEED|PRODUCT|METHOD)\b|^[\s]*[A-Z]\w*\s*=|$)/gm;
        
        let match;
        while ((match = libidRegex.exec(text)) !== null) {
            const libidContent = match[1];
            
            // Extract component pairs: number,name
            const componentRegex = /(\d+),([A-Z][A-Z0-9]*)/g;
            let componentMatch;
            
            while ((componentMatch = componentRegex.exec(libidContent)) !== null) {
                const id = parseInt(componentMatch[1], 10);
                const name = componentMatch[2];
                
                this.componentMap[name.toUpperCase()] = {
                    id,
                    name
                };
            }
        }
    }

    /**
     * Main hover provider method
     */
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        // Extract components from document
        this.extractComponents(document);
        
        // Get the word at cursor
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }
        
        const word = document.getText(wordRange).toUpperCase();
        
        // Check if this word is a component name
        if (this.componentMap[word]) {
            return this.createComponentHover(word, this.componentMap[word]);
        }
        
        return undefined;
    }

    /**
     * Create hover tooltip for component information
     */
    private createComponentHover(name: string, info: { id: number; name: string }): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        
        // Title
        markdown.appendMarkdown(`### 🧪 Component: ${name}\n\n`);
        
        // Create a nice table format
        markdown.appendMarkdown(`| Property | Value |\n`);
        markdown.appendMarkdown(`|----------|-------|\n`);
        markdown.appendMarkdown(`| **Index** | ${info.id} |\n`);
        markdown.appendMarkdown(`| **Name** | ${info.name} |\n`);
        
        // Add common aliases/information for known components
        const componentInfo = this.getComponentInfo(name);
        if (componentInfo) {
            markdown.appendMarkdown(`| **Type** | ${componentInfo.type} |\n`);
            markdown.appendMarkdown(`| **Formula** | ${componentInfo.formula} |\n`);
            if (componentInfo.mw) {
                markdown.appendMarkdown(`| **Molecular Weight** | ${componentInfo.mw} g/mol |\n`);
            }
        }
        
        markdown.appendMarkdown(`\n`);
        markdown.appendMarkdown(`💡 **Tip:** Hover over any component name in your file to see its index and properties.\n`);
        
        return new vscode.Hover(markdown);
    }

    /**
     * Get additional information about common components
     */
    private getComponentInfo(name: string): { type: string; formula: string; mw?: string } | null {
        const components: { [key: string]: { type: string; formula: string; mw?: string } } = {
            'H2O': { type: 'Inorganic', formula: 'H₂O', mw: '18.02' },
            'H2': { type: 'Inorganic Gas', formula: 'H₂', mw: '2.02' },
            'N2': { type: 'Inorganic Gas', formula: 'N₂', mw: '28.01' },
            'O2': { type: 'Inorganic Gas', formula: 'O₂', mw: '32.00' },
            'CO2': { type: 'Inorganic Gas', formula: 'CO₂', mw: '44.01' },
            'H2S': { type: 'Inorganic Gas', formula: 'H₂S', mw: '34.08' },
            'NH3': { type: 'Inorganic Gas', formula: 'NH₃', mw: '17.03' },
            'C1': { type: 'Hydrocarbon', formula: 'CH₄ (Methane)', mw: '16.04' },
            'C2': { type: 'Hydrocarbon', formula: 'C₂H₆ (Ethane)', mw: '30.07' },
            'C3': { type: 'Hydrocarbon', formula: 'C₃H₈ (Propane)', mw: '44.10' },
            'IC4': { type: 'Hydrocarbon', formula: 'C₄H₁₀ (i-Butane)', mw: '58.12' },
            'NC4': { type: 'Hydrocarbon', formula: 'C₄H₁₀ (n-Butane)', mw: '58.12' },
            'IC5': { type: 'Hydrocarbon', formula: 'C₅H₁₂ (i-Pentane)', mw: '72.15' },
            'NC5': { type: 'Hydrocarbon', formula: 'C₅H₁₂ (n-Pentane)', mw: '72.15' },
            'NC6': { type: 'Hydrocarbon', formula: 'C₆H₁₄ (Hexane)', mw: '86.18' },
            'NC7': { type: 'Hydrocarbon', formula: 'C₇H₁₆ (Heptane)', mw: '100.20' },
            'NC8': { type: 'Hydrocarbon', formula: 'C₈H₁₈ (Octane)', mw: '114.23' },
            'NC10': { type: 'Hydrocarbon', formula: 'C₁₀H₂₂ (Decane)', mw: '142.28' },
            'NC12': { type: 'Hydrocarbon', formula: 'C₁₂H₂₆ (Dodecane)', mw: '170.34' },
        };
        
        return components[name] || null;
    }
}
