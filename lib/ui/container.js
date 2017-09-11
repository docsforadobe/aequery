aeq.ui = ( function ( ui ) {
/**
 * [description]
 * @class
 * @memberof aeq
 * @param  {type} obj [description]
 */
ui.Container = function ( obj ) {
	this.obj = obj;
};

ui.Container.prototype = {
	toString: function () {
		return '[object aeq.ui.Container]';
	},

	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @return {type} [description]
	 */
	get: function () {
		return this.obj;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} options [description]
	 * @return {type}         [description]
	 */
	set: function ( options ) {
		ui.set( this.obj, options );
	},

	/**
	 * [description]
	 * @method
	 * @private
	 * @memberof aeq.ui.Container
	 * @param  {type} type    [description]
	 * @param  {type} options [description]
	 * @return {type}         [description]
	 */
	_add: function ( type, options ) {
		if ( aeq.isObject( options.arg1 ) && !aeq.isArray( options.arg1 ) ) {
			options = options.arg1;

			// "items" is used by listbox, dropdownlist and treeview
			// if it is defined, it most likely one of those controls
			options.arg1 = options.items || options.text;
		}

		var obj = this.obj.add( type, options.bounds, options.arg1, options.properties );
		ui.set( obj, options );
		return obj;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onClick    [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addButton: function ( arg1, onClick, properties ) {
		return this._add( 'button', {
			arg1: arg1,
			properties: properties,
			onClick: onClick
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onClick    [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addCheckbox: function ( arg1, onClick, properties ) {
		return this._add( 'checkbox', {
			arg1: arg1,
			properties: properties,
			onClick: onClick
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onChange   [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addDropdownList: function ( arg1, onChange, properties ) {
		return this._add( 'dropdownlist', {
			arg1: arg1,
			properties: properties,
			onChange: onChange
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onChange   [description]
	 * @param  {type} onChanging [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addEditText: function ( arg1, onChange, onChanging, properties ) {
		return this._add( 'edittext', {
			arg1: arg1,
			properties: properties,
			onChange: onChange,
			onChanging: onChanging
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} options [description]
	 * @return {type}         [description]
	 */
	addGroup: function ( options ) {
		var group = this.obj.add( 'group' );
		group = new ui.Container( group );
		if ( options ) {
			group.set( options );
		}
		return group;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onClick    [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addIconButton: function ( arg1, onClick, properties ) {
		var options = {
			arg1: arg1,
			onClick: onClick,
			properties: properties
		};

		if ( aeq.isObject( options.arg1 ) && !aeq.isArray( options.arg1 ) &&
			!aeq.isFile( options.arg1 ) && options.arg1.format === undefined ) {
				// Check options.arg1.format to see if it is ScriptUIImage
			options = options.arg1;
			options.arg1 = options.image || undefined;
		}

		var obj = this.obj.add( 'iconbutton', options.bounds, options.arg1, options.properties );
		ui.set( obj, options );
		return obj;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onClick    [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addImage: function ( arg1, onClick, properties ) {
		var options = {
			arg1: arg1,
			onClick: onClick,
			properties: properties
		};

		if ( aeq.isObject( options.arg1 ) && !aeq.isArray( options.arg1 ) &&
			!aeq.isFile( options.arg1 ) && options.arg1.format === undefined ) {
				// Check options.arg1.format to see if it is ScriptUIImage
			options = options.arg1;
			options.arg1 = options.image || undefined;
		}

		var obj = this.obj.add( 'image', options.bounds, options.arg1, options.properties );
		ui.set( obj, options );
		return obj;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1          [description]
	 * @param  {type} onChange      [description]
	 * @param  {type} onDoubleClick [description]
	 * @param  {type} properties    [description]
	 * @return {type}               [description]
	 */
	addListBox: function ( arg1, onChange, onDoubleClick, properties ) {
		return this._add( 'listbox', {
			arg1: arg1,
			properties: properties,
			onChange: onChange,
			onDoubleClick: onDoubleClick
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addPanel: function ( arg1, properties ) {
		var panel = this._add( 'panel', {
			arg1: arg1,
			properties: properties
		});
		return new ui.Container( panel );
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} value    [description]
	 * @param  {type} maxValue [description]
	 * @return {type}          [description]
	 */
	addProgressbar: function ( value, maxValue ) {
		return this.obj.add( 'progressbar', undefined, value, maxValue );
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onClick    [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addRadioButton: function ( arg1, onClick, properties ) {
		return this._add( 'radiobutton', {
			arg1: arg1,
			properties: properties,
			onClick: onClick
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} value      [description]
	 * @param  {type} maxValue   [description]
	 * @param  {type} onChange   [description]
	 * @param  {type} onChanging [description]
	 * @return {type}            [description]
	 */
	addScrollbar: function ( value, maxValue, onChange, onChanging ) {
		var scrollbar = this.obj.add( 'scrollbar', undefined, value, maxValue );
		scrollbar.onChange = onChange;
		scrollbar.onChanging = onChanging;
		return scrollbar;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} value      [description]
	 * @param  {type} minValue   [description]
	 * @param  {type} maxValue   [description]
	 * @param  {type} onChange   [description]
	 * @param  {type} onChanging [description]
	 * @return {type}            [description]
	 */
	addSlider: function ( value, minValue, maxValue, onChange, onChanging ) {
		var slider = this.obj.add( 'slider', undefined, value, minValue, maxValue );
		slider.onChange = onChange;
		slider.onChanging = onChanging;
		return slider;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addStaticText: function ( arg1, properties ) {
		return this._add( 'statictext', {
			arg1: arg1,
			properties: properties
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} text [description]
	 * @return {type}      [description]
	 */
	addTab: function ( text ) {
		var tab = this.obj.add( 'tab', undefined, text );
		return new ui.Container( tab );
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @return {type} [description]
	 */
	addTabbedPanel: function () {
		var tabbedpanel = this.obj.add( 'tabbedpanel' );
		return new ui.Container( tabbedpanel );
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} arg1       [description]
	 * @param  {type} onChange   [description]
	 * @param  {type} properties [description]
	 * @return {type}            [description]
	 */
	addTreeView: function ( arg1, onChange, properties ) {
		return this._add( 'treeview', {
			arg1: arg1,
			properties: properties,
			onChange: onChange
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @return {type} [description]
	 */
	update: function () {
		this.obj.layout.layout( true );
		this.obj.layout.resize();
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @param  {type} obj [description]
	 * @return {type}     [description]
	 */
	remove: function ( obj ) {
		if ( obj instanceof ui.Container ) {
			obj = obj.obj;
		}
		this.obj.remove( obj );
	},

	/**
	 * Remove all of the containers children
	 * @memberof aeq.ui.Container
	 */
	removeChildren: function ( obj ) {
		if ( obj instanceof ui.Container ) {
			obj = obj.obj;
		}
		for ( var i = obj.children.length - 1; i >= 0; i-- ) {
			obj.remove( obj.children[i] );
		}
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.ui.Container
	 * @return {type} [description]
	 */
	removeAll: function () {
		for ( var i = this.obj.children.length - 1; i >= 0; i-- ) {
			this.obj.remove( this.obj.children[i] );
		}
	}
};

// Aliases, backwards compatible
ui.Container.prototype.addListbox = ui.Container.prototype.addListBox;
ui.Container.prototype.addStatictext = ui.Container.prototype.addStaticText;
ui.Container.prototype.addTreeview = ui.Container.prototype.addTreeView;

( function createControllerSetters() {
	var oneParameters = [ 'enabled', 'helpTip', 'orientation', 'text', 'visible' ],
		twoParameters = [
			'alignChildren',
			'alignment',
			'location',
			'maximumSize',
			'minimumSize',
			'preferredSize',
			'size'
		],
		fourParameters = [ 'bounds', 'margins' ];

	aeq.forEach( oneParameters, function ( type ) {
		ui.Container.prototype[type] = function ( newValue ) {
			if ( newValue === undefined ) {
				return this.obj[type];
			}
			this.obj[type] = newValue;
		};
	});

	function multiParameter( type, numParameters ) {
		return function ( newValue ) {
			if ( newValue === undefined ) {
				return this.obj[type];
			}
			newValue = arguments.length === numParameters ? Array.apply( null, arguments ) : arguments[0];
			this.obj[type] = newValue;
		};
	}

	aeq.forEach( twoParameters, function ( type ) {
		ui.Container.prototype[type] = multiParameter( type, 2 );
	});

	aeq.forEach( fourParameters, function ( type ) {
		ui.Container.prototype[type] = multiParameter( type, 4 );
	});
}() );

return ui;
}( aeq.ui || {}) );
