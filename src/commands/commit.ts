import chalk from 'chalk';
import inquirer from 'inquirer';
import { CleanOptions, simpleGit, type SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export const createCommit = async () => {
  try {
    // Step 1: Ask for commit type
    const { commitType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'commitType',
        message: 'What type of commit is this?',
        choices: [
          { name: 'feat: A new feature', value: 'feat' },
          { name: 'fix: A bug fix', value: 'fix' },
          { name: 'docs: Documentation changes', value: 'docs' },
          {
            name: 'refactor: Changes that neither fixes a bug nor adds a feature',
            value: 'refactor',
          },
          { name: 'test: A new unit test', value: 'test' },
          {
            name: "chore: Other changes that don't modify source or test files",
            value: 'chore',
          },
          { name: 'perf: Performance improvements', value: 'perf' },
          {
            name: 'build: Changes that affect the build system or external dependencies',
            value: 'build',
          },
          {
            name: 'ci: Changes to CI configuration files and scripts',
            value: 'ci',
          },
        ],
      },
    ]);

    // Step 2: Optional affected module
    const { affectedModule } = await inquirer.prompt([
      {
        type: 'input',
        name: 'affectedModule',
        message: 'Enter the affected module/feature (optional):',
        default: '',
      },
    ]);

    // Step 3: Select files to commit
    const status = await git.status();
    const { filesToAdd } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'filesToAdd',
        message: 'Select the files to commit:',
        choices: [
          { name: 'all', value: '.', checked: true },
          ...status.modified.map((file) => ({ name: file, value: file })),
        ],
      },
    ]);

    // Step 4: Add selected files
    if (filesToAdd.includes('.')) {
      await git.add('.');
    } else if (filesToAdd.length > 0) {
      await git.add(filesToAdd);
    } else {
      console.log(chalk.yellow('No files selected for commit.'));
      return;
    }

    // Step 5: Describe the work done
    const { commitMessage } = await inquirer.prompt([
      {
        type: 'input',
        name: 'commitMessage',
        message: 'Describe the work done:',
      },
    ]);

    // Step 6: Create the commit
    const fullCommitMessage = affectedModule
      ? `${commitType}(${affectedModule}): ${commitMessage}`
      : `${commitType}: ${commitMessage}`;
    await git.commit(fullCommitMessage);
    console.log(chalk.green(`Committed with message: "${fullCommitMessage}"`));
  } catch (err) {
    console.error(chalk.red('Failed to create commit:'), err);
  }
};
