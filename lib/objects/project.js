var aeq = (function (aeq) {
aeq.project = {
	toString: function() {
		return "[object aeq.project]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	doSomethingWithProject: function() {
		alert(project.items);
	}
};

return aeq;
}(aeq || {}));
