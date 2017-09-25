// node modules
import path from 'path';

// modules
import testUtil from './test-util';

// implementation
const projectRoot = process.cwd();
const controlApp = path.join(projectRoot, 'control-app');
const shrinkpackApp = path.join(projectRoot, 'shrinkpacked-app');
const nonShrinkpackApp = path.join(projectRoot, 'non-shrinkpacked-app');
const testPackageJson = path.join(__dirname, 'test-package.json');

let startingNpmVersion;

beforeAll(async () => {
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

test(async () => {
  await testUtil.rmDirs(controlApp, shrinkpackApp);
  await testUtil.unlinkShrinkpack(projectRoot);
  await testUtil.setNpmVersion(startingNpmVersion);
});

test('Correct npm version was installed', async () => {
  const actualNpmVersion = await testUtil.getNpmVersion();
  expect(actualNpmVersion).toBe(process.env.NPM_VERSION);
});

test('Running shrinkpack updates the shrinkwrap file', async () => {
  await testUtil.shrinkwrap(shrinkpackApp);
  const beforeShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);
  await testUtil.shrinkpack(shrinkpackApp);
  const afterShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);

  expect(beforeShrinkpack).not.toBe(afterShrinkpack);
});

test('All deps in shrinkpacked shrinkwrap have resolved prop and point to local file', async () => {
  const afterShrinkpack = await testUtil.getShrinkwrapFile(shrinkpackApp);
  const {dependencies} = JSON.parse(afterShrinkpack);

  const assertAllResolves = deps => {
    Object.keys(deps).forEach(depName => {
      const dep = deps[depName];
      expect(dep.resolved.indexOf('./node_shrinkwrap/') > -1).toBe(true);
      if (dep.dependencies) {
        assertAllResolves(dep.dependencies);
      }
    });
  };

  assertAllResolves(dependencies);
});

test('Running shrinkpack does not affect installation', async () => {
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const shrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(shrinkpackApp, 'node_modules'));

  expect(shrinkpackModuleTree).toEqual(controlModuleTree);
});

test('Reinstalling from shrinkpack produces expected output', async () => {
  await testUtil.rmDirs(path.join(shrinkpackApp, 'node_modules'));
  await testUtil.npmInstall(shrinkpackApp);
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const shrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(shrinkpackApp, 'node_modules'));

  expect(shrinkpackModuleTree).toEqual(controlModuleTree);
});

test('Installing a non-shrinkpacked project produces expected output', async () => {
  await testUtil.createTestApp(nonShrinkpackApp, testPackageJson);
  await testUtil.npmInstall(nonShrinkpackApp);
  const controlModuleTree = await testUtil.getAllDirFiles(path.join(controlApp, 'node_modules'));
  const nonShrinkpackModuleTree = await testUtil.getAllDirFiles(path.join(nonShrinkpackApp, 'node_modules'));

  expect(nonShrinkpackModuleTree).toEqual(controlModuleTree);

  await testUtil.rmDirs(nonShrinkpackApp);
});
