export default <T>(getKey: (value: any) => string, array: T[]): { [key: string]: T } =>
  array.reduce((index: { [key: string]: T }, member: T) => {
    index[getKey(member)] = member;
    return index;
  }, {});
