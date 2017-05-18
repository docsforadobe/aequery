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

	getFolder: function(name){
		var folders = aeq.project.getFolders();

		var folder = aeq.filter(folders, function(folder) {
			return folder.name == name;
		});

		return folder[0];
	},

	getFolders: function(){
		var folders = aeq.getItems();

		return folders.filter(function(item){
			return aeq.isFolderItem(item);
		});
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

		if (aeq.isString(folder))
			folder = setDefault(aeq.project.getFolder(folder), proj.rootFolder);
		else
			folder = setDefault(folder, proj.rootFolder);
			
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
		var importedItems = [];

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
