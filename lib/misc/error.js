var aeq = (function (aeq) {
aeq.error = function( err ) {
	alert(err.toString() + "\n" +
		"Script File: " + File.decode(err.fileName).replace(/^.*[\\|\/]/, "") +
		"\nFunction: " + arguments.callee.name +
		"\nError on Line: " + err.line.toString()
	);
};

return aeq;
}(aeq || {}));
