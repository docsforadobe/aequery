aeq = ( function ( aeq ) {
/**
 * Module for interacting with the command line / system
 * @namespace aeq.command
 * @memberof aeq
 * @type {Object}
 */
aeq.command = aeq.extend({}, {
	toString: function () {
		return '[object aeq.command]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Call a command-line/system command.
	 * @method
	 * @memberof aeq.command
	 * @param  {string|object} windows           Command to call if OS is windows,
	 *                                           or an object with options.
	 * @param  {string}        [windows.win]     Command to call if OS is windows.
	 * @param  {string}        [windows.windows] Command to call if OS is windows.
	 * @param  {string}        [windows.mac]     Argument to give the command.
	 * @param  {string}        [windows.arg]     Command to call if OS is MacOS.
	 * @param  {string}        [mac]             Command to call if OS is MacOS.
	 * @param  {string}        [arg]             Argument to give the command.
	 * @return {string}        The value returned from the command.
	 *
	 * @example
	 * <caption>Open file in Finder/Explorer. ({@link aeq.command.revealFile})</caption>
	 * aeq.command.call('Explorer /select,', 'open -R', '"' + file.fsName + '"' )
	 * aeq.command.call({
	 *     windows: 'Explorer /select,',
	 *     mac: 'open -R',
	 *     arg: '"' + file.fsName + '"'
	 * })
	 */
	call: function ( windows, mac, arg ) {
		if ( aeq.isObject( arguments[0] ) ) {
			var args = arguments[0];
			windows = setDefault( args.win, args.windows );
			mac = setDefault( args.mac, args.osx );
			arg = args.arg;
		}
		var command = mac;
		if ( aeq.isWindows ) {
			command = windows;
		}
		arg = arg === undefined ? '' : ' ' + arg;
		return system.callSystem( command + arg );
	},

	/**
	 * Opens the given URL in the default web browser.
	 * @method
	 * @memberof aeq.command
	 * @param  {string} URL The URL to open.
	 *
	 * @example
	 * <caption>Opens AEQuery bitbucket project.</caption>
	 * aeq.command.openURL('https://bitbucket.org/motiondesign/aequery')
	 */
	openURL: function ( URL ) {
		try {
			if ( URL.match( /^https?:\/\// ) === null ) {
				URL = 'http://' + URL;
			}
			aeq.command.call({
				win: 'cmd /c "explorer',
				mac: 'open',
				arg: URL
			});
		} catch ( err ) {
			alert( 'Error in openURL function\n' + err.toString() );
		}
	},

	/**
	 * Reveals the given file path or file object in Finder/Explorer.
	 * @method
	 * @memberof aeq.command
	 * @param  {string|File} filePath The path to the file that should be
	 *                                revealed, or a file object to reveal.
	 * @return {string}      The value returned when calling the reveal command
	 *                       in the command line. Mostly empty, holds error info
	 *                       if not empty.
	 * @example
	 * <caption>Reveals the rurnning script in Finder/Explorer</caption>
	 * aeq.command.revealFile( $.fileName )
	 */
	revealFile: function ( filePath ) {
		if ( aeq.isFile( filePath ) ) {
			filePath = filePath.fsName;
		}
		return aeq.command.call( 'Explorer /select,', 'open -R', '"' + filePath + '"' );
	},

	/**
	 * Copies a string to the users clipboard.
	 * @method
	 * @memberof aeq.command
	 * @param  {string} text The string to copy.
	 *
	 * @example
	 * aeq.command.copyToClipboard( 'Hello World!' )
	 */
	copyToClipboard: function ( text ) {
		aeq.command.call(
			'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"', // Windows
			'echo "' + text + '" | pbcopy' // MacOS
		);
	}
});

// Function aliases
aeq.callSystem = aeq.command.call;
aeq.openURL = aeq.command.openURL;
aeq.revealFile = aeq.command.revealFile;
aeq.copyToClipboard = aeq.command.copyToClipboard;

return aeq;
}( aeq || {}) );
