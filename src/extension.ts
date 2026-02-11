import * as vscode from 'vscode';

import { install, uninstall, sleep, check } from './includes';

export async function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('blue-skies.install', async () => {
      await install();
    }),
    vscode.commands.registerCommand('blue-skies.uninstall', async () => {
      await uninstall();
    }),
    vscode.workspace.onDidChangeConfiguration(async (event) => {
      if (event.affectsConfiguration('workbench.colorTheme')) {
        await sleep(100);

        await check();
      }
    })
  );

  await check();
}

export function deactivate() {}
