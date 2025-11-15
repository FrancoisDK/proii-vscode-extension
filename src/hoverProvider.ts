/**
 * Hover Provider for PRO/II Language Support Extension
 * Provides inline documentation tooltips for unit operations, thermodynamic methods, parameters, and stream descriptions
 */

import * as vscode from 'vscode';
import { UNIT_OPERATIONS, UnitOperationData } from './data/unitOperations';
import { THERMO_METHODS, ThermoMethodData } from './data/thermoMethods';
import { PARAMETERS, ParameterData } from './data/parameters';
import { streamDescriptions } from './streamNameProvider';

export class ProIIHoverProvider implements vscode.HoverProvider {
    
    /**
     * Main hover provider method called by VS Code
     */
    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken
    ): vscode.ProviderResult<vscode.Hover> {
        
        // Get the word at cursor position
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }
        
        const word = document.getText(wordRange).toUpperCase();
        
        // Check if it's a stream name with description
        if (streamDescriptions.has(word)) {
            return this.createStreamHover(word, streamDescriptions.get(word)!);
        }
        
        // Check if it's a unit operation (FLASH, COLUMN, etc.)
        if (UNIT_OPERATIONS[word]) {
            return this.createUnitOpHover(word, UNIT_OPERATIONS[word]);
        }
        
        // Check if it's a thermodynamic method (SRK, PR, NRTL, etc.)
        if (THERMO_METHODS[word]) {
            return this.createThermoHover(word, THERMO_METHODS[word]);
        }
        
        // Check if it's a parameter (TEMP=, PRES=, etc.)
        // Handle both "TEMP" and "TEMP="
        const paramMatch = word.match(/^([A-Z]+)=?$/);
        if (paramMatch && PARAMETERS[paramMatch[1]]) {
            return this.createParameterHover(paramMatch[1], PARAMETERS[paramMatch[1]]);
        }
        
        // Check for parameters that might be part of a line (e.g., "TEMP=100")
        const line = document.lineAt(position.line).text;
        const lineUpToCursor = line.substring(0, position.character);
        const paramInLineMatch = lineUpToCursor.match(/([A-Z]+)=\s*[^=]*$/);
        if (paramInLineMatch) {
            const param = paramInLineMatch[1];
            if (PARAMETERS[param] && word === param) {
                return this.createParameterHover(param, PARAMETERS[param]);
            }
        }
        
        return undefined;
    }
    
    /**
     * Create hover tooltip for stream names with descriptions (NEW)
     */
    private createStreamHover(name: string, description: string): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        
        // Title with stream icon
        markdown.appendMarkdown(`### ℹ️ Stream: ${name}\n\n`);
        markdown.appendMarkdown(`**${description}**\n`);
        
        return new vscode.Hover(markdown);
    }
    
    /**
     * Create hover tooltip for unit operations
     */
    private createUnitOpHover(name: string, data: UnitOperationData): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        
        // Title with icon
        markdown.appendMarkdown(`### ⚙️ ${name}\n\n`);
        markdown.appendMarkdown(`**${data.description}**\n\n`);
        
        // Types (if available)
        if (data.types && data.types.length > 0) {
            markdown.appendMarkdown(`**Types:**\n`);
            data.types.forEach((type: string) => {
                markdown.appendMarkdown(`- ${type}\n`);
            });
            markdown.appendMarkdown(`\n`);
        }
        
        // Parameters
        if (data.parameters.required.length > 0) {
            markdown.appendMarkdown(`**Required:** \`${data.parameters.required.join('`, `')}\`\n\n`);
        }
        if (data.parameters.optional.length > 0) {
            markdown.appendMarkdown(`**Optional:** \`${data.parameters.optional.join('`, `')}\`\n\n`);
        }
        
        // Example
        if (data.example) {
            markdown.appendMarkdown(`**Example:**\n\`\`\`proii\n${data.example}\n\`\`\`\n`);
        }
        
        // Notes
        if (data.notes) {
            markdown.appendMarkdown(`\n💡 **Note:** ${data.notes}\n`);
        }
        
        return new vscode.Hover(markdown);
    }
    
    /**
     * Create hover tooltip for thermodynamic methods
     */
    private createThermoHover(name: string, data: ThermoMethodData): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        
        // Title
        markdown.appendMarkdown(`### 🧪 ${name}\n\n`);
        markdown.appendMarkdown(`**${data.name}**\n\n`);
        
        // Model type
        if (data.model_type) {
            markdown.appendMarkdown(`*${data.model_type}*\n\n`);
        }
        
        // Best for
        markdown.appendMarkdown(`**Best For:** ${data.suited_for}\n\n`);
        
        // Pressure/temperature range
        markdown.appendMarkdown(`**Range:** ${data.range}\n\n`);
        
        // Applications
        if (data.applications && data.applications.length > 0) {
            markdown.appendMarkdown(`**Applications:**\n`);
            data.applications.forEach((app: string) => {
                markdown.appendMarkdown(`- ${app}\n`);
            });
            markdown.appendMarkdown(`\n`);
        }
        
        // Avoid
        markdown.appendMarkdown(`⚠️ **Avoid:** ${data.avoid}\n`);
        
        return new vscode.Hover(markdown);
    }
    
    /**
     * Create hover tooltip for parameters
     */
    private createParameterHover(name: string, data: ParameterData): vscode.Hover {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        
        // Title
        markdown.appendMarkdown(`### 📊 ${name}\n\n`);
        markdown.appendMarkdown(`**${data.description}**\n\n`);
        
        // Units
        if (data.units && data.units.length > 0) {
            markdown.appendMarkdown(`**Units:** ${data.units.join(', ')}\n\n`);
        }
        
        // Typical range
        if (data.typical_range) {
            markdown.appendMarkdown(`**Typical Range:** ${data.typical_range}\n\n`);
        }
        
        // Related parameters
        if (data.related && data.related.length > 0) {
            markdown.appendMarkdown(`**Related:** \`${data.related.join('`, `')}\`\n\n`);
        }
        
        // Tip
        if (data.tip) {
            markdown.appendMarkdown(`💡 **Tip:** ${data.tip}\n`);
        }
        
        return new vscode.Hover(markdown);
    }
}
