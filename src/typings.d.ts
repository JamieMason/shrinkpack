export type Shrinkpack = (options: { decompress: boolean; projectPath: string }) => Promise<void>;

export type Json = object | any[] | null;

export interface IShrinkwrapIndex {
  [name: string]: IShrinkwrap;
}

export interface IExeca {
  cmd: string;
  code: number;
  killed: boolean;
  message: string;
  signal: null;
  stderr: string;
  stdout: string;
  timedOut: boolean;
}

export interface IShrinkwrap {
  bundled: boolean;
  dependencies: IShrinkwrapIndex;
  dev: boolean;
  integrity: string;
  optional: boolean;
  requires: { [name: string]: string };
  resolved: string;
  version: string;
}

export interface IPackage {
  key: string;
  node: IShrinkwrap;
}

export interface ILockfilePointer {
  data: IShrinkwrap;
  location: string;
}

export type ShrinkwrapReader = (key: string, node: IShrinkwrap) => void;
