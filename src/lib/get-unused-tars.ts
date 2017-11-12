import * as log from './log';
import groupBy from './group-by';
import readDirectory from './read-directory';

export default async (bundlePath, packages) => {
  try {
    const bundledFiles = await readDirectory(bundlePath);
    const tarsByFilePath = groupBy('filePath')(packages);
    const isTar = filePath => filePath.search(/\.(tgz|tar)$/) !== -1;
    const isUnused = filePath => !tarsByFilePath[filePath];
    return bundledFiles.filter(isTar).filter(isUnused);
  } catch (err) {
    log.bug(`failed to determine uninstalled packages`, err);
    process.exit(1);
  }
};
