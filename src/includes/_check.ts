import * as path from 'path';

import { window, l10n } from 'vscode';

import Installer, { isInstallable, getTarget } from './installer';
import { WorkbenchSetting } from './settings';
import error from './_error';

async function check(): Promise<void> {
  const workbench = new WorkbenchSetting();

  if (workbench.colorThemeName !== 'Blue Skies') {
    return;
  }

  try {
    isInstallable();

    const installer = new Installer(path.join(...getTarget()));

    if (installer.isInstalled) {
      return;
    }

    await workbench.setColorTheme(undefined);

    window.showWarningMessage(
      l10n.t(
        'The Blue Skies Theme cannot be used unless you run the installation command.'
      )
    );
  } catch (e) {
    await error(e);
  }
}

export default check;
