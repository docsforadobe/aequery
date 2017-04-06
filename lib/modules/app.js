var aeq = (function (aeq) {
aeq.app = {
	toString: function() {
		return "[object aeq.App]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	doSomethingWithApp: function() {
		alert(app);
	}
};

// Function aliases

return aeq;
}(aeq || {}));
