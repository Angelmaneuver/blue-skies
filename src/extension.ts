import * as vscode from 'vscode';

import { install, uninstall } from './includes';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('blue-skies.install', async () => {
      await install();
    }),
    vscode.commands.registerCommand('blue-skies.uninstall', async () => {
      await uninstall();
    })
  );
}

export function deactivate() {}
