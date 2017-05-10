var aeq = (function (aeq) {
aeq.app = {
	toString: function() {
		return "[object aeq.App]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	version: parseFloat(app.version),

	securityPrefEnabled : function() {
		return app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY") == 1;
	},

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
		var aepFile = aeq.app.getAEP();
		if (!aepFile) return null;
		return aeq.getFolder(aepFile.path);
	},

	getAEPName: function() {
		var aepFile = aeq.app.getAEP();
		if (!aepFile) return null;
		return aeq.file.stripExtension(aepFile.displayName);
	},

	getPresetsPaths: function () {
		var appVersion = aeq.app.version;
		var versionPrettyName = "";

		if (parseInt(appVersion) == 11)
			versionPrettyName = 'CS6';
		else if (parseInt(appVersion) == 12)
			versionPrettyName = 'CC';
		else if (appVersion >= 13.0 && appVersion < 13.5)
			versionPrettyName = 'CC 2014';
		else if (appVersion >= 13.5 && appVersion < 14.0)
			versionPrettyName = 'CC 2015';
		else if (appVersion >= 14.0)
			versionPrettyName = 'CC 2017';

		return [
			Folder.current.fullName + '/Presets/',
			Folder.myDocuments.fullName + '/Adobe/After Effects ' + versionPrettyName + '/User Presets/',
		];
	},

	ensureSecurityPrefEnabled: function() {
		if (!aeq.app.securityPrefEnabled()) {

			if (confirm("This script requires access to write files.\n" +
				"Go to the \"General\" panel of the application preferences and ensure\n" +
				"\"Allow Scripts to Write Files and Access Network\" is checked.\n\nOpen prefs now?")) {

				app.executeCommand(2359); // launch prefs
			}

			if (!aeq.app.securityPrefEnabled())
				throw new Error( "Security preference is not enabled! Can't continue." );
		}
	},

	open: function(path) {
		var file = aeq.getFile(path);

		if (file)
			return app.open(file);

		return app.open();
	},

	doSomethingWithApp: function() {
		alert(app);
	}
};

// Function aliases
aeq.open = aeq.app.open;
aeq.AEversion = aeq.app.version;

return aeq;
}(aeq || {}));
