aeq = ( function ( aeq ) {
/**
 * [file description]
 * @namespace aeq.file
 * @memberof aeq
 * @type {Object}
 */
aeq.file = aeq.extend({}, {
	toString: function () {
		return '[object aeq.file]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * The value of the OS's file system path separator symbol; \ or /
	 * @memberof aeq.file
	 * @type {string}
	 */
	pathSeparatorSymbol: $.os.indexOf( 'Windows' ) > -1 ? '\\' : '/',

	// NormalizePathArray, pathIsAbsolute, normalizePath, joinPath adapted from path-browserify
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
	normalizePathArray: function ( parts, allowAboveRoot ) {
		// If the path tries to go above the root, `up` ends up > 0
		var up = 0;
		for ( var i = parts.length - 1; i >= 0; i-- ) {
			var last = parts[i];
			if ( last === '.' ) {
				parts.splice( i, 1 );
			} else if ( last === '..' ) {
				parts.splice( i, 1 );
				up++;
			} else if ( up ) {
				parts.splice( i, 1 );
				up--;
			}
		}

		// If the path is allowed to go above the root, restore leading ..s
		if ( allowAboveRoot ) {
			for ( ; up--; up ) {
				parts.unshift( '..' );
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
	pathIsAbsolute: function ( path ) {
		return path.charAt( 0 ) === aeq.file.pathSeparatorSymbol;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.file
	 * @param  {string} path Raw joined file path
	 * @return {string}      Normalized path
	 */
	normalizePath: function ( path ) {
		var pathIsAbsolute = aeq.file.pathIsAbsolute( path ),
			trailingSlash = path.substr( -1 ) === aeq.file.pathSeparatorSymbol;

		// Normalize the path
		var splitPath = path.split( aeq.file.pathSeparatorSymbol );
		var filteredPath = aeq.filter( splitPath, function ( p ) {
			return !!p;
		});
		path = aeq.file.normalizePathArray( filteredPath, !pathIsAbsolute );
		path = path.join( aeq.file.pathSeparatorSymbol );

		if ( !path && !pathIsAbsolute ) {
			path = '.';
		}
		if ( path && trailingSlash ) {
			path += aeq.file.pathSeparatorSymbol;
		}

		return ( pathIsAbsolute ? aeq.file.pathSeparatorSymbol : '' ) + path;
	},

	/**
	 * Joins path components into an OS-formatted file path string
	 * @method
	 * @memberof aeq.file
	 * @param  {...(String|File|Folder)} paths The path elements to join.
	 * @return {string} File path string joined with OS's path separator
	 */
	joinPath: function () {
		var paths = Array.prototype.slice.call( arguments, 0 );
		return aeq.file.normalizePath( aeq.filter( paths, function ( p, index ) {
			// Path is a File or Folder object.
			if ( p && typeof p.fsName === 'string' ) {
				p = p.fsName;
				paths[index] = p;
			}
			if ( typeof p !== 'string' ) {
				throw new TypeError( 'Arguments to path.join must be strings, Files or Folders' );
			}

			return p;
		}).join( aeq.file.pathSeparatorSymbol ) );
	},

	/**
	 * Returns the extension of target file
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {string}               Extension of target file
	 */
	getExtension: function ( filePath ) {
		var filePathStr = aeq.isFile( filePath ) ? filePath.name : filePath;
		return filePathStr.substr( filePathStr.lastIndexOf( '.' ) + 1, filePathStr.length );
	},

	/**
	 * Returns the filename of target file without extension
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {string}               Filename without extension
	 */
	stripExtension: function ( filePath ) {
		var filePathStr = aeq.isFile( filePath ) ? filePath.name : filePath;
		return filePathStr.substr( 0, filePathStr.lastIndexOf( '.' ) );
	},

	/**
	 * Takes a file path or a file object, and returns a file object
	 * allows functions to be flexible in whether they take a path vs file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {File}                 Resolved file object
	 */
	getFileObject: function ( filePath ) {
		return aeq.isFile( filePath ) ? filePath : new File( filePath );
	},

	/**
	 * Gets target file by path or file object, or null if doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {File|null}            Target file, or null if doesn't exist
	 */
	getFile: function ( filePath ) {
		var file = aeq.getFileObject( filePath );

		if ( !file.exists ) return null;

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
	getFiles: function ( folderPath, filter ) {
		filter = setDefault( filter, '' );
		var folder = aeq.getFolder( folderPath ),
			files;

		files = folder.getFiles( filter );

		if ( files === null || files.length === 0 ) return null;

		return aeq.arrayEx( files );
	},

	/**
	 * Recursively scan folder for all files matching filter
	 * @method
	 * @memberof aeq.file
	 * @param {Folder|String}   folder      Folder or path to get files from
	 * @param {string|function} [filter=""] Filter string or function
	 * @returns {File[]}                    Array of found files
	 */
	getFilesRecursive: function ( folder, filter ) {
		var foundItems = aeq.arrayEx();

		var folderObject = aeq.file.getFolder( folder );
		if ( aeq.isNullOrUndefined( folderObject ) ) {
			return foundItems;
		}

		// Find all folders within folderObject and
		// recursively append anything it finds to foundItems
		var folderFiles = aeq.file.getFiles( folderObject );

		if ( aeq.isNullOrUndefined( folderFiles ) ) {
			return foundItems;
		}

		folderFiles.filter( function ( item ) {
			return aeq.isFolder( item );
		}).forEach( function ( folderItem ) {
			foundItems = foundItems.concat( aeq.file.getFilesRecursive( folderItem, filter ) );
		});

		var filesInFolder = aeq.file.getFiles( folderObject, filter );
		if ( !aeq.isNullOrUndefined( filesInFolder ) ) {
			foundItems = foundItems.concat( filesInFolder );
		}

		return aeq.arrayEx( foundItems );
	},

	/**
	 * Takes a folder path or a folder object, and returns a folder object
	 * allows functions to be flexible in whether they take a path vs folder
	 * @method
	 * @memberof aeq
	 * @param  {Folder|string} folderPath String path to a folder, or folder object
	 * @return {Folder}                   Resolved folder object
	 */
	getFolderObject: function ( folderPath ) {
		return aeq.isFolder( folderPath ) ? folderPath : new Folder( folderPath );
	},

	/**
	 * Returns a folder, or null if it doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} folderPath Folder path to get
	 * @return {Folder|null} Target folder, or null if it doesn't exist
	 */
	getFolder: function ( folderPath ) {
		var folder = aeq.getFolderObject( folderPath );

		if ( !folder.exists ) return null;

		return folder;
	},

	/**
	 * Returns a folder, creating if it doesn't exist
	 * @method
	 * @memberof aeq.file
	 * @param  {File|string} folderPath Folder path to get or create
	 * @return {Folder} Target folder
	 */
	ensureFolderExists: function ( folderPath ) {
		var folder = aeq.getFolderObject( folderPath );

		if ( !folder.exists ) folder.create();

		return folder;
	},

	/**
	 * Returns the contents of a specified file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath    Path or file to read
	 * @param  {string} [encoding=UTF-8] Encoding method
	 * @return {string|null}             Contents of the file, or null if file doesn't exist
	 */
	readFile: function ( filePath, encoding ) {
		var file = aeq.getFileObject( filePath ),
			contents;

		encoding = setDefault( encoding, 'UTF-8' );

		if ( file.exists ) {
			if ( File.isEncodingAvailable( encoding ) ) {
				file.encoding = encoding;
			}

			file.open();
			contents = file.read();
			file.close();
			return contents;
		}
		return null;
	},

	/**
	 * Writes data to a file, returns file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath              Path or file to write to
	 * @param  {string}  contents                  Data to write to the file
	 * @param  {object} [options]                  Options for writing file.
	 * @param  {boolean} [options.overwrite=false] `true` if file should be overwritten if exists.
	 * @param  {string} [options.encoding="UTF-8"] Encoding method.
	 * @return {File|null}                         New file, or null if file was not written
	 *                                             correctly or file exits and overwrite = false
	 */
	writeFile: function ( filePath, contents, options ) {
		var file = aeq.getFileObject( filePath );
		options = aeq.setDefault( options, {});

		if ( file.exists && options.overwrite === false ) {
			return null;
		}

		if ( !file.exists ) {
			aeq.file.ensureFolderExists( file.path );
		}

		if ( !aeq.isNullOrUndefined( options.encoding ) &&
				File.isEncodingAvailable( options.encoding ) ) {
			file.encoding = options.encoding;
		}

		file.open( 'w' );
		var success = file.write( contents );
		file.close();

		if ( success ) return file;

		return null;
	},

	/**
	 * Prompts user to select files
	 * @method
	 * @memberof aeq.file
	 * @param  {string[]} extensionList      Array of file extensions to accept
	 * @param  {boolean} [multiSelect=false] `true` to allow multiple files
	 * @return {file[]|null}                 ArrayEx of selected file(s), or null if canceled
	 *
	 * @example
	 * var myFiles = selectFiles(["jsx", "theme", "someOtherExtension"], true);
	 */
	selectFiles: function ( extensionList, multiSelect ) {
		multiSelect = aeq.setDefault( multiSelect, false );
		var message = multiSelect ? 'Please select multiple files' : 'Please select file';

		if ( !aeq.isArray( extensionList ) ) {
			extensionList = [ extensionList ];
		}

		var getFilterForFiles = function () {
			if ( aeq.isWin ) {
				return '*.' + extensionList.join( ';*.' );
			}

			var extensionListRe = '.(' + extensionList.join( '|' ) + ')$';
			var re = new RegExp( extensionListRe, 'i' );

			return function ( file ) {
				return file.name.match( re ) || file.constructor.name === 'Folder';
			};
		};

		var files = File.openDialog( message, getFilterForFiles(), multiSelect );

		if ( aeq.isNullOrUndefined( files ) ) {
			return null;
		}

		if ( !aeq.isArray( files ) ) {
			files = [ files ];
		}

		return aeq.arrayEx( files );
	}
});

// Function aliases
aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
aeq.getFileObject = aeq.file.getFileObject;
aeq.getFolderObject = aeq.file.getFolderObject;
aeq.getFile = aeq.file.get = aeq.file.getFile;
aeq.getFiles = aeq.file.getFiles;
aeq.getFilesRecursive = aeq.file.getFilesRecursive;
aeq.getFolder = aeq.file.getFolder;
aeq.readFile = aeq.file.readFile;
aeq.writeFile = aeq.file.writeFile;
aeq.selectFiles = aeq.file.selectFiles;

return aeq;
}( aeq || {}) );
