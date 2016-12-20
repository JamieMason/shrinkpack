// public
module.exports = forEachNestedDependency;

// implementation
function forEachNestedDependency(node, handler, key, parentNode) {
  if (isObject(node)) {
    if (isRootNode(node, key)) {
      stepInto(node.dependencies, handler);
    } else if (isPackage(node, key)) {
      handler(key, node, parentNode);
      stepInto(node, handler);
    } else if (isDependencyMap(node, key)) {
      stepInto(node, handler);
    }
  }
}

function isRootNode(node, key) {
  return !key;
}

function isPackage(node, key) {
  return key !== 'dependencies';
}

function isDependencyMap(node, key) {
  return key === 'dependencies';
}

function stepInto(parentNode, handler) {
  for (var key in parentNode) { // eslint-disable-line guard-for-in
    forEachNestedDependency(parentNode[key], handler, key, parentNode);
  }
}

function isObject(node) {
  return Boolean(node) && (node.constructor === Object);
}
