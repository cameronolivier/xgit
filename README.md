# XGIT CLI

Git Flow and Conventional commit CLI Tool.

## Overview

A couple of command tools for managing git commits and branches following a specific flow model.

## Getting Started

1. Install the package globally

```bash
npm install -g @olvrcc/xgit@latest
```

2. Create an `xgitrc.json` file in your project. You can set the following values:

```json
{
  "project": "YOUR_JIRA_PROJECT_SLUG <- this is the only required field",
  "feat": "Set the value you'd want to prefix for a 'feat' branch",
  "bug": "Set the value you'd want to prefix for a 'bug' branch",
  "hotfix": "Set the value you'd want to prefix for a 'hotfix' branch",
  "release": "Set the value you'd want to prefix for a 'release' branch",
  "docs": "Set the value you'd want to prefix a for a 'docs' branch"
}
```

## Using the CLI:

## Available Tools & Usage:

### Create Branch

It's designed to assist with creating branches that follow the git flow method along with Jira or similar
integration, given a Jira project code of `PROJ`, you can do the following:
Each branch type can be set using the following flags:

- `-f` for feature
- `-b` for bug
- `-h` for hotfix
- `-r` for release
- `-d` for docs

#### Command: 'branch' or 'b':

```shell
 $ xgit b <branch type flag> <task number> <branch name>
```

#### Examples:

```shell
 $ xgit b 123 "a unique task" // PROJ-123_a_unique_task <- not setting a flag will not prefix the branch
 $ xgit b -f 123 "a unique task" // feature/PROJ-123_a_unique_task
 $ xgit branch -h 123 "a unique task" // hotfix/PROJ-123_a_unique_task
```

### Committing work

This will help committing work following a conventional commit approach and has a small wizard that walks you through the process.

#### Command: 'commit' or 'c':

```shell
 $ xgit c
 $ xgit commit
```

### Checking out a branch via fuzzy search

You are able to checkout a branch (so long as it's local) using:

```shell
xgit f <fuzzy search>
```

#### Example:

If you had a branch `feat/JIRA-123_some_work`, you can check it out without having to type through the `feat/JIRA-`
before autocomplete would kick in. Just do this and you'll check out the branch

```shell
xgit f 123
```

If there is only a single result it will automatically check the branch out If there are multiple branches returned
the tool will pop up the list and you can select the branch you want to check out and it'll check it out for you.

## License

Include a `LICENSE` file to specify the licensing terms for your project.
