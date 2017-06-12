var aeq = (function (aeq) {
/**
 * [file description]
 * @namespace aeq.file
 * @memberof aeq
 * @type {Object}
 */
aeq.file = aeq.extend({}, {
	toString: function() {
		return "[object aeq.file]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * The value of the OS's file system path separator symbol; \ or /
	 * @memberof aeq.file
	 * @type {string}
	 */
	pathSeparatorSymbol: $.os.indexOf("Windows") > -1 ? "\\" : "/",

	// normalizePathArray, pathIsAbsolute, normalizePath, joinPath adapted from path-browserify
	// (https://github.com/substack/path-browserify/)
	//
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {string[]} parts         Array of path components
	 * @param  {boolean} allowAboveRoot [description]
	 * @return {string[]}               [description]
	 */
	normalizePathArray: function(parts, allowAboveRoot) {
		// if the path tries to go above the root, `up` ends up > 0
		var up = 0;
		for (var i = parts.length - 1; i >= 0; i--) {
			var last = parts[i];
			if (last === '.') {
				parts.splice(i, 1);
			} else if (last === '..') {
				parts.splice(i, 1);
				up++;
			} else if (up) {
				parts.splice(i, 1);
				up--;
			}
		}

		// if the path is allowed to go above the root, restore leading ..s
		if (allowAboveRoot) {
			for (; up--; up) {
				parts.unshift('..');
			}
		}

		return parts;
	},

	/**
	 * Checks whether the path starts with the OS separator symbol
	 * @method
	 * @memberof aeq.file
	 * @param  {string} path File path
	 * @return {boolean}     True if first character equals path separator symbol
	 */
	pathIsAbsolute: function(path) {
		return path.charAt(0) === aeq.file.pathSeparatorSymbol;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {string} path Raw joined file path
	 * @return {string}      Normalized path
	 */
	normalizePath: function(path) {
		var pathIsAbsolute = aeq.file.pathIsAbsolute(path),
			trailingSlash = path.substr(-1) === aeq.file.pathSeparatorSymbol;

		// Normalize the path
		path = aeq.file.normalizePathArray(aeq.filter(path.split(aeq.file.pathSeparatorSymbol), function(p) {
			return !!p;
		}), !pathIsAbsolute).join(aeq.file.pathSeparatorSymbol);

		if (!path && !pathIsAbsolute) {
			path = '.';
		}
		if (path && trailingSlash) {
			path += aeq.file.pathSeparatorSymbol;
		}

		return (pathIsAbsolute ? aeq.file.pathSeparatorSymbol : '') + path;
	},

	/**
	 * Joins path components into an OS-formatted file path string
	 * @method
	 * @memberof aeq.file
	 * @return {string} File path string joined with OS's path separator
	 */
	joinPath: function() {
		var paths = Array.prototype.slice.call(arguments, 0);
		return aeq.file.normalizePath(aeq.filter(paths, function(p, index) {
			if (typeof p !== 'string') {
				throw new TypeError('Arguments to path.join must be strings');
			}

			return p;
		}).join(aeq.file.pathSeparatorSymbol));
	},

	/**
	 * Returns the extension of target file
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {string}               Extension of target file
	 */
	getExtension: function(filePath) {
		var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
		return filePathStr.substr(filePathStr.lastIndexOf('.') + 1, filePathStr.length);
	},

	/**
	 * Returns the filename of target file without extension
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {string}               Filename without extension
	 */
	stripExtension: function(filePath) {
		var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
		return filePathStr.substr(0, filePathStr.lastIndexOf('.'));
	},

	/**
	 * Gets target file by path or file object, or null if doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {File|null}            Target file, or null if doesn't exist
	 */
	getFile: function(filePath) {
		var file = aeq.getFileObject(filePath);

		if (!file.exists)
			return null;

		return file;
	},

	/**
	 * Gets all files in target path that matches filter (or, all files if no filter)
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} folderPath      Folder or path to get
	 * @param  {string|function} [filter=""] Filter string or function
	 * @return {aeq.arrayEx|null}                 Array of filtered files, or null if none
	 */
	getFiles: function(folderPath, filter) {
		filter = setDefault(filter, "");
		var folder = aeq.getFolder(folderPath),
			files;

		files = folder.getFiles(filter);

		if (files === null || files.length === 0)
			return null;

		return aeq.arrayEx(files);
	},

	/**
	 * Returns a folder, or null if it doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} folderPath Folder path to get
	 * @return {Folder|null} Target folder, or null if it doesn't exist
	 */
	getFolder: function(folderPath) {
		var folder = aeq.getFolderObject(folderPath);

		if (!folder.exists)
			return null;

		return folder;
	},

	/**
	 * Returns a folder, creating if it doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} folderPath Folder path to get or create
	 * @return {Folder} Target folder
	 */
	ensureFolderExists: function(folderPath) {
		var folder = aeq.getFolderObject(folderPath);

		if (!folder.exists)
			folder.create();

		return folder;
	},
});

// Function aliases
aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
aeq.getFile = aeq.file.get = aeq.file.getFile;
aeq.getFiles = aeq.file.getFiles;
aeq.getFolder = aeq.file.getFolder;

return aeq;
}(aeq || {}));
