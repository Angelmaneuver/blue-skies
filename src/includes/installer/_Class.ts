import File from '../utils/file';

import css from '../stylesheet/blue-skies.min.css';

class Installer {
  private static readonly extensionKey: string = 'blue-skies';
  private static readonly pattern: RegExp = new RegExp(
    '\\/\\*' +
      Installer.extensionKey +
      '-start\\*\\/[\\s\\S]*?\\/\\*' +
      Installer.extensionKey +
      '-end\\*\\/',
    'g'
  );

  constructor(private readonly destination: string) {}

  public async install(): Promise<void> {
    return this.write(this.templatization(css));
  }

  public async uninstall(): Promise<void> {
    return this.write('');
  }

  private templatization(data: string): string {
    return `/*${Installer.extensionKey}-start*/
${data}
/*${Installer.extensionKey}-end*/`;
  }

  private async write(data: string): Promise<void> {
    const file = new File(this.destination);

    file.content = this.clear(file.toString()) + data;

    file.write();
  }

  private clear(content: string): string {
    return content.replace(Installer.pattern, '');
  }
}

export default Installer;
