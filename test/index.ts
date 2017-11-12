import test from 'ava';
import * as path from 'path';
import testUtil from './test-util';

const projectRoot = process.cwd();
const controlApp = path.join(projectRoot, 'control-app');
const shrinkpackApp = path.join(projectRoot, 'shrinkpacked-app');
const nonShrinkpackApp = path.join(projectRoot, 'non-shrinkpacked-app');
const testPackageJson = path.join(projectRoot, './test/test-package.json');

let startingNpmVersion;

test.before(async () => {
  startingNpmVersion = await testUtil.getNpmVersion();
  await testUtil.setNpmVersion(process.env.NPM_VERSION);
  await Promise.all([
    testUtil.linkShrinkpack(projectRoot),
    testUtil.createTestApp(controlApp, testPackageJson),
    testUtil.createTestApp(shrinkpackApp, testPackageJson)
  ]);
  await testUtil.npmInstall(controlApp);
  await testUtil.npmInstall(shrinkpackApp);
});

test.after.always(async () => {
  await testUtil.rmDirs(controlApp, shrinkpackApp);
  await testUtil.unlinkShrinkpack(projectRoot);
  await testUtil.setNpmVersion(startingNpmVersion);
});

test.serial('Correct npm version was installed', async (t) => {
  const actualNpmVersion = await testUtil.getNpmVersion();
  t.is(actualNpmVersion, process.env.NPM_VERSION);
});

test.serial('Running shrinkpack updates the shrinkwrap file', async (t) => {
  await testUtil.shrinkwrap(shrinkpackApp);
  const beforeShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);
  await testUtil.shrinkpack(shrinkpackApp);
  const afterShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);

  t.not(beforeShrinkpack, afterShrinkpack);
});

test.serial('All deps in shrinkpacked shrinkwrap have resolved prop and point to local file', async (t) => {
  const afterShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);
  const { dependencies } = JSON.parse(afterShrinkpack);

  const assertAllResolves = (deps) => {
    Object.keys(deps).forEach((depName) => {
      const dep = deps[depName];
      t.true(dep.resolved.indexOf('./node_shrinkwrap/') > -1);
      if (dep.dependencies) {
        assertAllResolves(dep.dependencies);
      }
    });
  };

  assertAllResolves(dependencies);
});

test.serial('Running shrinkpack does not affect installation', async (t) => {
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const shrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(shrinkpackApp, 'node_modules'));

  t.deepEqual(shrinkpackModuleTree, controlModuleTree);
});

test.serial('Reinstalling from shrinkpack produces expected output', async (t) => {
  await testUtil.rmDirs(path.join(shrinkpackApp, 'node_modules'));
  await testUtil.npmInstall(shrinkpackApp);
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const shrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(shrinkpackApp, 'node_modules'));

  t.deepEqual(shrinkpackModuleTree, controlModuleTree);
});

test.serial('Installing a non-shrinkpacked project produces expected output', async (t) => {
  await testUtil.createTestApp(nonShrinkpackApp, testPackageJson);
  await testUtil.npmInstall(nonShrinkpackApp);
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const nonShrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(nonShrinkpackApp, 'node_modules'));

  t.deepEqual(nonShrinkpackModuleTree, controlModuleTree);

  await testUtil.rmDirs(nonShrinkpackApp);
});
