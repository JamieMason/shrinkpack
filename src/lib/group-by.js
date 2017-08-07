export default (getKey, array) =>
  array.reduce((index, member) => {
    index[getKey(member)] = member;
    return index;
  }, {});
