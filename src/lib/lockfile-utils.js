const isDependencyMap = (node, key) => key === 'dependencies';
const isObject = node => Boolean(node) && node.constructor === Object;
const isPackage = (node, key) => key !== 'dependencies';
const isRootNode = (node, key) => !key;

const stepInto = (parentNode, handler, next) => {
  for (const key in parentNode) {
    next(parentNode[key], handler, key, parentNode);
  }
};

export const forEach = (node, handler, key, parentNode) => {
  if (isObject(node)) {
    if (isRootNode(node, key)) {
      stepInto(node.dependencies, handler, forEach);
    } else if (isPackage(node, key)) {
      handler(key, node, parentNode);
      stepInto(node, handler, forEach);
    } else if (isDependencyMap(node, key)) {
      stepInto(node, handler, forEach);
    }
  }
};

export const map = (lockfile, handler) => {
  const nodes = [];
  forEach(lockfile, (key, node) => {
    nodes.push(handler(key, node));
  });
  return nodes;
};

export const toArray = lockfile => map(lockfile, (key, node) => ({ key, node }));
