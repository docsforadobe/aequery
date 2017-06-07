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
	 * [pathSeparatorSymbol description]
	 * @memberof aeq.file
	 * @type {boolean}
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
	 * @param  {type} parts          [description]
	 * @param  {type} allowAboveRoot [description]
	 * @return {type}                [description]
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
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	pathIsAbsolute: function(path) {
		return path.charAt(0) === aeq.file.pathSeparatorSymbol;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
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
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @return {type} [description]
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
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	getExtension: function(path) {
		var filePathStr = aeq.isFile(path) ? path.name : path;
		return filePathStr.substr(filePathStr.lastIndexOf('.') + 1, filePathStr.length);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	stripExtension: function(path) {
		var filePathStr = aeq.isFile(path) ? path.name : path;
		return filePathStr.substr(0, filePathStr.lastIndexOf('.'));
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	getFile: function(path) {
		var file = aeq.getFileObject(path);

		if (!file.exists)
			return null;

		return file;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path   [description]
	 * @param  {type} filter [description]
	 * @return {type}        [description]
	 */
	getFiles: function(path, filter) {
		filter = setDefault(filter, "");
		var folder = aeq.getFolder(path),
			files;

		files = folder.getFiles(filter);

		if (files === null || files.length === 0)
			return null;

		return aeq.arrayEx(files);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	getFolder: function(path) {
		var folder = aeq.getFolderObject(path);

		if (!folder.exists)
			return null;

		return folder;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	ensureFolderExists: function(path) {
		var folder = aeq.getFolderObject(path);

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
