import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';

export const getConfig = () => {
  const configPath = path.resolve(process.cwd(), 'xgit-config.json');
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red('Config file not found at xgit-config.json'));
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};
