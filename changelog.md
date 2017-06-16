0.2.0 (Current):
	- Adds aeq.version to track current version of aequery
	- Adds aeq.settings.initSetting() to initialize settings
	- Adds aeq.ui.Container.removeChildren() to remove container children
	- aeq.file.writeFile() now takes an options object to define `encoding` and `overwrite` values
	- aeq.file.writeFile() now allows overwriting based on options parameter
	- aeq.settings.getAsBool() now checks that value is bool before returning, else returns undefined
0.1.1 - 2017/06/13
	- Clarifies readme
	- aeq-ui now concats onto main aequery on build
0.1.0 - 2017/06/13
	- Initial npm version