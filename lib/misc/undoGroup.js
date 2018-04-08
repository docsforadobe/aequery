aeq = ( function ( aeq ) {
aeq.extend({

	/**
	 * Creates an undoGroup and wraps passed function in it
	 * @method
	 * @memberof aeq
	 * @param  {string}    name     Undo group name
	 * @param  {Function}  callback Function to wrap in undo group
	 * @param  {any|array} args     Argument or array of arguments to pass to callback
	 * @return {any}                Returned value from function
	 */
	createUndoGroup: function ( name, callback, args ) {
		app.beginUndoGroup( name );
		if ( !aeq.isArray( args ) ) {
			args = [ args ];
		}
		var value = callback.apply( null, args );
		app.endUndoGroup();

		return value;
	}
});

// Function aliases
aeq.undoGroup = aeq.createUndoGroup;

return aeq;
}( aeq || {}) );
