/**
 * Column Limiter Provider
 * Provides diagnostics for lines exceeding 80 characters in PRO/II files
 * Pro/II typically truncates output at 80 columns, so this helps catch potential issues
 */

import * as vscode from 'vscode';

export class ColumnLimiterProvider implements vscode.CodeActionProvider {
    private diagnosticCollection: vscode.DiagnosticCollection;
    private columnLimit: number = 80;
    private enableDiagnostics: boolean = true;

    constructor() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('proii-column-limiter');
    }

    /**
     * Check a document for lines exceeding the column limit
     */
    public checkDocument(document: vscode.TextDocument): void {
        if (document.languageId !== 'proii') {
            return;
        }

        const config = vscode.workspace.getConfiguration('proii');
        this.enableDiagnostics = config.get<boolean>('columnLimiter.enabled', true);
        this.columnLimit = config.get<number>('columnLimiter.columnLimit', 80);
        const warnOnExceed = config.get<boolean>('columnLimiter.warnOnExceed', true);

        if (!this.enableDiagnostics || !warnOnExceed) {
            this.diagnosticCollection.delete(document.uri);
            return;
        }

        const diagnostics: vscode.Diagnostic[] = [];

        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            const lineText = line.text;

            // Skip empty lines and comment-only lines
            if (lineText.trim().length === 0) {
                continue;
            }

            // Check if line exceeds column limit
            if (lineText.length > this.columnLimit) {
                const exceededBy = lineText.length - this.columnLimit;
                const range = new vscode.Range(
                    new vscode.Position(i, this.columnLimit),
                    new vscode.Position(i, lineText.length)
                );

                const diagnostic = new vscode.Diagnostic(
                    range,
                    `Line exceeds ${this.columnLimit} character limit by ${exceededBy} character${exceededBy > 1 ? 's' : ''} (Pro/II typically truncates at column 80)`,
                    vscode.DiagnosticSeverity.Warning
                );

                diagnostic.code = 'proii-column-limit';
                diagnostic.source = 'PRO/II Column Limiter';
                diagnostic.tags = [vscode.DiagnosticTag.Unnecessary];

                diagnostics.push(diagnostic);
            }
        }

        this.diagnosticCollection.set(document.uri, diagnostics);
    }

    /**
     * Provide code actions to fix column limit violations
     */
    public provideCodeActions(
        document: vscode.TextDocument,
        range: vscode.Range | vscode.Selection,
        context: vscode.CodeActionContext,
        _token: vscode.CancellationToken
    ): vscode.CodeAction[] {
        const actions: vscode.CodeAction[] = [];

        // Check if any diagnostic in this range is a column limit violation
        const relevantDiagnostics = context.diagnostics.filter(
            (diag) => diag.code === 'proii-column-limit'
        );

        if (relevantDiagnostics.length === 0) {
            return actions;
        }

        const config = vscode.workspace.getConfiguration('proii');
        const enableAutoFix = config.get<boolean>('columnLimiter.enableAutoFix', true);

        if (!enableAutoFix) {
            return actions;
        }

        // Action 1: Truncate line to column limit
        const truncateAction = new vscode.CodeAction(
            `Truncate line to ${this.columnLimit} characters`,
            vscode.CodeActionKind.QuickFix
        );
        truncateAction.edit = new vscode.WorkspaceEdit();
        
        const lineIndex = range.start.line;
        const line = document.lineAt(lineIndex);
        if (line.text.length > this.columnLimit) {
            const truncatedText = line.text.substring(0, this.columnLimit);
            truncateAction.edit.replace(
                document.uri,
                line.range,
                truncatedText
            );
        }
        actions.push(truncateAction);

        // Action 2: Continue line (add & continuation marker and break to next line)
        const continueAction = new vscode.CodeAction(
            'Continue line with & marker (comment)',
            vscode.CodeActionKind.QuickFix
        );
        continueAction.edit = new vscode.WorkspaceEdit();
        
        if (line.text.length > this.columnLimit) {
            // Find a good break point (after whitespace if possible)
            let breakPoint = this.columnLimit;
            
            // Try to find a break point at whitespace
            for (let i = this.columnLimit; i > Math.max(this.columnLimit - 20, 0); i--) {
                if (/\s/.test(line.text[i])) {
                    breakPoint = i;
                    break;
                }
            }

            const firstPart = line.text.substring(0, breakPoint).trimEnd() + ' &';
            const secondPart = line.text.substring(breakPoint).trimStart();
            
            continueAction.edit.replace(
                document.uri,
                line.range,
                firstPart + '\n' + secondPart
            );
        }
        actions.push(continueAction);

        // Action 3: Add comment line with truncated content
        const truncateWithCommentAction = new vscode.CodeAction(
            `Add comment with truncated content`,
            vscode.CodeActionKind.QuickFix
        );
        truncateWithCommentAction.edit = new vscode.WorkspaceEdit();
        
        if (line.text.length > this.columnLimit) {
            const truncatedText = line.text.substring(0, this.columnLimit);
            const truncatedPart = line.text.substring(this.columnLimit);
            truncateWithCommentAction.edit.replace(
                document.uri,
                line.range,
                truncatedText + '\n$ ' + truncatedPart
            );
        }
        actions.push(truncateWithCommentAction);

        // Action 4: Ignore this line (disable warning)
        const ignoreAction = new vscode.CodeAction(
            'Disable this line (add to ignore)',
            vscode.CodeActionKind.QuickFix
        );
        ignoreAction.edit = new vscode.WorkspaceEdit();
        
        // Add # noqa-line comment at end
        const lineWithIgnore = line.text + ' $ noqa: proii-column-limit';
        ignoreAction.edit.replace(document.uri, line.range, lineWithIgnore);
        actions.push(ignoreAction);

        return actions;
    }

    /**
     * Dispose of resources
     */
    public dispose(): void {
        this.diagnosticCollection.dispose();
    }

    /**
     * Get the current column limit
     */
    public getColumnLimit(): number {
        return this.columnLimit;
    }

    /**
     * Set the column limit
     */
    public setColumnLimit(limit: number): void {
        this.columnLimit = Math.max(40, Math.min(200, limit));
    }
}
