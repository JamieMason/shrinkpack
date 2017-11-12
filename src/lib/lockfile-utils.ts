import { IPackage, IShrinkwrap, ShrinkwrapReader } from '../typings';

const isRootNode = (key: string): boolean => !key;
const isPackage = (key: string): boolean => key !== 'dependencies';
const isDependencyMap = (key: string): boolean => key === 'dependencies';

const stepInto = (parentNode: IShrinkwrap, handler: ShrinkwrapReader) => {
  for (const key in parentNode) {
    if (parentNode.hasOwnProperty(key)) {
      forEach(parentNode[key], handler, key);
    }
  }
};

const forEach = (node: any, handler: ShrinkwrapReader, key: string = '') => {
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

export const toArray = (lockfile: IShrinkwrap): IPackage[] => {
  const nodes = [];
  forEach(lockfile, (key: string, node: IShrinkwrap) =>
    nodes.push({
      key,
      node,
      tarIntegrity: ''
    })
  );
  return nodes;
};
