import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "logwizardry.insertMagicalLog",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const { document, selection } = editor;
        const line = document.lineAt(selection.start);
        const endOfSelection = selection.end;
        const positionAfterSelection = endOfSelection.translate(1, 0); // Move one line down, 0 columns to the right

        const clipboardText = await vscode.env.clipboard.readText();

        const selectionText = document.getText(selection);

        if (selectionText) {
          const logText = `console.log('🌙 ――― file: ${document.fileName}:${
            line.lineNumber + 1
          } ――― error:', ${selectionText});`;
          editor.insertSnippet(
            new vscode.SnippetString(logText),
            positionAfterSelection
          );
        } else {
          const logText = `console.log('🌙 ――― file: ${document.fileName}:${
            line.lineNumber + 1
          } ――― error:', ${clipboardText});`;

          editor.insertSnippet(
            new vscode.SnippetString(logText),
            selection.start
          );
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
