aeq = ( function ( aeq ) {
aeq.extend({

	/**
	 * Returns `true` if argument is null or undefined, false otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is null/undefined
	 */
	isNullOrUndefined: function ( o ) {
		// Using truthiness to capture both 'undefined' and 'null'
		return o == null;
	},

	/**
	 * Returns `true` if argument is a boolean (`true` or `false`),
	 * `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a boolean
	 */
	isBoolean: function ( o ) {
		return typeof o === 'boolean';
	},

	/**
	 * Returns `true` if argument is a number, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a number
	 */
	isNumber: function ( o ) {
		return typeof o === 'number';
	},

	/**
	 * Returns `true` if argument is a string, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a string
	 */
	isString: function ( o ) {
		return typeof o === 'string';
	},

	/**
	 * Returns `true` if argument is an object, `false` otherwise. This will most
	 * likely return `true` most of the time, as most things are objects. Try to
	 * use a different function to check the type, if applicable.
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is an object
	 */
	isObject: function ( o ) {
		return o instanceof Object;
	},

	/**
	 * Returns `true` if argument is a plain object, i.e an object created
	 * using `{}` or `new Object()`, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} obj The value to check
	 * @return {Boolean} Whether the value is a plain object
	 */
	isPlainObject: function ( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - After Effects objects
		if ( obj === undefined || obj === null ) {
			return false;
		}
		if ( obj.toString() !== '[object Object]' ) {
			return false;
		}

		if ( obj.constructor &&
				!obj.constructor.prototype.hasOwnProperty( 'isPrototypeOf' ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	/**
	 * Returns `true` if argument is an array, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is an array
	 */
	isArray: function ( o ) {
		return o instanceof Array;
	},

	/**
	 * Returns `true` if the passed array is empty, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Array} o The array to check
	 * @return {Boolean} Whether the array is empty
	 */
	isEmpty: function ( o ) {
		return o.length === undefined || o.length === 0;
	},

	/**
	 * Returns `true` if argument is a function, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a function
	 */
	isFunc: function ( o ) {
		return o instanceof Function;
	},

	/**
	 * ???
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} [description]
	 */
	isAeq: function ( o ) {
		return o instanceof Object && o.isAeq === true;
	},

	/**
	 * Returns `true` if argument is the Application object, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is the Application object
	 */
	isApp: function ( o ) {
		return o instanceof Application;
	},

	/**
	 * Returns `true` if argument is a Folder object, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a folder
	 */
	isFolder: function ( o ) {
		return o instanceof Folder;
	},

	/**
	 * Returns `true` if argument is a File object, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a File
	 */
	isFile: function ( o ) {
		return o instanceof File;
	},

	/**
	 * Returns `true` if argument is a FolderItem, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a FolderItem
	 */
	isFolderItem: function ( o ) {
		return o instanceof FolderItem;
	},

	/**
	 * Returns `true` if argument is a FootageItem, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a FootageItem
	 */
	isFootageItem: function ( o ) {
		return o instanceof FootageItem;
	},

	/**
	 * Returns `true` if argument is a Compitem, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a Compitem
	 */
	isComp: function ( o ) {
		return o instanceof CompItem;
	},

	/**
	 * Returns `true` if argument is an AVLayer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is an AVLayer
	 */
	isAVLayer: function ( o ) {
		return o instanceof AVLayer;
	},

	/**
	 * Returns `true` if argument is a ShapeLayer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a ShapeLayer
	 */
	isShapeLayer: function ( o ) {
		return o instanceof ShapeLayer;
	},

	/**
	 * Returns `true` if argument is a TextLayer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a TextLayer
	 */
	isTextLayer: function ( o ) {
		return o instanceof TextLayer;
	},

	/**
	 * Returns `true` if argument is a CameraLayer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a CameraLayer
	 */
	isCameraLayer: function ( o ) {
		return o instanceof CameraLayer;
	},

	/**
	 * Returns `true` if argument is a LightLayer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a LightLayer
	 */
	isLightLayer: function ( o ) {
		return o instanceof LightLayer;
	},

	/**
	 * Returns `true` if a layer is a precomp, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Layer} o The layer to check
	 * @return {Boolean} Whether the layer is a precomp
	 */
	isPrecomp: function ( o ) {
		if ( !aeq.isLayer( o ) ) return false;
		return aeq.isComp( o.source );
	},

	/**
	 * Returns `true` if argument is any kind of layer, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a layer
	 */
	isLayer: function ( o ) {
		return aeq.isAVLayer( o ) ||
			aeq.isShapeLayer( o ) ||
			aeq.isTextLayer( o ) ||
			aeq.isCamera( o ) ||
			aeq.isLight( o );
	},

	/**
	 * Returns `true` if argument is a Property, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a Property
	 */
	isProperty: function ( o ) {
		return o instanceof Property;
	},

	/**
	 * Returns `true` if argument is a PropertyGroup, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a PropertyGroup
	 */
	isPropertyGroup: function ( o ) {
		return o instanceof PropertyGroup;
	},

	/**
	 * Returns `true` if argument is a MaskPropertyGroup, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a MaskPropertyGroup
	 */
	isMaskPropertyGroup: function ( o ) {
		return o instanceof MaskPropertyGroup;
	},

	/**
	 * Returns `true` if argument is a Panel object, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a Panel
	 */
	isPanel: function ( o ) {
		return o instanceof Panel;
	},

	/**
	 * Returns `true` if argument is a Window object, `false` otherwise
	 * @function
	 * @memberof aeq
	 * @param  {Any} o   The value to check
	 * @return {Boolean} Whether the value is a Window
	 */
	isWindow: function ( o ) {
		return o instanceof Window;
	},

	/**
	 * ???
	 * @function
	 * @memberof aeq
	 * @param  {Object} obj The object
	 * @return {String}     [description]
	 */
	reflect: function ( obj ) {
		var str = [];

		for ( var m in obj ) {
			if ( obj.hasOwnProperty( m ) ) {
				str.push( obj[m].constructor.name + ' ' + m + '=' + obj[m] );
			}
		}

		return str.join();
	}
});

// Function Aliases

/**
 * @see aeq.isBoolean
 * @function
 */
aeq.isBool = aeq.isBoolean;

/**
 * @see aeq.isNumber
 * @function
 */
aeq.isNum = aeq.isNumber;

/**
 * @see aeq.isString
 * @function
 */
aeq.isStr = aeq.isString;

/**
 * @see aeq.isObject
 * @function
 */
aeq.isObj = aeq.isObject;

/**
 * @see aeq.isArray
 * @function
 */
aeq.isArr = aeq.isArray;

/**
 * @see aeq.isFunc
 * @function
 */
aeq.isFunction = aeq.isFunc;

/**
 * @see aeq.isComp
 * @function
 */
aeq.isComposition = aeq.isComp;

/**
 * @see aeq.isProperty
 * @function
 */
aeq.isProp = aeq.isProperty;

/**
 * @see aeq.isFolder
 * @function
 */
aeq.isDir = aeq.isDirectory = aeq.isFolder;

/**
 * @see aeq.isCameraLayer
 * @function
 */
aeq.isCamera = aeq.isCameraLayer;

/**
 * @see aeq.isLightLayer
 * @function
 */
aeq.isLight = aeq.isLightLayer;

return aeq;
}( aeq || {}) );
