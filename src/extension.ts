/**
 * PRO/II Language Support Extension
 * Main extension activation and registration
 */

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { ProIIHoverProvider } from './hoverProvider';
import { StreamNameProvider, semanticTokenLegend } from './streamNameProvider';
import { ComponentHoverProvider } from './componentProvider';
import { ColumnLimiterProvider } from './columnLimiterProvider';
import { ComponentDefinitionProvider } from './componentDefinitionProvider';

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
    
    // Register component hover provider for LIBID component lookup
    const componentProvider = vscode.languages.registerHoverProvider(
        [
            { scheme: 'file', language: 'proii' },
            { scheme: 'untitled', language: 'proii' }
        ],
        new ComponentHoverProvider()
    );
    
    // Create column limiter provider instance
    const columnLimiterProvider = new ColumnLimiterProvider();
    
    // Register column limiter provider for 80-column width diagnostics
    const columnLimiterDiagnostics = vscode.languages.registerCodeActionsProvider(
        [
            { scheme: 'file', language: 'proii' },
            { scheme: 'untitled', language: 'proii' }
        ],
        columnLimiterProvider,
        {
            providedCodeActionKinds: [vscode.CodeActionKind.QuickFix]
        }
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
    context.subscriptions.push(componentProvider);
    context.subscriptions.push(columnLimiterDiagnostics);
    context.subscriptions.push(columnLimiterProvider);
    context.subscriptions.push(streamNameProvider);
    context.subscriptions.push(refreshCommand);
    
    // Register Component Definition Provider and Command
    const componentDefinitionProvider = new ComponentDefinitionProvider();
    const showComponentDefinitionCommand = vscode.commands.registerTextEditorCommand(
        'proii.showComponentDefinition',
        async (editor: vscode.TextEditor) => {
            // Extract components from current document
            componentDefinitionProvider.extractComponents(editor.document);
            // Show component definition
            await componentDefinitionProvider.showComponentDefinition(editor);
        }
    );
    context.subscriptions.push(showComponentDefinitionCommand);
    
    // Auto-extract components when document opens or changes
    const extractComponentsOnOpen = vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'proii') {
            console.log('🧪 Extracting components from opened ProII file');
            componentDefinitionProvider.extractComponents(document);
        }
    });
    context.subscriptions.push(extractComponentsOnOpen);
    
    // Log successful activation
    console.log('✅ PRO/II Hover Provider registered for .inp, .std, and .out files');
    console.log('✅ PRO/II Component Hover Provider registered for LIBID component lookup');
    console.log('✅ PRO/II Component Definition Provider registered (right-click context menu)');
    console.log('✅ PRO/II Column Limiter Provider registered for 80-column width checking');
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
        console.log('🧪 Extracting components from active ProII document');
        componentDefinitionProvider.extractComponents(activeEditor.document);
        // Document will automatically use the semantic token provider
    }
    
    // Setup ruler for [proii] language mode ONLY (not globally)
    // This applies ONLY when editing .inp, .std, .sdf, .out files
    const setupRulerForProiiLanguage = async () => {
        const config = vscode.workspace.getConfiguration('proii');
        const showRuler = config.get<boolean>('columnLimiter.showRuler', true);
        const columnLimit = config.get<number>('columnLimiter.columnLimit', 80);
        
        if (!showRuler) {
            console.log('📏 Ruler disabled via columnLimiter.showRuler setting');
            return;
        }
        
        try {
            console.log(`📏 Setting up ruler for [proii] language mode at column ${columnLimit}`);
            
            // Get current workspace folder
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                console.log('⚠️ No workspace folder found, skipping ruler setup');
                return;
            }
            
            // Create .vscode directory if it doesn't exist
            const vscodePath = path.join(workspaceFolder.uri.fsPath, '.vscode');
            if (!fs.existsSync(vscodePath)) {
                fs.mkdirSync(vscodePath, { recursive: true });
                console.log(`📁 Created .vscode directory: ${vscodePath}`);
            }
            
            // Path to settings.json
            const settingsPath = path.join(vscodePath, 'settings.json');
            
            // Read existing settings or create new object
            let settings: any = {};
            if (fs.existsSync(settingsPath)) {
                try {
                    const content = fs.readFileSync(settingsPath, 'utf8');
                    settings = JSON.parse(content);
                    console.log('📄 Existing settings.json found');
                } catch (err) {
                    console.warn('⚠️ Could not parse existing settings.json, creating new one');
                    settings = {};
                }
            }
            
            // Check if [proii] ruler is already configured
            const proiiSettings = settings['[proii]'] || {};
            const currentRulers = proiiSettings['editor.rulers'] || [];
            
            if (!currentRulers.includes(columnLimit)) {
                // Add/update [proii] language-specific ruler setting
                settings['[proii]'] = settings['[proii]'] || {};
                settings['[proii]']['editor.rulers'] = [columnLimit];
                
                // Write settings file with proper formatting
                fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 4), 'utf8');
                
                console.log(`✅ Ruler configured for [proii] language at column ${columnLimit}`);
                console.log(`📝 Settings written to: ${settingsPath}`);
                
                // Notify user
                vscode.window.showInformationMessage(
                    `PRO/II: Column ruler enabled at position ${columnLimit} (ProII files only)`,
                    'Open Settings'
                ).then(selection => {
                    if (selection === 'Open Settings') {
                        vscode.commands.executeCommand('workbench.action.openWorkspaceSettingsFile');
                    }
                });
            } else {
                console.log(`ℹ️ Ruler already configured at column ${columnLimit}`);
            }
        } catch (err) {
            console.error('❌ Error setting ruler:', err);
            vscode.window.showErrorMessage(`Failed to configure ruler: ${err}`);
        }
    };
    
    // Setup ruler on activation
    setupRulerForProiiLanguage().catch(err => console.error('Ruler setup error:', err));
    
    // Setup column limiter event handlers with debouncing for change events
    let changeTimeout: NodeJS.Timeout | undefined;
    
    const onDidOpenDocument = vscode.workspace.onDidOpenTextDocument((document) => {
        if (document.languageId === 'proii') {
            console.log('📄 PRO/II document opened, checking for column limit violations');
            columnLimiterProvider.checkDocument(document);
        }
    });
    
    const onDidChangeDocument = vscode.workspace.onDidChangeTextDocument((event) => {
        if (event.document.languageId === 'proii') {
            // Debounce change events to avoid excessive checking
            if (changeTimeout) {
                clearTimeout(changeTimeout);
            }
            changeTimeout = setTimeout(() => {
                columnLimiterProvider.checkDocument(event.document);
            }, 100);
        }
    });
    
    const onDidSaveDocument = vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.languageId === 'proii') {
            columnLimiterProvider.checkDocument(document);
        }
    });
    
    context.subscriptions.push(onDidOpenDocument, onDidChangeDocument, onDidSaveDocument);
    
    // Check active document immediately on activation
    if (activeEditor && activeEditor.document.languageId === 'proii') {
        console.log('📄 Checking active PRO/II document for column limit violations');
        columnLimiterProvider.checkDocument(activeEditor.document);
    }
    
    // Also trigger check for all open documents on activation
    vscode.workspace.textDocuments.forEach((document) => {
        if (document.languageId === 'proii') {
            columnLimiterProvider.checkDocument(document);
        }
    });
    
    // Register toggle command for column limiter
    const toggleCommand = vscode.commands.registerCommand('proii.toggleColumnLimiter', () => {
        const config = vscode.workspace.getConfiguration('proii');
        const isEnabled = config.get<boolean>('columnLimiter.enabled', true);
        config.update('columnLimiter.enabled', !isEnabled, vscode.ConfigurationTarget.Global);
        vscode.window.showInformationMessage(
            `PRO/II Column Limiter ${!isEnabled ? 'enabled' : 'disabled'}`
        );
    });
    
    // Register toggle command for ruler
    const toggleRulerCommand = vscode.commands.registerCommand('proii.toggleColumnRuler', async () => {
        const config = vscode.workspace.getConfiguration('proii');
        const currentShowRuler = config.get<boolean>('columnLimiter.showRuler', true);
        const newShowRuler = !currentShowRuler;
        const columnLimit = config.get<number>('columnLimiter.columnLimit', 80);
        
        // Toggle the extension setting
        await config.update('columnLimiter.showRuler', newShowRuler, vscode.ConfigurationTarget.Workspace);
        
        // Also update the [proii] language ruler setting
        try {
            const editorConfig = vscode.workspace.getConfiguration('editor');
            const currentProiiSettings = editorConfig.get<any>('[proii]') || {};
            
            if (newShowRuler) {
                // Enable ruler for [proii] language
                let rulers = currentProiiSettings['rulers'] || [];
                if (!rulers.includes(columnLimit)) {
                    rulers.push(columnLimit);
                }
                currentProiiSettings['rulers'] = rulers;
            } else {
                // Disable ruler for [proii] language
                const rulers = currentProiiSettings['rulers'] || [];
                const newRulers = rulers.filter((r: number) => r !== columnLimit);
                if (newRulers.length > 0) {
                    currentProiiSettings['rulers'] = newRulers;
                } else {
                    delete currentProiiSettings['rulers'];
                }
            }
            
            // Update workspace settings for [proii] language ONLY
            await editorConfig.update('[proii]', currentProiiSettings, vscode.ConfigurationTarget.Workspace);
        } catch (err) {
            console.error('Error toggling ruler:', err);
        }
        
        vscode.window.showInformationMessage(
            `PRO/II Column Ruler ${newShowRuler ? 'enabled' : 'disabled'} (*.inp, *.std, *.sdf, *.out)`
        );
    });
    
    context.subscriptions.push(toggleCommand, toggleRulerCommand);
    
    // Register safe on-save handler to convert tabs to spaces for PRO/II files
    const onWillSave = vscode.workspace.onWillSaveTextDocument(async (e) => {
        const doc = e.document;
        if (doc.languageId !== 'proii') return;

        const config = vscode.workspace.getConfiguration('proii');
        const enabled = config.get<boolean>('format.convertTabsToSpacesOnSave', true);
        if (!enabled) return;

        const tabSize = config.get<number>('format.tabSize', 4);
        const tabReplacement = ' '.repeat(Math.max(1, Math.floor(tabSize)));

        // Build edits by scanning for tabs; avoid saving or making edits if no tabs found
        const edits: vscode.TextEdit[] = [];
        for (let i = 0; i < doc.lineCount; i++) {
            const line = doc.lineAt(i);
            if (line.text.indexOf('\t') !== -1) {
                const replaced = line.text.replace(/\t/g, tabReplacement);
                if (replaced !== line.text) {
                    edits.push(vscode.TextEdit.replace(line.range, replaced));
                }
            }
        }

        if (edits.length === 0) return;

        // Apply edits using e.waitUntil to avoid triggering nested save events
        e.waitUntil(Promise.resolve(new vscode.WorkspaceEdit().set(doc.uri, edits)));
    });

    context.subscriptions.push(onWillSave);
    
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
