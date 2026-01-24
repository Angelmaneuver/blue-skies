import { env } from 'vscode';

function getAppRoot(): string {
  return env.appRoot;
}

export default getAppRoot;
