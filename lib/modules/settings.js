var aeq = (function (aeq) {
aeq.settings = {
	toString: function() {
		return "[object aeq.settings]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	setting: function(sectionName, keyName, value) {
		if (value !== undefined) {
			aeq.settings.save(sectionName, keyName, value);
			return aeq;
		}
		return aeq.settings.get(sectionName, keyName);
	},

	get: function(sectionName, keyName) {
		if (aeq.settings.have(sectionName, keyName)) {
			return app.settings.getSetting(sectionName, keyName);
		}
		return undefined;
	},

	getAsBool: function(sectionName, keyName) {
		return aeq.settings.get(sectionName, keyName) == "true";
	},

	getAsArray: function(sectionName, keyName) {
		return aeq.settings.get(sectionName, keyName).split(",");
	},

	getAsFloat: function(sectionName, keyName) {
		return parseFloat(aeq.settings.get(sectionName, keyName));
	},

	getAsInt: function(sectionName, keyName) {
		return parseInt(aeq.settings.get(sectionName, keyName));
	},

	have: function(sectionName, keyName) {
		return app.settings.haveSetting(sectionName, keyName);
	},

	save: function(sectionName, keyName, value) {
		app.settings.saveSetting(sectionName, keyName, value);
	},

	unpack: function(sectionName, keyNames) {
		var ret;
		// Argument keyNames can either be an array with keyNames or an object with
		// key: defaultValue pairs.
		ret = aeq.isObject(keyNames) ? keyNames : {};

		aeq.forEach(keyNames, function(keyName) {
			if (app.settings.haveSetting(sectionName, keyName)) {
				ret[keyName] = app.settings.getSetting(sectionName, keyName);
			}
		});

		return ret;
	}
};

// Function aliases
aeq.saveSetting = aeq.setSetting = aeq.settings.set = aeq.settings.save;
aeq.getSetting = aeq.settings.get;
aeq.getSettingAsBool = aeq.settings.getAsBool;
aeq.getSettingAsArray = aeq.settings.getAsArray;
aeq.getSettingAsFloat = aeq.settings.getAsFloat;
aeq.getSettingAsInt = aeq.settings.getAsInt;
aeq.haveSetting = aeq.settings.have;
aeq.unpackSettings = aeq.loadSettings = aeq.settings.load = aeq.settings.unpack;

return aeq;
}(aeq || {}));
