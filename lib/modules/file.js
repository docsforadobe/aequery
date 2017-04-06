var aeq = (function (aeq) {
aeq.file = {
	toString: function() {
		return "[object aeq.file]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	pathSeparatorSymbol: aeq.isWindows ? "\\" : "/",

	getExtension: function(filePath) {
		var filePathStr = aeq.isFile(filePath) ? filePath.path : filePath;
		return filePathStr.substr(filePathStr.lastIndexOf('.'), filePathStr.length);
	},

	stripExtension: function(filePath) {
		var filePathStr = aeq.isFile(filePath) ? filePath.path : filePath;
		return filePathStr.substr(0, filePathStr.lastIndexOf('.'));
	},

	get: function(filePath) {
		var file = aeq.getFile(filePath);

		if (!file.exists)
			return null;

		return file;
	}
};

// Function aliases
aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;

return aeq;
}(aeq || {}));
