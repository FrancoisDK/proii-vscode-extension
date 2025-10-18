/**
 * PRO/II Language Support Extension
 * Main extension activation and registration
 */

import * as vscode from 'vscode';
import { ProIIHoverProvider } from './hoverProvider';
import { StreamNameProvider, semanticTokenLegend } from './streamNameProvider';

/**
 * This method is called when the extension is activated
 * Activation is triggered when a PRO/II file (.inp, .std, .out) is opened
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 PRO/II Language Support extension is now active!');
    
    // Register hover provider for all PRO/II file types
    const hoverProvider = vscode.languages.registerHoverProvider(
        [
            { scheme: 'file', language: 'proii' },
            { scheme: 'untitled', language: 'proii' }
        ],
        new ProIIHoverProvider()
    );
    
    // Register semantic tokens provider for dynamic stream name highlighting
    const streamNameProvider = vscode.languages.registerDocumentSemanticTokensProvider(
        [
            { scheme: 'file', language: 'proii' },
            { scheme: 'untitled', language: 'proii' }
        ],
        new StreamNameProvider(),
        semanticTokenLegend
    );
    
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
export function deactivate() {
    console.log('👋 PRO/II Language Support extension deactivated');
}
