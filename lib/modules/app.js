var aeq = ( function ( aeq ) {
/**
 * [app description]
 * @namespace aeq.app
 * @memberof aeq
 * @type {Object}
 */
aeq.app = aeq.extend({}, {
	toString: function () {
		return '[object aeq.App]';
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * The After Effects version
	 * @memberof aeq.app
	 * @type {number}
	 */
	version: parseFloat( app.version ),

	/**
	 * Checks whether AE security pref is enabled
	 * @method
	 * @memberof aeq.app
	 * @return {boolean} Security pref status
	 */
	securityPrefEnabled: function () {
		return app.preferences.getPrefAsLong( 'Main Pref Section', 'Pref_SCRIPTING_FILE_NETWORK_SECURITY' ) == 1;
	},

	/**
	 * Gets user data folder; In Windows: the value of %USERDATA% (by default,
	 * C:\Documents and Settings\username\Application Data) In Mac OS:
	 * ~/Library/Application Support
	 * @method
	 * @memberof aeq.app
	 * @return {Folder} User data folder
	 */
	getUserDataFolder: function () {
		return Folder.userData;
	},

	/**
	 * Gets current script file object
	 * @method
	 * @memberof aeq.app
	 * @return {File} File object of current script
	 */
	getScriptFile: function () {
		return aeq.getFile( $.fileName );
	},

	/**
	 * Gets current AEP file object
	 * @method
	 * @memberof aeq.app
	 * @return {File} File object of current AEP
	 */
	getAEP: function () {
		return app.project.file;
	},

	/**
	 * Gets folder containing current AEP, or null if AEP is not saved
	 * @method
	 * @memberof aeq.app
	 * @return {Folder|null} Parent directory of current AEP
	 */
	getAEPDir: function () {
		var aepFile = aeq.app.getAEP();

		if ( !aepFile ) {
return null;
}

		return aeq.getFolder( aepFile.path );
	},

	/**
	 * Gets filename of current AEP, or null if AEP is not saved
	 * @method
	 * @memberof aeq.app
	 * @return {string|null} Filename of current AEP
	 */
	getAEPName: function () {
		var aepFile = aeq.app.getAEP();
		if ( !aepFile ) return null;
		return aeq.file.stripExtension( aepFile.displayName );
	},

	/**
	 * Gets array of both default preset folder paths
	 * One in the user directory, one in the AE install directory
	 * @method
	 * @memberof aeq.app
	 * @return {string[]} Array of preset folder paths
	 */
	getPresetsPaths: function () {
		var appVersion = aeq.app.version;
		var versionPrettyName = '';

		if ( parseInt( appVersion ) === 11 ) {
			versionPrettyName = 'CS6';
		} else if ( parseInt( appVersion ) === 12 ) {
			versionPrettyName = 'CC';
		} else if ( appVersion >= 13.0 && appVersion < 13.5 ) {
			versionPrettyName = 'CC 2014';
		} else if ( appVersion >= 13.5 && appVersion < 14.0 ) {
			versionPrettyName = 'CC 2015';
		} else if ( appVersion >= 14.0 ) {
			versionPrettyName = 'CC 2017';
		}

		return [
			Folder.current.fullName + '/Presets/',
			Folder.myDocuments.fullName + '/Adobe/After Effects ' + versionPrettyName + '/User Presets/'
		];
	},

	/**
	 * Checks security pref setting, prompting user to enable it if not
	 * Throws an error if user declines prompt
	 * @method
	 * @memberof aeq.app
	 */
	ensureSecurityPrefEnabled: function () {
		if ( !aeq.app.securityPrefEnabled() ) {
			if ( confirm( 'This script requires access to write files.\n' +
				'Go to the "General" panel of the application preferences and ensure\n' +
				'"Allow Scripts to Write Files and Access Network" is checked.\n\nOpen prefs now?' ) ) {
				app.executeCommand( 2359 ); // Launch prefs
			}

			if ( !aeq.app.securityPrefEnabled() ) {
				throw new Error( 'Security preference is not enabled! Can\'t continue.' );
			}
		}
	},

	/**
	 * Opens an AEP
	 * @method
	 * @memberof aeq.app
	 * @param  {File|string} filePath AEP path or file object to open
	 * @return {File}                 Newly-opened AEP
	 */
	open: function ( filePath ) {
		var file = aeq.getFile( filePath );

		if ( file ) {
			return app.open( file );
		}

		return app.open();
	}
});

// Function aliases
aeq.open = aeq.app.open;
aeq.AEversion = aeq.app.version;

return aeq;
}( aeq || {}) );
