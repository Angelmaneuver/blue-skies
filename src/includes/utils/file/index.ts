import File from './_Class';
import {
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
} from './_Functions';

import type {
  ReadParameter,
  PathOrFileDescriptor,
  ReadOptions,
  WriteOptions,
} from './_Interface';

export default File;

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

export type { ReadParameter, PathOrFileDescriptor, ReadOptions, WriteOptions };
