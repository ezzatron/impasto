---
applyTo: "**"
---

## Project overview

This project is a toolkit named Impasto for doing code syntax highlighting
within content-centric Next.js App Router apps, such as software documentation
sites and tech blogs. It's built on top of the
[`@wooorm/starry-night`](https://github.com/wooorm/starry-night) syntax
highlighting library.

This toolkit is designed to allow example code to be written in separate files,
and then highlighted and rendered in Next.js apps using primarily React Server
Components. This allows for the example code to be tested, formatted, and
verified for correctness using language-specific tooling. An example code file
can have "sections" marked via annotation comments, which can be parsed once,
and then used to produce multiple rendered code blocks in the app.

It aims for an excellent content authoring experience, so when running the
Next.js dev server, editing code example files causes live updates to the
rendered code blocks in the app. This is achieved by loading the code example
files as modules via a custom Webpack loader.

## Folder and module structure

- `src/` contains all code for the toolkit
  - `src/index.ts` is the entry point for the main `impasto` module
  - `src/lang` contains grammars for syntax highlighting, but it's just a thin
    wrapper around the grammars provided by `@wooorm/starry-night`.
  - `src/loader` contains the custom Webpack loader used to load code example
    files as modules.
  - `src/loader/index.ts` is the entry point for the Webpack loader module
    `impasto/loader`.

## Libraries used

- `@wooorm/starry-night` for syntax highlighting
- `hast` for representing the highlighted code as HTML

## Coding standards

- The code is written in TypeScript.
- The code is formatted using Prettier, with default settings.
- All code is written test-first using a red, green, refactor cycle.
- Imports do not use any `@/` aliases.
- Inside test files, never import the system under test from `src`. Only import
  from `impasto` and its submodules, so that what's being tested is also
  guaranteed to be exported.
- All exported symbols are documented with [TypeDoc](https://typedoc.org/)
  comments.

## Testing, linting, and building

Tests are written using Vitest. The project currently only tests in a Node.js
environment, but it may become necessary to use
[`@vitest/browser`](https://vitest.dev/guide/browser/) and
[`vitest-browser-react`](https://github.com/vitest-dev/vitest-browser-react) in
the future to test React integration points.

You can run the following commands:

- `npx vitest <path/to/test/file>` runs a specific Vitest test file.
- `npx eslint <path/to/file>` runs ESLint on a specific file.
- `npx prettier --write <path/to/file>` formats a specific file with Prettier.
- `make test` runs all test suites.
- `make lint` runs all linting checks and code style formatters.
- `make precommit` runs all pre-commit checks, including linting and tests.
