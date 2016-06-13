var aeq = (function (aeq) {
aeq.comp = {
	toString: function() {
		return "[object aeq.comp]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend
};
return aeq;
}(aeq || {}));
