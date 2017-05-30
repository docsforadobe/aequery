aeq = (function (aeq) {
aeq.extend({
	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type}   name     [description]
	 * @param  {Function} callback [description]
	 * @param  {type}   args     [description]
	 * @return {type}            [description]
	 */
	createUndoGroup: function(name, callback, args) {
		app.beginUndoGroup(name);
		if (!aeq.isArray(args)) {
			args = [args];
		}
		var value = callback.apply(null, args);
		app.endUndoGroup();

		return value;
	}
});

// Function aliases
aeq.undoGroup = aeq.createUndoGroup;

return aeq;
}(aeq || {}));
