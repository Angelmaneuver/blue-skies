import { window, l10n } from 'vscode';

async function error(e: unknown): Promise<void> {
  window.showErrorMessage(
    e instanceof Error
      ? e.message
      : l10n.t('An unexcepected error has occured.')
  );

  console.log(e);
}

export default error;
