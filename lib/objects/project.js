var aeq = (function (aeq) {
aeq.project = {
	toString: function() {
		return "[object aeq.project]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	getFolders: function(project){
		//	idk how to properly invoke aeq's nice looking forEach'es,
		//	so dumb loops it is
		var len = project.items.length;
		var arr = [];
		for ( var i = 1; i <= len; ++i ){
			var itm = project.items[i];
			if ( itm instanceof FolderItem )
				arr.push(itm);


		}
		return arr;
	},

	doSomethingWithProject: function(project) {
		alert(project.items);
	}
};

return aeq;
}(aeq || {}));
