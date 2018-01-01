import { IFragment, IPackage } from '../typings';
import { spawn } from './io';
import { getFragments } from './lockfile';

export const getFragment = async (pkg: IPackage): Promise<IFragment> => {
  const stdout = await spawn('npm', ['ls', '--json', pkg.key]);
  const isSamePackage = (other: IFragment) => other.key === pkg.key;
  const isSameVersion = (other: IFragment) => other.node.resolved === pkg.node.version;
  const fragment: IFragment = getFragments(JSON.parse(stdout))
    .filter(isSamePackage)
    .filter(isSameVersion)[0];
  return fragment;
};
