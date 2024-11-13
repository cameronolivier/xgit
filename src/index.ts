import chalk from 'chalk';
import { Command } from 'commander';
import inquirer from 'inquirer';

import { description, name, version } from '../package.json';

import { initBranchCommand, initCommitCommand } from './commands/branch.js';

const program = new Command();

program.name(name).description(description).version(version);

// Register Branch Commands
program
  .command('branch')
  .description('Create a branch')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'branchName',
          message: 'Enter branch name:',
        },
      ])
      .then((answers) => {
        console.log(chalk.green(`Creating branch: ${answers.branchName}`));
        initBranchCommand(answers.branchName);
      });
  });

// Register Commit Commands
program
  .command('commit')
  .description('Create a commit with a proper convention')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'commitMessage',
          message: 'Enter commit message:',
        },
      ])
      .then((answers) => {
        console.log(
          chalk.blue(`Committing with message: ${answers.commitMessage}`),
        );
        initCommitCommand(answers.commitMessage);
      });
  });

program.parse(process.argv);
