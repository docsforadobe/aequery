aeq.ui = ( function ( ui ) {
/**
	 * [description]
	 * @class
	 * @memberof aeq
	 * @param  {type} obj [description]
	 * @return {type}     [description]
	 */
ui.Window = function ( obj ) {
	this.obj = obj;
};

ui.Window.prototype = ui.Container.prototype;

/**
 * [description]
 * @method
 * @memberof aeq.ui.Window
 * @return {type} [description]
 */
ui.Window.prototype.show = function () {
	this.layout();
	if ( aeq.isWindow( this.obj ) ) {
		return this.obj.show();
	}
};

/**
 * [description]
 * @method
 * @memberof aeq.ui.Window
 * @return {type} [description]
 */
ui.Window.prototype.hide = function () {
	if ( aeq.isWindow( this.obj ) ) {
		this.obj.hide();
	}
};

/**
 * [description]
 * @method
 * @memberof aeq.ui.Window
 * @param  {type} value [description]
 * @return {type}       [description]
 */
ui.Window.prototype.close = function ( value ) {
	if ( aeq.isWindow( this.obj ) ) {
		this.obj.close( value );
	}
};

/**
 * [description]
 * @method
 * @memberof aeq.ui.Window
 * @return {type} [description]
 */
ui.Window.prototype.layout = function () {
	this.obj.layout.layout( true );
	this.obj.layout.resize();
	this.obj.onResizing = this.obj.onResize = function () {
		this.layout.resize();
	};
};

return ui;
}( aeq.ui || {}) );
