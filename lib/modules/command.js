aeq = (function (aeq) {

aeq.command = {
	call: function(windows, mac, arg) {
		if (aeq.isObject(arguments[0])) {
			windows = arguments[0].win || arguments[0].windows;
			mac = arguments[0].mac || rguments[0].osx;
			arg = arguments[0].arg;
		}
		var command = mac;
		if ($.os.indexOf("Windows") != -1) {
			command = windows;
		}
		return system.callSystem(command + " " + arg);
	},

	openURL: function(URL) {
		try {
			if (URL.match(/^http:\/\//) === null) {
				URL = "http://" + URL;
			}
			aeq.command.call({
				win: "cmd /c \"explorer",
				max: "open",
				arg: URL
			});
		} catch(err){
			alert("Error in openURL function\n" + err.toString());
		}
	}
};


return aeq;
}(aeq || {}));
