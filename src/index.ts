import { Command } from 'commander';

import { description, name, version } from '../package.json';

import { checkoutBranch, createBranch } from './commands/branch.js';
import { createCommit } from './commands/commit.js';

const program = new Command();

program.name(name).description(description).version(version);

// Register Branch Commands
program
  .command('b')
  .argument('<ticketNumber>', 'Ticket number')
  .argument('<branchName>', 'Branch name')
  .option('-f, --feat', 'create a feature branch')
  .option('-b, --bug', 'create a bug fix branch')
  .option('-h, --hotfix', 'create a hotfix branch')
  .option('-r, --release', 'create a release branch')
  .option('-d, --docs', 'create a docs branch')
  .description('Create a branch')
  .action(createBranch);

// Register Commit Commands
program
  .command('f <searchTerm>')
  .description('Find and checkout a branch')
  .action(checkoutBranch);

program
  .command('c')
  .description('Create a conventional commit')
  .action(createCommit);

program.parse(process.argv);
