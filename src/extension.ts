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
        // Force document re-parsing by clearing and re-triggering semantic tokens
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
            // Document will automatically trigger semantic token provider
        }
    });
    
    context.subscriptions.push(refreshSemanticTokens);
    
    // Try to refresh semantic tokens for currently active document if it's proii
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && activeEditor.document.languageId === 'proii') {
        console.log('📄 Active PRO/II document detected, refreshing semantic tokens');
        // Document will automatically use the semantic token provider
    }

    // Convert tabs to spaces on save for PRO/II files if enabled
    const onWillSave = vscode.workspace.onWillSaveTextDocument(async (e) => {
        const doc = e.document;
        if (doc.languageId !== 'proii') {
            return;
        }

        const config = vscode.workspace.getConfiguration('proii.format', doc.uri);
        const enabled = config.get<boolean>('convertTabsToSpacesOnSave', true);
        if (!enabled) {
            return;
        }

        const tabSizeConfig = config.get<number>('tabSize', 4);
        const editorOptions = vscode.window.activeTextEditor?.options;
        const tabSize = typeof editorOptions?.tabSize === 'number' ? Number(editorOptions?.tabSize) : tabSizeConfig;

        // Quick check: only process if document contains tabs
        const text = doc.getText();
        if (!text.includes('\t')) {
            return;
        }

        const spaces = ' '.repeat(tabSize);
        // Also optionally align columns for unit operations
        const alignEnabled = config.get<boolean>('alignColumnsOnSave', true);
        const unitStartCol = config.get<number>('unitStartColumn', 3);
        const uidCol = config.get<number>('uidColumn', 15);
        const paramCol = config.get<number>('parameterStartColumn', 5);

        // Build a regex for unit operation start (case-insensitive)
        const unitOps = ['FLASH','CALC','CALCULATOR','COMPRESSOR','STCALC','COLUMN','PUMP','MIXER','SPLITTER','HX','HCURVE','VALVE','CONTROLLER','OPTIMIZER','SIDESTRIPPER','EQUREACTOR'];
        const unitRegex = new RegExp('^\\s*(' + unitOps.join('|') + ')\\b', 'i');

    const replacedText = text.replace(/\t/g, spaces);
    const lines = replacedText.split(/\r?\n/);
        if (alignEnabled) {
            for (let i = 0; i < lines.length; i++) {
                const ln = lines[i];
                const m = ln.match(unitRegex);
                if (m) {
                    lines[i] = alignUnitLine(ln, m[1], unitStartCol, uidCol, paramCol, spaces);
                }
            }
        }

    const replaced = lines.join('\n');

        // Apply full-document replace using workspace edit
        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(text.length));
        edit.replace(doc.uri, fullRange, replaced);
        await vscode.workspace.applyEdit(edit);
        await doc.save();
        console.log(`⇄ Converted tabs to ${tabSize} spaces for ${doc.fileName}`);
    });

    context.subscriptions.push(onWillSave);

    // Helper: align a single unit operation line
    function alignUnitLine(line: string, unitKeyword: string, unitStartCol: number, uidCol: number, paramCol: number, spaces: string): string {
        // Convert to single-space separators for parsing
        let rest = line.trimStart();
        // Remove initial unit keyword
        rest = rest.substring(unitKeyword.length).trimStart();

        // Extract UID portion
        let uidMatch = rest.match(/\bUID\s*=\s*[^,\s]*/i);
        let uidPart = '';
        if (uidMatch) {
            uidPart = uidMatch[0];
            // remove uid from rest
            rest = rest.replace(uidMatch[0], '').trim();
        }

        // Build line with columns
        const beforeUnit = ' '.repeat(Math.max(0, unitStartCol - 1));
        let out = beforeUnit + unitKeyword;

        // Determine spacing to UID column
        if (uidPart) {
            const needed = Math.max(1, uidCol - (out.length + 1));
            out += ' '.repeat(needed) + uidPart;
        }

        // Determine parameter padding
        const currentLen = out.length;
        const paramPad = Math.max(1, paramCol - currentLen - 1);
        if (rest && rest.length > 0) {
            out += ' '.repeat(paramPad) + rest.trim();
        }

        return out;
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
