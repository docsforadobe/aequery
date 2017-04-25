var aeq = (function (aeq) {
aeq.file = {
	toString: function() {
		return "[object aeq.file]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	pathSeparatorSymbol: $.os.indexOf("Windows") ? "\\" : "/",

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
		filter = aeq.setDefault(filter, "");
		var folder = aeq.getFolder(path),
			files;

		files = folder.getFiles(filter);

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
};

// Function aliases
aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
aeq.getFile = aeq.file.get = aeq.file.getFile;
aeq.getFiles = aeq.file.getFiles;
aeq.getFolder = aeq.file.getFolder;

return aeq;
}(aeq || {}));
