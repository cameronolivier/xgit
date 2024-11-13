import * as fs from 'fs';
import * as path from 'path';

import chalk from 'chalk';
import { mergeDeepRight } from 'ramda';

import { BASE_CONFIG, CONFiG_FILE_NAME } from './Config.constants.js';
import { configSchema, type Config } from './Config.schema.js';

export const getConfig = () => {
  const configPath = path.resolve(process.cwd(), CONFiG_FILE_NAME);
  if (!fs.existsSync(configPath)) {
    console.error(chalk.red(`Config file not found at ${CONFiG_FILE_NAME}`));
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};

export const validateConfig = (config: Record<string, unknown>): Config => {
  const configWithBase = mergeDeepRight(BASE_CONFIG, config);
  const validatedConfig = configSchema.safeParse(configWithBase);
  if (!validatedConfig.success) {
    console.error(
      chalk.red('Invalid config file:'),
      validatedConfig.error.errors,
    );
    process.exit(1);
  }
  return validatedConfig.data;
};
