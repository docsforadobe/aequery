aeq = (function (aeq) {

aeq.command = {
	call: function(windows, mac, arg) {
		if (aeq.isObject(arguments[0])) {
			var args = arguments[0];
			windows = args.win || args.windows;
			mac = args.mac || args.osx;
			arg = args.arg;
		}
		var command = mac;
		if (aeq.isWindows) {
			command = windows;
		}
		arg = arg !== undefined ? " " + arg : "";
		return system.callSystem(command + arg);
	},

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

	revealFile: function(filePath) {
		if ( aeq.isFile(filePath) ) {
			filePath = filePath.fsName;
		}
		return aeq.command.call("Explorer /select,", "open -R", "\"" + filePath + "\"");
	},

	copyToClipboard: function( text ) {
		aeq.command.call(
			'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"', // Windows
			'echo "' + text + '" | pbcopy' // MacOS
		);
	}
};

aeq.callSystem = aeq.command.call;
aeq.openURL = aeq.command.openURL;
aeq.revealFile = aeq.command.revealFile;
aeq.copyToClipboard = aeq.command.copyToClipboard;

return aeq;
}(aeq || {}));
