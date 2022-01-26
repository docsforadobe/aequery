# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)

---

## [Unreleased]

### Added

- New types
  - `isSolidLayer`
  - `isAdjustmentLayer`
  - `isGuideLayer`
  - `isNullLayer`

### Changed

-

### Fixed

- Documentation for `isAeq`
- Gulp not concatenating files properly

---

## [v0.7.0] - 2022/01/11

### Changed

- Changes `aeq.filter` to return arrayEx
- `AEQKey TemporalEase` and `AEQKey InterpolationType` defs to match types-for-adobe

### Fixed

- `getFilesRecursive()` breaking on empty folders
- Return type for `getFootage()`
- `aeq.Key.spatialTangent` erroring when processing non-spatial properties
- `Property.nearestKeyIndex` no longer returns a key, instead returning index as expected

---

## [v0.6.0] - 2018/08/26

### Added

- Adds `aeq.project.getSelectedCompsOrAll`
- Adds `ArrayEx.findIndex`
- Adds `aeq.ui.ListBox`
- Adds `aeq.ui.TreeView`
- Adds `getChildren()` to `aeq.ui.Container`
- Adds `selectFiles()` to `aeq.file`
- Adds `getFilesRecursive()` to `aeq.file`

### Changed

- Renames `aeq.Key.getKeyinfo` to `aeq.Key.getKeyInfo`
- Renames `setLayerToggles` to `copyLayerToggles`
- Removes docs from repo, adds to gitignore
- Changes `selectedKeys` to return arrayEx

### Fixed

- Fixes `selectedKeys` returning wrong keys
- Fixes `aeq.extend` not checking for `hasOwnProperty`

---

## [v0.5.0] - 2018/04/08

### Added

- Added style- and code-linting to the project source code
- Adds `isMaskPropertyGroup` function
- Adds `offset` parameter to `Key.copyTo` which Adds/subtracts an amount of offset in keyframe time.
- Adds `parentFolder` parameter to `project.getFootage` that only get footage items from the given `FolderItem`

### Changed

- Renames `arrayEx` method names:
  - `exists` -> `some`
  - `select` -> `map`
  - `map` -> `groupBy`

### Fixed

- Fixes `getEffects` returning an empty array if one of the passed layers could not have effects.

---

## [v0.4.0] - 2017/08/04

### Added

- Add `aeq.Property.prototype.getKeys` method to get an array of all `aeq.Key` objects on a property.

### Changed

- Updates `aeq.file.joinPath` to accept `File` and `Folder` objects.
- Updates `aeq.pasteKey` to convert 3 value arrays to 2 value array if needed.
- Updates `aeq.Property.forEachKey` to use `aeq.Property.prototype.getKeys`
  - This has the benefit that doing `key.remove()` inside the loop does not cause any problems.

---

## [v0.3.0] - 2017/07/27

### Added

- Adds `aeq.getItemsDeep`

### Changed

- Updates some functions under `aeq.layer` to return `aeq.arrayEx` instead of an array.
  - `aeq.layer.children`
  - `aeq.layer.allChildren`
  - `aeq.layer.parents`
  - `aeq.layer.relatedLayers`
- Updates `aeq.project.findFolder` to return `null` when no folder is found.
- Updates `aeq.getItems` to accept a `deep` argument.
- Updates `aeq.getCompositions` to get CompItems from a given folder.

### Fixed

- Fixes `aeq.writeFile` not checking encoding properly.

---

## [v0.2.1] - 2017/06/17

### Changed

- Update changelog, contributors docs

---

## [v0.2.0] 2017/06/17

### Added

- Adds `aeq.version` to track current version of aequery
- Adds `aeq.settings.initSetting()` to initialize settings
- Adds `aeq.ui.Container.removeChildren()` to remove container children

### Changed

- `aeq.file.writeFile()` now takes an options object to define `encoding` and `overwrite` values
- `aeq.file.writeFile()` now allows overwriting based on options parameter
- `aeq.settings.getAsBool()` now checks that value is bool before returning, else returns undefined

---

## [v0.1.2] - 2017/06/14

### Added

- Add aeq.version and keep it in sync with package

### Changed

- Update docs

---

## [v0.1.1] - 2017/06/13

### Changed

- Clarifies readme
- aeq-ui now concats onto main aequery on build

---

## [v0.1.0] - 2017/06/13

- Initial npm version

[Unreleased]: https://github.com/aenhancers/aequery/compare/master...develop
[v0.7.0]: https://github.com/aenhancers/aequery/compare/v0.6.0...v0.7.0
[v0.6.0]: https://github.com/aenhancers/aequery/compare/v0.5.0...v0.6.0
[v0.5.0]: https://github.com/aenhancers/aequery/compare/v0.4.0...v0.5.0
[v0.4.0]: https://github.com/aenhancers/aequery/compare/v0.3.0...v0.4.0
[v0.3.0]: https://github.com/aenhancers/aequery/compare/v0.2.1...v0.3.0
[v0.2.1]: https://github.com/aenhancers/aequery/compare/v0.2.0...v0.2.1
[v0.2.0]: https://github.com/aenhancers/aequery/compare/v0.1.2...v0.2.0
[v0.1.2]: https://github.com/aenhancers/aequery/compare/v0.1.1...v0.1.2
[v0.1.1]: https://github.com/aenhancers/aequery/compare/v0.1.0...v0.1.1
[v0.1.0]: https://github.com/aenhancers/aequery/compare/5d74d49...v0.1.0
