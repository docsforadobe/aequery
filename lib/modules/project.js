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

	save: function(path) {
		var file = aeq.getFile(path);

		if (!file.exists)
			return app.project.save();

		return app.project.save(file);
	},

	quickSave: function() {
		var file = aeq.getAEP();
		return app.project.save(file);
	},

	doSomethingWithProject: function(project) {
		alert(project.items);
	}
};

// Function aliases
aeq.save = aeq.project.save;
aeq.quickSave = aeq.project.quickSave;

return aeq;
}(aeq || {}));
