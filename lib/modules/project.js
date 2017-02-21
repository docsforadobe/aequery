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
			return (item instanceof FootageItem);
		});
		return footage;
	},

	getFolders: function(){
		var folders =aeq.normalizeCollection(app.project.items);
		folders = aeq.filter(folders, function(item){
			return (item instanceof FolderItem);
		});
		return folders;
	},

	getSelectedFolders: function(){
		var folders = aeq.normalizeCollection(app.project.items);
		folders = aeq.filter(folders, function(item){
			return (item instanceof FolderItem);
		});
		folders = aeq.filter(folders, function(item){
			return (item.selected);
		});
		return folders;
	},

	doSomethingWithProject: function(project) {
		alert(project.items);
	}
};

return aeq;
}(aeq || {}));
