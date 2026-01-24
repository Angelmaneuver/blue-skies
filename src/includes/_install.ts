import * as path from 'path';

import { window, commands, l10n } from 'vscode';

import Installer, { isInstallable, getTarget } from './installer';
import { WorkbenchSetting } from './settings';
import error from './_error';

async function install(): Promise<void> {
  try {
    isInstallable();

    const yes = l10n.t('Yes');

    const response = await window.showInformationMessage(
      l10n.t(
        'The VSCode will automatically restart after installation completes. Do you want to proceed with the Blue Skies Theme installation?'
      ),
      yes,
      l10n.t('No')
    );

    if (response !== yes) {
      return;
    }

    const installer = new Installer(path.join(...getTarget()));

    await installer.install();

    const workbench = new WorkbenchSetting();

    await workbench.setColorTheme('Blue Skies');

    commands.executeCommand('workbench.action.closeWindow');
    commands.executeCommand('workbench.action.newWindow');
  } catch (e) {
    await error(e);
  }
}

export default install;
