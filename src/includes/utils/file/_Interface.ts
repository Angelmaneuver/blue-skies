import * as fs from 'fs';

type ReadParameter = Parameters<typeof fs.readFileSync>;

type PathOrFileDescriptor = ReadParameter[0];

type ReadOptions = ReadParameter[1];

type WriteOptions = fs.WriteFileOptions;

export { ReadParameter, PathOrFileDescriptor, ReadOptions, WriteOptions };
