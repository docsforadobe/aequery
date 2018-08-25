# Changelog

## 0.6.0 - 2018/08/26

- Adds `aeq.project.getSelectedCompsOrAll`
- Adds `ArrayEx.findIndex`
- Adds `aeq.ui.ListBox`
- Adds `aeq.ui.TreeView`
- Adds `getChildren()` to `aeq.ui.Container`
- Adds `selectFiles()` to `aeq.file`
- Adds `getFilesRecursive()` to `aeq.file`
- Renames `aeq.Key.getKeyinfo` to `aeq.Key.getKeyInfo`
- Renames `setLayerToggles` to `copyLayerToggles`
- Removes docs from repo, adds to gitignore
- Changes `selectedKeys` to return arrayEx
- Fixes `selectedKeys` returning wrong keys
- Fixes `aeq.extend` not checking for `hasOwnProperty`

## 0.5.0 - 2018/04/08

- Added style- and code-linting to the project source code
- Fixes `getEffects` returning an empty array if one of the passed layers could not have effects.
- Renames `arrayEx` method names:
  - `exists` -> `some`
  - `select` -> `map`
  - `map` -> `groupBy`
- Adds `isMaskPropertyGroup` function
- Adds `offset` parameter to `Key.copyTo` which Adds/subtracts an amount of offset in keyframe time.
- Adds `parentFolder` parameter to `project.getFootage` that only get footage items from the given `FolderItem`

## 0.4.0 - 2017/08/04

- Updates `aeq.file.joinPath` to accept `File` and `Folder` objects.
- Updates `aeq.pasteKey` to convert 3 value arrays to 2 value array if needed.
- Add `aeq.Property.prototype.getKeys` method to get an array of all `aeq.Key` objects on a property.
- Updates `aeq.Property.forEachKey` to use `aeq.Property.prototype.getKeys`
  - This has the benefit that doing `key.remove()` inside the loop does not cause any problems.

## 0.3.0 - 2017/07/27

- Updates some functions under `aeq.layer` to return `aeq.arrayEx` instead of an array.
  - `aeq.layer.children`
  - `aeq.layer.allChildren`
  - `aeq.layer.parents`
  - `aeq.layer.relatedLayers`
- Fixes `aeq.writeFile` not checking encoding properly.
- Updates `aeq.project.findFolder` to return `null` when no folder is found.
- Updates `aeq.getItems` to accept a `deep` argument.
- Adds `aeq.getItemsDeep`
- Updates `aeq.getCompositions` to get CompItems from a given folder.

## 0.2.0 2017/06/17

- Adds `aeq.version` to track current version of aequery
- Adds `aeq.settings.initSetting()` to initialize settings
- Adds `aeq.ui.Container.removeChildren()` to remove container children
- `aeq.file.writeFile()` now takes an options object to define `encoding` and `overwrite` values
- `aeq.file.writeFile()` now allows overwriting based on options parameter
- `aeq.settings.getAsBool()` now checks that value is bool before returning, else returns undefined

## 0.1.1 - 2017/06/13

- Clarifies readme
- aeq-ui now concats onto main aequery on build

## 0.1.0 - 2017/06/13

- Initial npm version
