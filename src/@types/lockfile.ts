export interface Lockfile {
  name: string;
  version: string;
  lockfileVersion: null | 1 | 2 | 3 | '1' | '2' | '3';
  requires: boolean;
  packages: Record<string, LockfilePackage>;
  /**
   * @deprecated ignored by npm v7+
   * @see https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json#dependencies
   */
  dependencies?: Record<string, unknown>;
}

export interface LockfilePackage {
  dependencies?: Record<string, string>;
  engines?: Record<string, string>;
  /**
   * @example "express@git+https://git@github.com/visionmedia/express.git"
   * @example "os-locale@sindresorhus/os-locale"
   */
  from?: string;
  hasInstallScript?: true;
  /**
   * @example "sha1-zg6+ql94yxiSXqfYENe1mwEP1RU="
   * @example "sha512-//88mFWSJx8lxCzwdAABTJL2MyWB12+eIY7MDL2SqLmAkeKU9qxRvWuSyTjm3FUmpBEMuFfckAIqEaVGUDxb6w=="
   */
  integrity: string;
  license: string;
  name: string;
  optional?: true;
  /**
   * @example ['darwin']
   */
  os?: string[];
  /**
   * @example "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.16.0.tgz"
   * @example "git+https://git@github.com/visionmedia/express.git#ea537d907d61dc693587fd41aab024e9df2e14b1"
   * @example "git+ssh://git@github.com/sindresorhus/os-locale.git#ee3954b99cae34956ecfc39a6e7166183587a97d"
   */
  resolved: string;
  /**
   * @example "1.2.8"
   * @example "git+https://git@github.com/visionmedia/express.git#ea537d907d61dc693587fd41aab024e9df2e14b1"
   * @example "git+ssh://git@github.com/sindresorhus/os-locale.git#ee3954b99cae34956ecfc39a6e7166183587a97d"
   */
  version: string;
}
