var aeq = (function (aeq) {
aeq.extend({
	isMac: $.os.indexOf("Windows") === -1,
	isWindows: $.os.indexOf("Windows") !== -1
});

aeq.isWin = aeq.isWindows;

return aeq;
}(aeq || {}));
