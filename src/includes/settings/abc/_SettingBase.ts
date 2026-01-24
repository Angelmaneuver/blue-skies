import * as vscode from 'vscode';

abstract class SettingBase {
  private readonly key;
  private readonly config: vscode.WorkspaceConfiguration;
  private readonly target: vscode.ConfigurationTarget;

  constructor(key: string, target: vscode.ConfigurationTarget) {
    this.key = key;
    this.config = vscode.workspace.getConfiguration(this.key);
    this.target = target;
  }

  public async set(key: string, value: unknown): Promise<void> {
    return this.config.update(key, value, this.target);
  }

  public get<T = unknown>(key: string): T | undefined {
    return this.config.get<T>(key);
  }

  public async remove(key: string): Promise<void> {
    return this.set(key, undefined);
  }
}

export default SettingBase;
