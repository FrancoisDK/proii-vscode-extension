"use strict";
/**
 * Hover Provider for PRO/II Language Support Extension
 * Provides inline documentation tooltips for unit operations, thermodynamic methods, parameters, and stream descriptions
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
exports.ProIIHoverProvider = void 0;
const vscode = __importStar(require("vscode"));
const unitOperations_1 = require("./data/unitOperations");
const thermoMethods_1 = require("./data/thermoMethods");
const parameters_1 = require("./data/parameters");
const streamNameProvider_1 = require("./streamNameProvider");
class ProIIHoverProvider {
    /**
     * Main hover provider method called by VS Code
     */
    provideHover(document, position, token) {
        // Get the word at cursor position
        const wordRange = document.getWordRangeAtPosition(position);
        if (!wordRange) {
            return undefined;
        }
        const word = document.getText(wordRange).toUpperCase();
        // Check if it's a stream name with description
        if (streamNameProvider_1.streamDescriptions.has(word)) {
            return this.createStreamHover(word, streamNameProvider_1.streamDescriptions.get(word));
        }
        // Check if it's a unit operation (FLASH, COLUMN, etc.)
        if (unitOperations_1.UNIT_OPERATIONS[word]) {
            return this.createUnitOpHover(word, unitOperations_1.UNIT_OPERATIONS[word]);
        }
        // Check if it's a thermodynamic method (SRK, PR, NRTL, etc.)
        if (thermoMethods_1.THERMO_METHODS[word]) {
            return this.createThermoHover(word, thermoMethods_1.THERMO_METHODS[word]);
        }
        // Check if it's a parameter (TEMP=, PRES=, etc.)
        // Handle both "TEMP" and "TEMP="
        const paramMatch = word.match(/^([A-Z]+)=?$/);
        if (paramMatch && parameters_1.PARAMETERS[paramMatch[1]]) {
            return this.createParameterHover(paramMatch[1], parameters_1.PARAMETERS[paramMatch[1]]);
        }
        // Check for parameters that might be part of a line (e.g., "TEMP=100")
        const line = document.lineAt(position.line).text;
        const lineUpToCursor = line.substring(0, position.character);
        const paramInLineMatch = lineUpToCursor.match(/([A-Z]+)=\s*[^=]*$/);
        if (paramInLineMatch) {
            const param = paramInLineMatch[1];
            if (parameters_1.PARAMETERS[param] && word === param) {
                return this.createParameterHover(param, parameters_1.PARAMETERS[param]);
            }
        }
        return undefined;
    }
    /**
     * Create hover tooltip for stream names with descriptions (NEW)
     */
    createStreamHover(name, description) {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        // Title with stream icon
        markdown.appendMarkdown(`### 🌊 Stream: ${name}\n\n`);
        markdown.appendMarkdown(`**${description}**\n`);
        return new vscode.Hover(markdown);
    }
    /**
     * Create hover tooltip for unit operations
     */
    createUnitOpHover(name, data) {
        const markdown = new vscode.MarkdownString();
        markdown.isTrusted = true;
        markdown.supportHtml = true;
        // Title with icon
        markdown.appendMarkdown(`### ⚙️ ${name}\n\n`);
        markdown.appendMarkdown(`**${data.description}**\n\n`);
        // Types (if available)
        if (data.types && data.types.length > 0) {
            markdown.appendMarkdown(`**Types:**\n`);
            data.types.forEach((type) => {
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
    createThermoHover(name, data) {
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
            data.applications.forEach((app) => {
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
    createParameterHover(name, data) {
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
exports.ProIIHoverProvider = ProIIHoverProvider;
//# sourceMappingURL=hoverProvider.js.map