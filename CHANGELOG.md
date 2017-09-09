# Changelog

# 0.4.0 2017/08/04:
- Updates `aeq.file.joinPath` to accept `File` and `Folder` objects.
- Updates `aeq.pasteKey` to convert 3 value arrays to 2 value array if needed.
- Add `aeq.Property.prototype.getKeys` method to get an array of all `aeq.Key` objects on a property.
- Updates `aeq.Property.forEachKey` to use `aeq.Property.prototype.getKeys`
	- This has the benefit that doing `key.remove()` inside the loop does not cause any problems.

# 0.3.0 2017/07/27:
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

## 0.2.0 2017/06/17:
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
