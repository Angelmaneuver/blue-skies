import * as path from 'path';

import { commands } from 'vscode';

import Installer, { getTarget } from './installer';
import { WorkbenchSetting } from './settings';
import error from './_error';

async function uninstall(): Promise<void> {
  try {
    const installer = new Installer(path.join(...getTarget()));

    await installer.uninstall();

    const workbench = new WorkbenchSetting();

    await workbench.setColorTheme(undefined);

    commands.executeCommand('workbench.action.selectTheme');
  } catch (e) {
    await error(e);
  }
}

export default uninstall;
