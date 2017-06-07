var aeq = (function (aeq) {
/**
 * [project description]
 * @namespace aeq.project
 * @memberof aeq
 * @type {Object}
 */
aeq.project = {
	toString: function() {
		return "[object aeq.project]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	getFootage: function(){
		var items = aeq.getItems();

		return aeq.filter(items, function(item){
			return aeq.isFootageItem(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} parentFolder [description]
	 * @return {type}              [description]
	 */
	getFolders: function(parentFolder){
		var folders = aeq.getItems(parentFolder);

		return folders.filter(function(item){
			return aeq.isFolderItem(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} name         [description]
	 * @param  {type} parentFolder [description]
	 * @return {type}              [description]
	 */
	findFolder: function(name, parentFolder){
		var folders = aeq.project.getFolders(parentFolder);

		var folder = aeq.filter(folders, function(folder) {
			return folder.name == name;
		});

		return folder[0];
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} folder       [description]
	 * @param  {type} parentFolder [description]
	 * @return {type}              [description]
	 */
	getFolder: function(folder, parentFolder){
		if (aeq.isFolderItem(folder))
			return folder;

		if (aeq.isString(folder))
			return aeq.project.findFolder(folder, parentFolder);

		return null;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	getSelectedFolders: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isFolderItem(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	getSelectedComps: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isComp(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	getSelectedFootage: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isFootageItem(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} folder       [description]
	 * @param  {type} parentFolder [description]
	 * @return {type}              [description]
	 */
	getOrCreateFolder : function(folder, parentFolder){
		if (aeq.isNullOrUndefined(parentFolder))
			parentFolder = app.project.rootFolder;
		else
			parentFolder = aeq.project.getOrCreateFolder(parentFolder)

		var foundFolder = aeq.project.getFolder(folder, parentFolder);

		if (aeq.isNullOrUndefined(foundFolder))
			return parentFolder.items.addFolder(folder);

		return foundFolder;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} folder [description]
	 * @return {type}        [description]
	 */
	getFolderOrRoot : function (folder) {
		folder = aeq.project.getFolder(folder);

		if (aeq.isNullOrUndefined(folder))
			return app.project.rootFolder;

		return folder;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} path [description]
	 * @return {type}      [description]
	 */
	save: function(path) {
		if (!path)
			return app.project.save();

		var file = aeq.getFileObject(path);

		if (file.exists)
			if (!confirm("File exists! Overwrite?"))
				return null;

		return app.project.save(file);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	quickSave: function() {
		var file = aeq.app.getAEP();
		return app.project.save(file);
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
	importFile: function(file, folder, options) {
		var proj = app.project,
			newItem;

		var newFile = aeq.getFile(file);

		if (!aeq.isFile(newFile))
			throw new Error( file + " is not a valid file!" );

		if ( aeq.isNullOrUndefined( folder ) ) {
			folder = app.project.rootFolder
		} else {
			folder = aeq.project.getOrCreateFolder( folder );
		}

		options = setDefault(options, {});

		var iO = new ImportOptions(newFile);

		if (options.sequence === true)
			iO.sequence = true;

		try {
			newItem = proj.importFile(iO);
		} catch (e) {
			throw new Error( "Can't import file " + newFile.name + "\n" + String(e) );
		}

		if (newItem.duration * newItem.frameRate == 1)
			newItem.replace(file);

		newItem.parentFolder = folder;
		newItem.selected = false;

		return newItem;
	},

	/**
	 * Like {@link aeq.project.importFile}, but without the extra.
	 * @method
	 * @param  {File} file    File object to import
	 * @param  {object} [options] options for importOptions
	 * @param  {boolean} [options.sequence=false] `true` if file should import as sequence
	 * @return {Item}    The imported item
	 */
	simpleImportFile: function ( file, options ) {
		var iO = new ImportOptions( options )

		options = setDefault(options, {});
		if (options.sequence === true)
			iO.sequence = true;

		try {
			newItem = proj.importFile(iO);
		} catch (e) {
			throw new Error( "Can't import file " + newFile.name + "\n" + String(e) );
		}

		return newItem
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} file   [description]
	 * @param  {type} folder [description]
	 * @return {type}        [description]
	 */
	importSequence: function(file, folder) {
		return aeq.importFile(file, folder, {sequence: true});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} fileArray [description]
	 * @param  {type} folder    [description]
	 * @param  {type} options   [description]
	 * @return {type}           [description]
	 */
	importFiles: function(fileArray, folder, options) {
		var importedItems = aeq.arrayEx();

		aeq.forEach(fileArray, function(file) {
			var item = aeq.importFile(file, folder, options);
			importedItems.push(item);
		});

		return importedItems;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @param  {type} items  [description]
	 * @param  {type} folder [description]
	 * @return {type}        [description]
	 */
	moveToFolder: function(items, folder) {
		folder = aeq.project.getFolder(folder);

		if (!aeq.isArray(items)) items = [items];

		aeq.forEach(items, function (item) {
			item.parentFolder = folder;
			item.selected = false;
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.project
	 * @return {type} [description]
	 */
	reduceToQueuedComps: function() {
		var queuedComps = aeq.renderqueue.getQueuedComps();
		if (queuedComps.length === 0) return null;
		app.project.reduceProject(queuedComps);
	}
};

// Function aliases
aeq.save = aeq.project.save;
aeq.quickSave = aeq.project.quickSave;
aeq.importFile = aeq.project.importFile;
aeq.importFiles = aeq.project.importFiles;
aeq.importSequence = aeq.project.importSequence;

return aeq;
}(aeq || {}));
