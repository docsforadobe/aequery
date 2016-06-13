var aeq = (function (aeq) {
aeq.property = {
	toString: function() {
		return "[object aeq.property]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend
};
aeq.prop = aeq.property;
return aeq;
}(aeq || {}));
