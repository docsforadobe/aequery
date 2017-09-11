var aeq = ( function ( aeq ) {
/**
 * [project description]
 * @namespace aeq.project
 * @memberof aeq
 * @type {Object}
 */
aeq.project = aeq.extend({}, {
	toString: function () {
		return '[object aeq.project]';
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * Gets all footage items in project
	 * @method
	 * @memberof aeq.project
	 * @return {Item[]} ArrayEx of project footage items
	 */
	getFootage: function () {
		var items = aeq.getItems();

		return aeq.filter( items, aeq.isFootageItem );
	},

	/**
	 * Gets all folders within target folder, or root
	 * @method
	 * @memberof aeq.project
	 * @param  {FolderItem|string} [parentFolder=app.project.root] Folder to search in by name or item, or root if undefined
	 * @return {FolderItem[]}                                      ArrayEx of folder items
	 */
	getFolders: function ( parentFolder ) {
		var folders = aeq.getItems( parentFolder );

		return folders.filter( aeq.isFolderItem );
	},

	/**
	 * Find folder by name in target folder.
	 * @method
	 * @memberof aeq.project
	 * @param  {string} name                                       Folder name to find.
	 * @param  {FolderItem|string} [parentFolder=app.project.root] Folder to search in by name or item, or root if undefined.
	 * @return {FolderItem|null}                                   FolderItem with the name. Or `null` if not found.
	 */
	findFolder: function ( name, parentFolder ) {
		var folders = aeq.project.getFolders( parentFolder );

		var folder = aeq.filter( folders, function ( folder ) {
			return folder.name == name;
		});
		if ( folder.length ) {
			return folder[0];
		}
		return null;
	},

	/**
	 * Gets folder item, or null if can't find
	 * @method
	 * @memberof aeq.project
	 * @param  {FolderItem|string} folder                          Folder to get by name or item, or root if undefined
	 * @param  {FolderItem|string} [parentFolder=app.project.root] Parent folder to search in by name or item, or root if undefined
	 * @return {FolderItem|null}                                   Target folder item, or null
	 */
	getFolder: function ( folder, parentFolder ) {
		if ( aeq.isFolderItem( folder ) ) {
			return folder;
		}

		if ( aeq.isString( folder ) ) {
			return aeq.project.findFolder( folder, parentFolder );
		}

		return null;
	},

	/**
	 * Gets all folder items that are selected
	 * @method
	 * @memberof aeq.project
	 * @return {FolderItem[]} ArrayEx of all selected folder items
	 */
	getSelectedFolders: function () {
		return aeq.filter( app.project.selection, aeq.isFolderItem );
	},

	/**
	 * Gets all comp items that are selected
	 * @method
	 * @memberof aeq.project
	 * @return {CompItem[]} ArrayEx of all selected comp items
	 */
	getSelectedComps: function () {
		return aeq.filter( app.project.selection, aeq.isComp );
	},

	/**
	 * Gets all footage items that are selected
	 * @method
	 * @memberof aeq.project
	 * @return {Item[]} ArrayEx of all selected footage items
	 */
	getSelectedFootage: function () {
		return aeq.filter( app.project.selection, aeq.isFootageItem );
	},

	/**
	 * Gets folder item, or creates it if can't find
	 * @method
	 * @memberof aeq.project
	 * @param  {FolderItem|string} folder                          Folder to get by name or item, or root if undefined
	 * @param  {FolderItem|string} [parentFolder=app.project.root] Parent folder to search in by name or item, or root if undefined
	 * @return {FolderItem}                                        Target folder item
	 */
	getOrCreateFolder: function ( folder, parentFolder ) {
		if ( aeq.isNullOrUndefined( parentFolder ) ) {
parentFolder = app.project.rootFolder;
} else {
parentFolder = aeq.project.getOrCreateFolder( parentFolder );
}

		var foundFolder = aeq.project.getFolder( folder, parentFolder );

		if ( aeq.isNullOrUndefined( foundFolder ) ) {
return parentFolder.items.addFolder( folder );
}

		return foundFolder;
	},

	/**
	 * Gets folder item, or root if undefined
	 * @method
	 * @memberof aeq.project
	 * @param  {FolderItem|string} [folder=app.project.root] Folder to get by name or item, or root if undefined
	 * @return {FolderItem}                                  Target folder item
	 */
	getFolderOrRoot: function ( folder ) {
		folder = aeq.project.getFolder( folder );

		if ( aeq.isNullOrUndefined( folder ) ) {
return app.project.rootFolder;
}

		return folder;
	},

	/**
	 * Saves current AEP to target path, or prompts user if no path
	 * @method
	 * @memberof aeq.project
	 * @param  {string} [path] Path to save AEP to
	 * @return {File}          File object of AEP
	 */
	save: function ( path ) {
		if ( !path ) {
return app.project.save();
}

		var file = aeq.getFileObject( path );

		if ( file.exists ) {
if ( !confirm( 'File exists! Overwrite?' ) ) {
return null;
}
}

		return app.project.save( file );
	},

	/**
	 * Saves current AEP to current path
	 * @method
	 * @memberof aeq.project
	 * @return {File} File object of AEP
	 */
	quickSave: function () {
		var file = aeq.app.getAEP();
		return app.project.save( file );
	},

	/**
	 * Imports a file into After Effects.
	 * @method
	 * @memberof aeq.project
	 * @param  {string|File} file    The file to import.
	 * @param  {string|FolderItem} [folder=app.project]  The folder where the
	 * imported item will be placed.
	 * @param  {object} [options] options for importOptions.
	 * @param  {boolean} [options.sequence=false] `true` if file should import as sequence.
	 * @return {Item}    The imported item
	 */
	importFile: function ( file, folder, options ) {
		var proj = app.project,
			newItem;

		var newFile = aeq.getFile( file );

		if ( !aeq.isFile( newFile ) ) {
throw new Error( file + ' is not a valid file!' );
}

		if ( aeq.isNullOrUndefined( folder ) ) {
			folder = app.project.rootFolder;
		} else {
			folder = aeq.project.getOrCreateFolder( folder );
		}

		options = setDefault( options, {});

		var iO = new ImportOptions( newFile );

		if ( options.sequence === true ) {
iO.sequence = true;
}

		try {
			newItem = proj.importFile( iO );
		} catch ( e ) {
			throw new Error( 'Can\'t import file ' + newFile.name + '\n' + String( e ) );
		}

		if ( newItem.duration * newItem.frameRate == 1 ) {
newItem.replace( file );
}

		newItem.parentFolder = folder;
		newItem.selected = false;

		return newItem;
	},

	/**
	 * Like {@link aeq.project.importFile}, but without the extra.
	 * @method
	 * @memberof aeq.project
	 * @param  {File} file    File object to import
	 * @param  {object} [options] options for importOptions
	 * @param  {boolean} [options.sequence=false] `true` if file should import as sequence
	 * @return {Item}    The imported item
	 */
	simpleImportFile: function ( file, options ) {
		var iO = new ImportOptions( file );

		options = setDefault( options, {});
		if ( options.sequence === true ) {
iO.sequence = true;
}

		try {
			newItem = app.project.importFile( iO );
		} catch ( e ) {
			throw new Error( 'Can\'t import file ' + file.name + '\n' + String( e ) );
		}

		return newItem;
	},

	/**
	 * Imports a sequence by file object or path
	 * @method
	 * @memberof aeq.project
	 * @param  {File|string} file    File or path of sequence to import
	 * @param  {FolderItem} [folder] Folder to import items to
	 * @return {Item}                Imported sequence
	 */
	importSequence: function ( file, folder ) {
		return aeq.importFile( file, folder, { sequence: true });
	},

	/**
	 * Imports array of files or paths to target folder
	 * @method
	 * @memberof aeq.project
	 * @param  {File[]|string[]} fileArray        Array of files or paths to import
	 * @param  {FolderItem} [folder]              Folder to import items to
	 * @param  {object} [options]                 options for importOptions.
	 * @param  {boolean} [options.sequence=false] `true` if file should import as sequence.
	 * @return {Items[]}                          ArrayEx of imported items
	 */
	importFiles: function ( fileArray, folder, options ) {
		var importedItems = aeq.arrayEx();

		aeq.forEach( fileArray, function ( file ) {
			var item = aeq.importFile( file, folder, options );
			importedItems.push( item );
		});

		return importedItems;
	},

	/**
	 * Moves item(s) to specified folder
	 * @method
	 * @memberof aeq.project
	 * @param  {Item|Item[]} items Item or array of items
	 * @param  {FolderItem} folder Folder to move item(s) to
	 */
	moveToFolder: function ( items, folder ) {
		folder = aeq.project.getFolder( folder );

		if ( !aeq.isArray( items ) ) items = [ items ];

		aeq.forEach( items, function ( item ) {
			item.parentFolder = folder;
			item.selected = false;
		});
	},

	/**
	 * Reduces current project to only comps that are queued
	 * @method
	 * @memberof aeq.project
	 * @return {CompItem[]|null} Array of queued comps, or null
	 */
	reduceToQueuedComps: function () {
		var queuedComps = aeq.renderqueue.getQueuedComps();

		if ( queuedComps.length === 0 ) {
return null;
}

		app.project.reduceProject( queuedComps );

		return queuedComps;
	}
});

// Function aliases
aeq.save = aeq.project.save;
aeq.quickSave = aeq.project.quickSave;
aeq.importFile = aeq.project.importFile;
aeq.importFiles = aeq.project.importFiles;
aeq.importSequence = aeq.project.importSequence;

return aeq;
}( aeq || {}) );
