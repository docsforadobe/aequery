var aeq = (function (aeq) {
aeq.extend({
	/**
	 * `true` if system is a MacOS
	 * @memberof aeq
	 * @type {Boolean}
	 */
	isMac: $.os.indexOf("Windows") === -1,
	/**
	 * `true` if system is a Windows
	 * @memberof aeq
	 * @type {Boolean}
	 */
	isWindows: $.os.indexOf("Windows") !== -1,

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @return {string} [description]
	 */
	getSystemInfo: function() {
		return $.os + " AE " + app.version + "/" + app.isoLanguage;
	}
});

aeq.isWin = aeq.isWindows;

return aeq;
}(aeq || {}));
