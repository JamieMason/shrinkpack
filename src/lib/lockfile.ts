import { join } from 'path';
import { IFragment, ILockfilePointer, IPackage, IShrinkwrap, IShrinkwrapFragment } from '../typings';
import { read } from './json';

const when = require('when');

const isRootNode = (key: string): boolean => !key;
const isPackage = (key: string): boolean => key !== 'dependencies';
const isDependencyMap = (key: string): boolean => key === 'dependencies';

const stepInto = (parentNode: any, handler: any) => {
  for (const key in parentNode) {
    if (parentNode.hasOwnProperty(key)) {
      forEach(parentNode[key], handler, key);
    }
  }
};

const forEach = (node: any, handler: any, key: string = '') => {
  if (node instanceof Object) {
    if (isRootNode(key)) {
      stepInto(node.dependencies, handler);
    } else if (isPackage(key)) {
      handler(key, node);
      stepInto(node, handler);
    } else if (isDependencyMap(key)) {
      stepInto(node, handler);
    }
  }
};

const toArray = <T, C>(lockfile: T): C[] => {
  const nodes = [];
  forEach(lockfile, (key: string, node: T) => nodes.push({ key, node }));
  return nodes;
};

export const getFragments = (lockfile: IShrinkwrapFragment): IFragment[] =>
  toArray<IShrinkwrapFragment, IFragment>(lockfile);

export const getPackages = (lockfile: IShrinkwrap): IPackage[] => toArray<IShrinkwrap, IPackage>(lockfile);

export const locate = async (projectPath: string): Promise<ILockfilePointer | null> => {
  const lockfiles = ['npm-shrinkwrap.json'];
  const getPath = (name: string) => join(projectPath, name);
  const getPointer = async (path: string) => ({ data: await read(path), location: path });
  const hasData = (pointer: ILockfilePointer) => pointer.data !== null;
  const [result = null] = (await when.all(lockfiles.map(getPath).map(getPointer))).filter(hasData);
  return result;
};
