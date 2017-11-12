export type Shrinkpack = (options: { decompress: boolean; projectPath: string }) => Promise<void>;

export type Json = object | any[] | null;
export type PromiseFactory = (...args: any[]) => Promise<any>;

export interface IShrinkwrapIndex {
  [name: string]: IShrinkwrap;
}

export interface IShrinkwrap {
  dependencies: IShrinkwrapIndex;
  dev: boolean;
  integrity: string;
  requires: { [name: string]: string };
  resolved: string;
  version: string;
}

export interface IPackage {
  key: string;
  node: IShrinkwrap;
  tarIntegrity: string;
}

export type ShrinkwrapReader = (key: string, node: IShrinkwrap) => void;
