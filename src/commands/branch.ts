import chalk from 'chalk';
import fuzzy from 'fuzzy';
import inquirer from 'inquirer';
import { CleanOptions, simpleGit, type SimpleGit } from 'simple-git';

import type { BranchTypes } from '../modules/Config/Config.schema.js';
import { getConfig, validateConfig } from '../modules/Config/Config.utils.js';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export const createBranch = async (
  ticketNumber: string,
  branchName: string,
  options: Record<BranchTypes, boolean | undefined>,
) => {
  const hasBranchType = Object.keys(options).length > 0;
  const branchTypeFlag = hasBranchType
    ? (Object.keys(options)[0] as BranchTypes)
    : 'feat';

  const baseConfig = getConfig();
  const config = validateConfig(baseConfig);
  const branchPrefix = `${config.project}-${ticketNumber}`;
  const branchType = hasBranchType ? `${config[branchTypeFlag]}/` : '';
  const branchFullName = `${branchType}${branchPrefix}_${branchName.replace(/\s+/g, '_')}`;

  try {
    await git.checkoutLocalBranch(branchFullName);
    console.log(
      chalk.green(`Created and checked out branch: ${branchFullName}`),
    );
  } catch (err) {
    console.error(chalk.red('Failed to create branch:'), err);
  }
};

export const checkoutBranch = async (searchTerm: string) => {
  try {
    const branches = await git.branch();
    const branchNames = branches.all;

    const fuzzyResult = fuzzy.filter(searchTerm, branchNames);
    const matches = fuzzyResult.map((result) => result.string);

    if (matches.length === 0) {
      console.log(chalk.yellow('No branches found matching that term.'));
      return;
    }

    if (matches.length === 1 && matches[0]) {
      await git.checkout(matches[0]);
      console.log(chalk.green(`Checked out branch: ${matches[0]}`));
      return;
    }

    // Multiple matches - use Inquirer to prompt the user
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'Multiple branches found, select one to checkout:',
        choices: matches,
      },
    ]);

    await git.checkout(answer.branch);
    console.log(chalk.green(`Checked out branch: ${answer.branch}`));
  } catch (err) {
    console.error(chalk.red('Failed to checkout branch:'), err);
  }
};
