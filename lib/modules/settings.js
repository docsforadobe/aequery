var aeq = (function (aeq) {
/**
 * [settings description]
 * @namespace aeq.settings
 * @memberof aeq
 * @type {Object}
 */
aeq.settings = aeq.extend({}, {
	toString: function() {
		return "[object aeq.settings]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * Saves setting if present, else gets setting
	 * @memberof aeq.settings
	 * @method
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @param  {string} [value]     Settings value to save for section:key
	 * @return {aeq|string}         aeq or setting value of section:key
	 */
	setting: function(sectionName, keyName, value) {
		if (value !== undefined) {
			aeq.settings.save(sectionName, keyName, value);
			return aeq;
		}
		return aeq.settings.get(sectionName, keyName);
	},
	
	/**
	 * Run on startup to ether load settings or create default settings of settings doesn't exist. Also overwritable
	 * @memberof aeq.settings
	 * @method
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @param  {string} [value]     Settings value to save for section:key
	 * @param  {bool} 	overwrite   True if wanting to overwrite the file
	 * @return {aeq|string|bool}    aeq or setting value of section:key or true/false
	 */
	startupSetting: function(sectionName, keyName, value, overwrite) {
		if (!aeq.settings.have(sectionName, keyName) || overwrite) {
			aeq.settings.save(sectionName, keyName, value);
		}
		if (aeq.settings.get(sectionName, keyName) == "true") {
			return true;
		} else if (aeq.settings.get(sectionName, keyName) == "false") {
			return false;
		} else {
			return aeq.settings.get(sectionName, keyName);
		}
	},

	/**
	 * Gets setting from section:key
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {string|undefined}   Value of saved setting, or undefined if blank
	 */
	get: function(sectionName, keyName) {
		if (aeq.settings.have(sectionName, keyName)) {
			return app.settings.getSetting(sectionName, keyName);
		}
		return undefined;
	},

	/**
	 * Gets setting and returns as boolean
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {boolean|undefined}  Saved setting as boolean
	 */
	getAsBool: function(sectionName, keyName) {
		return aeq.settings.get(sectionName, keyName) == "true";
	},

	/**
	 * Gets setting and returns as array
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {string[]|undefined} Saved setting as boolean
	 */
	getAsArray: function(sectionName, keyName) {
		return aeq.settings.get(sectionName, keyName).split(",");
	},

	/**
	 * Gets setting and returns as float
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {number|undefined}   Saved setting as float
	 */
	getAsFloat: function(sectionName, keyName) {
		return parseFloat(aeq.settings.get(sectionName, keyName));
	},

	/**
	 * Gets setting and returns as int
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {number|undefined}   Saved setting as int
	 */
	getAsInt: function(sectionName, keyName) {
		return parseInt(aeq.settings.get(sectionName, keyName));
	},

	/**
	 * Checks whether setting has been saved / exists in file
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @return {boolean}            Whether the setting exists
	 */
	have: function(sectionName, keyName) {
		return app.settings.haveSetting(sectionName, keyName);
	},

	/**
	 * Saves setting
	 * @memberof aeq.settings
	 * @method
	 * @param  {string} sectionName Settings section name
	 * @param  {string} keyName     Settings key name
	 * @param  {string} value       Settings value to save for section:key
	 */
	save: function(sectionName, keyName, value) {
		app.settings.saveSetting(sectionName, keyName, value);
	},

	/**
	 * Checks whether object of key names have saved settings,
	 * returns object of saved values of this string
	 * @method
	 * @memberof aeq.settings
	 * @param  {string} sectionName Settings section name
	 * @param  {object} keyNames    Object of containing key names
	 * @return {object}             Object of fetched settings
	 */
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
});

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
