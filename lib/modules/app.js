var aeq = (function (aeq) {
aeq.app = {
	toString: function() {
		return "[object aeq.App]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	securityPrefEnabled : app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY") == 1,

	getUserDataFolder: function() {
		return Folder.userData;
	},

	getScriptFile: function() {
		return aeq.getFile($.fileName);
	},

	getAEP: function() {
		return app.project.file;
	},

	getAEPDir: function() {
		var aepFile = aeq.getAEP();
		return aeq.getFolder(aepFile.path);
	},

	getAEPName: function() {
		var aepFile = aeq.getAEP();
		return aeq.file.stripExtension(aepFile.displayName);
	},

	ensureSecurityPrefEnabled() {
		if (!aeq.securityPrefEnabled) {
			alert("This script requires access to write files.\n" +
				"Go to the \"General\" panel of the application preferences and ensure\n" +
				"\"Allow Scripts to Write Files and Access Network\" is checked.");

			app.executeCommand(2359); // launch prefs

			if (!aeq.securityPrefEnabled)
				throw new Error( "Security preference is not enabled! Can't continue." );
		}
	},

	open: function(path) {
		var file = aeq.getFile(path);

		if (file.exists)
			return app.open(file);

		return app.open();
	},

	doSomethingWithApp: function() {
		alert(app);
	}
};

// Function aliases
aeq.open = aeq.app.open;

return aeq;
}(aeq || {}));
