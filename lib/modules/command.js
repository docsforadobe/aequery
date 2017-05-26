var aeq = (function (aeq) {
/**
 * [command description]
 * @namespace aeq.command
 * @memberof aeq
 * @type {Object}
 */
aeq.command = {
	toString: function() {
		return "[object aeq.command]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.command
	 * @param  {type} windows [description]
	 * @param  {type} mac     [description]
	 * @param  {type} arg     [description]
	 * @return {type}         [description]
	 */
	call: function(windows, mac, arg) {
		if (aeq.isObject(arguments[0])) {
			var args = arguments[0];
			windows = setDefault(args.win, args.windows);
			mac = setDefault(args.mac, args.osx);
			arg = args.arg;
		}
		var command = mac;
		if (aeq.isWindows) {
			command = windows;
		}
		arg = arg !== undefined ? " " + arg : "";
		return system.callSystem(command + arg);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.command
	 * @param  {type} URL [description]
	 * @return {type}     [description]
	 */
	openURL: function(URL) {
		try {
			if (URL.match(/^https?:\/\//) === null) {
				URL = "http://" + URL;
			}
			aeq.command.call({
				win: "cmd /c \"explorer",
				mac: "open",
				arg: URL
			});
		} catch(err){
			alert("Error in openURL function\n" + err.toString());
		}
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.command
	 * @param  {type} filePath [description]
	 * @return {type}          [description]
	 */
	revealFile: function(filePath) {
		if ( aeq.isFile(filePath) ) {
			filePath = filePath.fsName;
		}
		return aeq.command.call("Explorer /select,", "open -R", "\"" + filePath + "\"");
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.command
	 * @param  {type} text [description]
	 * @return {type}      [description]
	 */
	copyToClipboard: function( text ) {
		aeq.command.call(
			'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"', // Windows
			'echo "' + text + '" | pbcopy' // MacOS
		);
	}
};

// Function aliases
aeq.callSystem = aeq.command.call;
aeq.openURL = aeq.command.openURL;
aeq.revealFile = aeq.command.revealFile;
aeq.copyToClipboard = aeq.command.copyToClipboard;

return aeq;
}(aeq || {}));
