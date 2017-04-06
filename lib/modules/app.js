var aeq = (function (aeq) {
aeq.app = {
	toString: function() {
		return "[object aeq.App]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	getUserDataFolder: function() {
		return Folder.userData;
	},

	getScriptFile: function() {
		return aeq.getFile($.fileName);
	},

	doSomethingWithApp: function() {
		alert(app);
	}
};

// Function aliases

return aeq;
}(aeq || {}));
