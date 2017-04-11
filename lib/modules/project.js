var aeq = (function (aeq) {
aeq.project = {
	toString: function() {
		return "[object aeq.project]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	getFootage: function(){
		var items = aeq.normalizeCollection(app.project.items);
		var footage = aeq.filter(items, function(item){
			return (aeq.isFootageItem(item));
		});
		return footage;
	},

	getFolder: function(name){
		var folders = aeq.project.getFolders();

		var folder = aeq.filter(folders, function(folder) {
			return folder.name == name;
		});

		return folder[0];
	},

	getFolders: function(){
		var folders =aeq.normalizeCollection(app.project.items);
		folders = aeq.filter(folders, function(item){
			return (aeq.isFolderItem(item));
		});
		return folders;
	},

	getSelectedFolders: function(){
		var folders = aeq.normalizeCollection(app.project.items);
		folders = aeq.filter(folders, function(item){
			return (aeq.isFolderItem(item));
		});
		folders = aeq.filter(folders, function(item){
			return (item.selected);
		});
		return folders;
	},

	getSelectedComps: function(){
		var comps = aeq.normalizeCollection(app.project.items);
		comps = aeq.filter(comps, function(item){
			return (aeq.isComp(item));
		});
		comps = aeq.filter(comps, function(item){
			return (item.selected);
		});
		return comps;
	},

	getSelectedFootage: function(){
		var footage = aeq.normalizeCollection(app.project.items);
		footage = aeq.filter(footage, function(item){
			return (aeq.isFootageItem(item));
		});
		footage = aeq.filter(footage, function(item){
			return (item.selected);
		});
		return footage;
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

		file = aeq.getFile(file);
		folder = aeq.project.getFolder(folder) || proj.rootFolder;
		options = options || {};

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

		aeq.forEach(items, function (item) {
			item.parentFolder = folder;
			item.selected = false;
		});
	},

	reduceToQueuedComps: function() {
		var queuedComps = aeq.renderqueue.getQueuedComps();
		if (queuedComps.length === 0) return null;
		app.project.reduceProject(queuedComps);
	},

	doSomethingWithProject: function(project) {
		alert(project.items);
	}
};

// Function aliases
aeq.save = aeq.project.save;
aeq.quickSave = aeq.project.quickSave;
aeq.import = aeq.importFile = aeq.project.importFile;
aeq.importFiles = aeq.project.importFiles;
aeq.importSequence = aeq.project.importSequence;

return aeq;
}(aeq || {}));
