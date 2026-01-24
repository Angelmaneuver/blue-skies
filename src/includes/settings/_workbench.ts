import { ConfigurationTarget } from 'vscode';

import { SettingBase } from './abc';

class WorkbenchSetting extends SettingBase {
  constructor() {
    super('workbench', ConfigurationTarget.Global);
  }

  public async setColorTheme(name?: string): Promise<void> {
    return this.set('colorTheme', name);
  }
}

export default WorkbenchSetting;
