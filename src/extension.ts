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
    
    // Create stream name provider instance
    const streamProvider = new StreamNameProvider();
    
    // Register semantic tokens provider for dynamic stream name highlighting
    const streamNameProvider = vscode.languages.registerDocumentSemanticTokensProvider(
        [
            { scheme: 'file', language: 'proii' },
            { scheme: 'untitled', language: 'proii' }
        ],
        streamProvider,
        semanticTokenLegend
    );
    
    // Register command to refresh semantic tokens
    const refreshCommand = vscode.commands.registerCommand('proii.refreshSemanticTokens', () => {
        console.log('🔄 Manual refresh of semantic tokens requested');
        vscode.commands.executeCommand('editor.action.semanticTokens.restart');
        vscode.window.showInformationMessage('PRO/II stream name highlighting refreshed!');
    });
    
    // Add providers to subscriptions for proper cleanup
    context.subscriptions.push(hoverProvider);
    context.subscriptions.push(streamNameProvider);
    context.subscriptions.push(refreshCommand);
    
    // Log successful activation
    console.log('✅ PRO/II Hover Provider registered for .inp, .std, and .out files');
    console.log('✅ PRO/II Stream Name Provider registered for dynamic name highlighting');
    console.log('✅ Semantic token legend:', semanticTokenLegend);
    
    // Force refresh semantic tokens when a proii document is opened
    const refreshSemanticTokens = vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'proii') {
            console.log('📄 PRO/II document opened, triggering semantic token refresh');
            setTimeout(() => {
                vscode.commands.executeCommand('editor.action.semanticTokens.restart');
            }, 1000); // Delay to ensure document is fully loaded
        }
    });
    
    context.subscriptions.push(refreshSemanticTokens);
    
    // Try to refresh semantic tokens for currently active document if it's proii
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && activeEditor.document.languageId === 'proii') {
        console.log('📄 Active PRO/II document detected, refreshing semantic tokens');
        setTimeout(() => {
            vscode.commands.executeCommand('editor.action.semanticTokens.restart');
        }, 2000);
    }
    
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
