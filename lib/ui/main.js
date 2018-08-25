/**
 * [description]
 * @namespace aeq.ui
 * @memberof aeq
 */
aeq.ui = ( function ( ui ) {
/**
 * Creates a UI Main Window
 * @method
 * @memberof aeq.ui
 * @param  {Panel}   thisObj                   [description]
 * @param  {string}  title                     Title of the window
 * @param  {Object}  [options]                 Options for the function
 * @param  {boolean} [options.resizeable=true] `true` for resizable window
 * @return {type}                              Created window
 */
ui.createMainWindow = function ( thisObj, title, options ) {
	if ( aeq.isPanel( thisObj ) ) {
		return new ui.Window( thisObj );
	}

	if ( aeq.isString( thisObj ) ) {
		options = title;
		title = thisObj;
	}
	options = aeq.setDefault( options, { resizeable: true });

	var root = new Window( 'palette', title, undefined, options );

	aeq.ui.root = root;

	return new ui.Window( root );
};

/**
 * Creates a UI Window
 * @method
 * @memberof aeq.ui
 * @param  {string}  title                     Title of the window
 * @param  {Object}  [options]                 Options for the function
 * @param  {boolean} [options.resizeable=true] `true` for resizable window
 * @return {type}                              Created window
 */
ui.createWindow = function ( title, options ) {
	options = aeq.setDefault( options, { resizeable: true });
	var newWindow = new Window( 'palette', title, undefined, options );
	return new ui.Window( newWindow );
};

/**
 * Creates a UI Dialog
 * @method
 * @memberof aeq.ui
 * @param  {string}  title                     Title of the dialog
 * @param  {Object}  [options]                 Options for the function
 * @param  {boolean} [options.resizeable=true] `true` for resizable dialog
 * @return {type}                              Created dialog
 */
ui.createDialog = function ( title, options ) {
	options = aeq.setDefault( options, { resizeable: true });
	var newWindow = new Window( 'dialog', title, undefined, options );
	return new ui.Window( newWindow );
};

/**
 * [description]
 * @method
 * @memberof aeq.ui
 * @param  {Function} callback [description]
 */
ui.ready = function ( callback ) {
	callback();
};

/**
 * [description]
 * @method
 * @memberof aeq.ui
 * @param  {type} obj     [description]
 * @param  {type} options [description]
 */
ui.set = function ( obj, options ) {
	for ( var option in options ) {
		if ( options.hasOwnProperty( option ) && option !== 'properties' && option !== 'arg1' ) {
			obj[option] = options[option];
		}
	}
};

return ui;
}( aeq.ui || {}) );
