import * as fs from 'fs';
import * as path from 'path';

import {
  ReadParameter,
  PathOrFileDescriptor,
  ReadOptions,
  WriteOptions,
} from './_Interface';

class File {
  private path: PathOrFileDescriptor;
  private options?: ReadOptions;
  public content: ReturnType<typeof fs.readFileSync>;

  constructor(...args: ReadParameter) {
    [this.path, this.options] = args;

    this.content = fs.readFileSync(this.path, this.options);
  }

  get isPresent(): boolean {
    return this.content.length > 0;
  }

  public write(options?: WriteOptions): void {
    fs.writeFileSync(path.resolve(this.path.toString()), this.content, options);
  }

  public toString(): string {
    return this.content.toString();
  }

  public toBase64(): string {
    const buffer = () => {
      if (typeof this.content === 'string') {
        return Buffer.from(this.content);
      } else {
        return Buffer.from(this.content.buffer);
      }
    };

    return buffer().toString('base64');
  }
}

export default File;
