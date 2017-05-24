var aeq = (function (aeq) {
aeq.project = {
	toString: function() {
		return "[object aeq.project]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	getFootage: function(){
		var items = aeq.getItems();

		return aeq.filter(items, function(item){
			return aeq.isFootageItem(item);
		});
	},

	getFolders: function(parentFolder){
		var folders = aeq.getItems(parentFolder);

		return folders.filter(function(item){
			return aeq.isFolderItem(item);
		});
	},

	findFolder: function(name, parentFolder){
		var folders = aeq.project.getFolders(parentFolder);

		var folder = aeq.filter(folders, function(folder) {
			return folder.name == name;
		});

		return folder[0];
	},

	getFolder: function(folder, parentFolder){
		if (aeq.isFolderItem(folder))
			return folder;

		if (aeq.isString(folder))
			return aeq.project.findFolder(folder, parentFolder);

		return null;
	},

	getSelectedFolders: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isFolderItem(item);
		});
	},

	getSelectedComps: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isComp(item);
		});
	},

	getSelectedFootage: function(){
		return aeq.filter(app.project.selection, function(item){
			return aeq.isFootageItem(item);
		});
	},

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

	getFolderOrRoot : function (folder) {
		if (aeq.isNullOrUndefined(folder))
			return app.project.rootFolder;

		return aeq.project.getFolder(folder);
	}

	save: function(path) {
		if (!path)
			return app.project.save();

		var file = aeq.getFileObject(path);

		if (file.exists)
			if (!confirm("File exists! Overwrite?"))
				return null;

		return app.project.save(file);
	},

	quickSave: function() {
		var file = aeq.app.getAEP();
		return app.project.save(file);
	},

	importFile: function(file, folder, options) {
		var proj = app.project,
			newItem;

		var newFile = aeq.getFile(file);

		if (!aeq.isFile(newFile))
			throw new Error( file + " is not a valid file!" );

		folder = aeq.project.getOrCreateFolder(folder);
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

	importSequence: function(file, folder) {
		return aeq.importFile(file, folder, {sequence: true});
	},

	importFiles: function(fileArray, folder, options) {
		var importedItems = aeq.arrayEx();

		aeq.forEach(fileArray, function(file) {
			var item = aeq.importFile(file, folder, options);
			importedItems.push(item);
		});

		return importedItems;
	},

	moveToFolder: function(items, folder) {
		folder = aeq.project.getFolder(folder);

		if (!aeq.isArray(items)) items = [items];

		aeq.forEach(items, function (item) {
			item.parentFolder = folder;
			item.selected = false;
		});
	},

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
