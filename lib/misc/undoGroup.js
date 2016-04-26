aeq = (function (aeq) {
aeq.extend({
	createUndoGroup: function(name, callback, args) {
		app.beginUndoGroup(name);
		if (!aeq.isArray(args)) {
			args = [args];
		}
		callback.apply(null, args);
		app.endUndoGroup();
	}
});

// Function aliases
aeq.undoGroup = aeq.createUndoGroup;

return aeq;
}(aeq || {}));
