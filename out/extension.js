"use strict";
/**
 * PRO/II Language Support Extension
 * Main extension activation and registration
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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const hoverProvider_1 = require("./hoverProvider");
const streamNameProvider_1 = require("./streamNameProvider");
/**
 * This method is called when the extension is activated
 * Activation is triggered when a PRO/II file (.inp, .std, .out) is opened
 */
function activate(context) {
    console.log('🚀 PRO/II Language Support extension is now active!');
    // Register hover provider for all PRO/II file types
    const hoverProvider = vscode.languages.registerHoverProvider([
        { scheme: 'file', language: 'proii' },
        { scheme: 'untitled', language: 'proii' }
    ], new hoverProvider_1.ProIIHoverProvider());
    // Register semantic tokens provider for dynamic stream name highlighting
    const streamNameProvider = vscode.languages.registerDocumentSemanticTokensProvider([
        { scheme: 'file', language: 'proii' },
        { scheme: 'untitled', language: 'proii' }
    ], new streamNameProvider_1.StreamNameProvider(), streamNameProvider_1.semanticTokenLegend);
    // Add providers to subscriptions for proper cleanup
    context.subscriptions.push(hoverProvider);
    context.subscriptions.push(streamNameProvider);
    // Log successful activation
    console.log('✅ PRO/II Hover Provider registered for .inp, .std, and .out files');
    console.log('✅ PRO/II Stream Name Provider registered for dynamic name highlighting');
    // Optional: Show activation message (disable in production)
    // vscode.window.showInformationMessage('PRO/II Language Support activated with hover tooltips!');
}
/**
 * This method is called when the extension is deactivated
 * Used for cleanup if needed
 */
function deactivate() {
    console.log('👋 PRO/II Language Support extension deactivated');
}
//# sourceMappingURL=extension.js.map