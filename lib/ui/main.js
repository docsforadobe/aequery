/**
 * [description]
 * @namespace aeq.ui
 * @memberof aeq
 */
aeq.ui = ( function ( ui ) {
/**
 * [description]
 * @method
 * @memberof aeq.ui
 * @param  {Panel} thisObj [description]
 * @param  {string}  title   [description]
 * @param  {type}  opt     [description]
 * @return {type}          [description]
 */
ui.createMainWindow = function ( thisObj, title, opt ) {
	if ( aeq.isPanel( thisObj ) ) {
		return new ui.Window( thisObj );
	}

	if ( aeq.isString( thisObj ) ) {
		opt = title;
		title = thisObj;
	}
	opt = aeq.setDefault( opt, { resizeable: true });

	var root = new Window( 'palette', title, undefined, opt );

	aeq.ui.root = root;

	return new ui.Window( root );
};

/**
 * [description]
 * @method
 * @memberof aeq.ui
 * @param  {string} title   [description]
 * @param  {type} options [description]
 * @return {type}         [description]
 */
ui.createWindow = function ( title, options ) {
	options = aeq.setDefault( options, { resizeable: true });
	var newWindow = new Window( 'palette', title, undefined, options );
	return new ui.Window( newWindow );
};

/**
 * [description]
 * @method
 * @memberof aeq.ui
 * @param  {string} title   [description]
 * @param  {type} options [description]
 * @return {type}         [description]
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
 * @return {type}            [description]
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
 * @return {type}         [description]
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
