import type { Config } from './Config.schema.js';

export const CONFiG_FILE_NAME = 'xgitrc.json';

export const BASE_CONFIG: Omit<Config, 'project'> = {
  feat: 'feat',
  bug: 'bug',
  hotfix: 'hotfix',
  release: 'release',
  docs: 'docs',
};
