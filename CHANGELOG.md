# Changelog

# 0.3.0 2017/08/27:
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
