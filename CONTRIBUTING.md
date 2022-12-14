# Contribution

## Table of contents

- 📦 [Prerequisites](#prerequisites)
- 🚀 [Installation](#installation)
- 🤝 [Contribution requirements](#contribution-requirements)

# Prerequisites

- [Git](https://git-scm.com/) :software for distributed version control
- [Node](https://nodejs.org/) : cross-platform JavaScript runtime environment
- [Yarn](https://yarnpkg.com/) : Software packaging system

## Recommended

> Node and Yarn can be installed with Node Version Manager [nvm](https://github.com/nvm-sh/nvm) that allows you to quickly install and use different versions of node via the command line.

# Installation

## 1. Clone

```shell
git clone git@github.com:anct-cartographie-nationale/timetable-to-osm-opening-hours.git
```

## 2. Install dependencies

```shell
yarn
```

## 3. Set active Husky hooks as executable

```
husky install
chmod a+x .husky/commit-msg
chmod a+x .husky/pre-commit
```

# Contribution requirements

## Branches naming rules

- Must be up-to-date with master (rebased, linear history)
- Must be prefixed with follow the `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` or `test/` according to their content. See [Conventional Commits cheat sheet](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

## Commits rules

### Format

Must follow conventional commits specification: [Commits Conventionnels](https://www.conventionalcommits.org/fr)

### Verified

Commits must be verified: [About commit signature verification](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification)

### Continuous integration check

- All validation checks in workflow `Build` must pass without failure

# Releases

Release on NPM and Github are fully automated on merge on master with Semantic Release.

## NPM

[npm](https://www.npmjs.com/) npm is the world's largest javascript software registry.

- Organisation: [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
- Package: [@gouvfr-anct/timetable-to-osm-opening-hours](https://www.npmjs.com/package/@gouvfr-anct/timetable-to-osm-opening-hours)

## Github

[Repository](https://github.com/anct-cartographie-nationale/timetable-to-osm-opening-hours)

# Forking additional setup

## Github actions

- Repository secrets to setup :
  - `NODE_AUTH_TOKEN`: NPM access token to publish on organisation [@gouvfr-anct](https://www.npmjs.com/org/gouvfr-anct)
