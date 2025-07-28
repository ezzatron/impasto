# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog], and this project adheres to [Semantic
Versioning].

[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html

## Unreleased

## [v0.11.1] - 2025-07-28

[v0.11.1]: https://github.com/ezzatron/impasto/releases/tag/v0.11.1

### Fixed

- Fixed stripping of MDX annotations.

## [v0.11.0] - 2025-07-27

[v0.11.0]: https://github.com/ezzatron/impasto/releases/tag/v0.11.0

### Added

- The `splitSection` function now returns a `lines` property that combines all
  content and context lines.

## [v0.10.0] - 2025-07-25

[v0.10.0]: https://github.com/ezzatron/impasto/releases/tag/v0.10.0

### Changed

- **\[BREAKING]** The `filename` property of `LoadedCode` was renamed to
  `filePath`.

## [v0.9.1] - 2025-07-25

[v0.9.1]: https://github.com/ezzatron/impasto/releases/tag/v0.9.1

### Changed

- Added the `splitSection` function to split code into section content and
  context lines.

## [v0.9.0] - 2025-07-25

[v0.9.0]: https://github.com/ezzatron/impasto/releases/tag/v0.9.0

## Added

- Added the `splitSection` function to split code into section content and
  context lines.

## Changed

- **\[BREAKING]** Removed line number generation.
- **\[BREAKING]** Removed the instance transform.

## Added

- Added the `splitSection` function to split code into section content and
  context lines.

## Changed

- **\[BREAKING]** Removed line number generation.
- **\[BREAKING]** Removed the instance transform.

## [v0.8.0] - 2025-07-24

[v0.8.0]: https://github.com/ezzatron/impasto/releases/tag/v0.8.0

### Changed

- **\[BREAKING]** The `Transform` type now uses Impasto's own `Root` type
  instead of the `Root` type from `hast`.
- The core transform now returns a new reference to the input tree, but typed
  with Impasto's own `Root` type.

## [v0.7.0] - 2025-07-18

[v0.7.0]: https://github.com/ezzatron/impasto/releases/tag/v0.7.0

### Added

- Added the instance transform.

## [v0.6.0] - 2025-07-11

[v0.6.0]: https://github.com/ezzatron/impasto/releases/tag/v0.6.0

### Changed

- The `replace` value can now be omitted when redacting information.

## [v0.5.1] - 2025-07-11

[v0.5.1]: https://github.com/ezzatron/impasto/releases/tag/v0.5.1

### Fixed

- Fixed loader schema to allow omitting the `replace` key when redacting.

## [v0.5.0] - 2025-07-11

[v0.5.0]: https://github.com/ezzatron/impasto/releases/tag/v0.5.0

### Added

- Added redaction support to the loader.

## [v0.4.0] - 2025-07-11

[v0.4.0]: https://github.com/ezzatron/impasto/releases/tag/v0.4.0

### Added

- Added support for redacting sensitive information.

## [v0.3.1] - 2025-07-11

[v0.3.1]: https://github.com/ezzatron/impasto/releases/tag/v0.3.1

### Fixed

- Removed unused global declaration for highlighter.

## [v0.3.0] - 2025-07-11

[v0.3.0]: https://github.com/ezzatron/impasto/releases/tag/v0.3.0

### Added

- Added line numbers to the core transform.

## [v0.2.0] - 2025-07-11

[v0.2.0]: https://github.com/ezzatron/impasto/releases/tag/v0.2.0

### Added

- Added code loader.

## [v0.1.0] - 2025-07-10

[v0.1.0]: https://github.com/ezzatron/impasto/releases/tag/v0.1.0

### Added

- Initial release.
