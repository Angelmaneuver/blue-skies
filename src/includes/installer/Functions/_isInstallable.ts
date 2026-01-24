import * as path from 'path';

import { l10n } from 'vscode';

import { isWritable } from '../../utils/file';

import getTarget from './_getTarget';

function isInstallable(): void {
  const targets = [path.join(...getTarget())];

  let target = '';

  try {
    targets.forEach((value) => {
      target = value;

      isWritable(target);
    });
  } catch (e) {
    throw new Error(
      l10n.t(
        'You do not have the necessary write permission to run this extension. Please check the write permission for "{0}".',
        target
      )
    );
  }
}

export default isInstallable;
