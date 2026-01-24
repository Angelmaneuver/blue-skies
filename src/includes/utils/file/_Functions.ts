import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { FileType } from 'vscode';

import { PathOrFileDescriptor } from './_Interface';

function filename(value: PathOrFileDescriptor): string {
  return path.basename(value.toString(), path.extname(value.toString()));
}

function extname(value: PathOrFileDescriptor): string {
  return path.extname(value.toString()).replace('.', '');
}

function size(value: PathOrFileDescriptor): number | undefined {
  const target = value.toString();

  if (isFile(target)) {
    return fs.statSync(target).size;
  } else {
    return undefined;
  }
}

function normalizeNFC(paths: string): string;
function normalizeNFC(paths: Array<string>): Array<string>;
function normalizeNFC(paths: string | Array<string>): string | Array<string> {
  if (process.platform !== 'darwin') {
    return paths;
  }

  if (typeof paths === 'string') {
    return paths.normalize('NFC');
  } else {
    return paths.map((value) => value.normalize('NFC'));
  }
}

function normalize(value: PathOrFileDescriptor): string {
  return normalizes([value])[0];
}

const NORMALIZES = {
  matcher: /\$\{(.+)\}/gu,
  picker: /\$\{(?<value>.+)\}/u,
  homedir: os.homedir(),
} as const;

function normalizes(values: Array<PathOrFileDescriptor>): Array<string> {
  return values.map((value) => {
    const target = normalizeNFC(value.toString());

    const variables = target.match(NORMALIZES.matcher);

    if (variables === null) {
      return target;
    }

    return variables.reduce((prev, current) => {
      const environment = current.match(NORMALIZES.picker);

      if (environment === null || environment.groups === undefined) {
        return prev;
      } else if (environment.groups.value === 'userHome') {
        return prev.replaceAll(current, NORMALIZES.homedir);
      } else if (
        environment.groups.value in process.env &&
        typeof process.env[environment.groups.value] === 'string'
      ) {
        return prev.replaceAll(
          current,
          process.env[environment.groups.value] as string
        );
      } else {
        return prev;
      }
    }, target);
  });
}

function isFileType(value: PathOrFileDescriptor, type: FileType): boolean {
  switch (type) {
    case FileType.Unknown:
    case FileType.SymbolicLink:
      return false;
  }

  try {
    if (type === FileType.File) {
      return fs.statSync(value.toString()).isFile();
    } else {
      return fs.statSync(value.toString()).isDirectory();
    }
  } catch (e) {
    console.error(e);

    return false;
  }
}

function isFile(
  value: PathOrFileDescriptor,
  options?: { ext?: Array<string> }
): boolean {
  if (!isFileType(value, FileType.File)) {
    return false;
  }

  const _options = {
    ext: options?.ext ?? [],
  };

  return _options.ext.length === 0 || _options.ext.includes(extname(value));
}

function isDirectory(value: PathOrFileDescriptor): boolean {
  return isFileType(value, FileType.Directory);
}

function isWritable(...paths: Array<string>): void {
  fs.accessSync(path.join(...paths), fs.constants.W_OK);
}

function search(
  pattern: string,
  options: {
    filter?: { ext?: Array<string> };
  }
): Array<string> {
  const filter = { ext: options.filter?.ext ?? [] };

  return fs
    .globSync(pattern, { withFileTypes: true })
    .filter((dirent) => {
      if (!dirent.isFile()) {
        return false;
      }

      if (filter.ext.length > 0 && !filter.ext.includes(extname(dirent.name))) {
        return false;
      }

      return true;
    })
    .map((dirent) => path.join(dirent.parentPath, dirent.name));
}

export {
  filename,
  extname,
  size,
  normalizeNFC,
  normalize,
  normalizes,
  isFile,
  isDirectory,
  isWritable,
  search,
};
