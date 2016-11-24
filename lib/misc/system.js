var aeq = (function (aeq) {
aeq.extend({
	isMac: $.os.indexOf("Windows") === -1,
	isWindows: $.os.indexOf("Windows") !== -1,

	getSystemInfo: function() {
		return $.os + " AE " + app.version + "/" + app.isoLanguage;
	}
});

aeq.isWin = aeq.isWindows;

return aeq;
}(aeq || {}));
