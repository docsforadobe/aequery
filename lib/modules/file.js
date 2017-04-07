var aeq = (function (aeq) {
aeq.file = {
	toString: function() {
		return "[object aeq.file]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	pathSeparatorSymbol: aeq.isWindows ? "\\" : "/",

	getExtension: function(path) {
		var filePathStr = aeq.isFile(path) ? path.path : path;
		return filePathStr.substr(filePathStr.lastIndexOf('.'), filePathStr.length);
	},

	stripExtension: function(path) {
		var filePathStr = aeq.isFile(path) ? path.path : path;
		return filePathStr.substr(0, filePathStr.lastIndexOf('.'));
	},

	getFile: function(path) {
		var file = aeq.getFileObject(path);

		if (!file.exists)
			return null;

		return file;
	},

	getFiles: function(path, filter) {
		filter = filter || "";
		var folder = aeq.getFolder(path);
		var files = folder.getFiles("*" + filter + "*");

		if (files === null || files.length === 0)
			return null;

		return files;
	},

	getFolder: function(path) {
		var folder = aeq.getFolderObject(path);

		if (!folder.exists)
			return null;

		return folder;
	},

	ensureFolderExists: function(path) {
		var folder = aeq.getFolderObject(path);

		if (!folder.exists)
			folder.create();

		return folder;
	},

	import: function(file, folder, options) {
		var proj = app.project,
			newItem;

		file = aeq.getFile(file);
		folder = folder || proj.rootFolder;

		var iO = new ImportOptions(file);

		if (options.sequence === true)
			iO.sequence = true;

		try {
			newItem = proj.importFile(iO);
		} catch (e) {
			throw new Error( "Can't import file " + file.name);
		}

		if (newItem.duration * newItem.frameRate == 1)
			newItem.replace(file);

		newItem.parentFolder = folder;
		newItem.selected = false;

		return newItem;
	},

	importSequence: function(file, folder) {
		return aeq.import(file, folder, {sequence: true});
	},

	importFiles: function(fileArray, folder, options) {
		var importedItems = [];

		aeq.forEach(fileArray, function(file) {
			var item = aeq.import(file, folder, options);
			importedItems.push(item);
		});

		return importedItems;
	}
};

// Function aliases
aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
aeq.getFile = aeq.file.get = aeq.file.getFile;
aeq.getFiles = aeq.file.getFiles;
aeq.getFolder = aeq.file.getFolder;
aeq.importFile = aeq.import = aeq.file.import;

return aeq;
}(aeq || {}));
