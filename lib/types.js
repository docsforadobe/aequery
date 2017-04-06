aeq = (function (aeq) {
aeq.extend({
	isNullOrUndefined: function(o) {
		return o === null || o === undefined;
	},

	isBoolean: function(o) {
		return typeof o === "boolean";
	},
	isNumber: function(o) {
		return typeof o === "number";
	},
	isString: function(o) {
		return typeof o === "string";
	},
	isObject: function(o) {
		return o instanceof Object;
	},
	isPlainObject: function(obj) {

		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - After Effects objects

		if ( obj.toString() !== "[object Object]" ) {
			return false;
		}

		if ( obj.constructor &&
				!obj.constructor.prototype.hasOwnProperty("isPrototypeOf") ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isArray: function(o) {
		return o instanceof Array;
	},
	isFunc: function(o) {
		return o instanceof Function;
	},
	isAeq: function(o) {
		return o instanceof Object && o.isAeq === true;
	},

	isApp: function(o) {
		return o instanceof Application;
	},
	isFolder: function(o) {
		return o instanceof Folder;
	},
	isFile: function(o) {
		return o instanceof File;
	},
	
	isFolderItem: function(o) {
		return o instanceof FolderItem;
	},
	isFootageItem: function(o) {
		return o instanceof FootageItem;
	},
	isComp: function(o) {
		return o instanceof CompItem;
	},
	isAVLayer: function(o) {
		return o instanceof AVLayer;
	},
	isShapeLayer: function(o) {
		return o instanceof ShapeLayer;
	},
	isTextLayer: function(o) {
		return o instanceof TextLayer;
	},
	isCameraLayer: function(o) {
		return o instanceof CameraLayer;
	},
	isLightLayer: function(o) {
		return o instanceof LightLayer;
	},
	isPrecomp: function(o) {
	    if (!aeq.isLayer(o)) return false;
		return aeq.isComp(o.source);
	},
	isLayer: function(o) {
		return aeq.isAVLayer(o) ||
			aeq.isShapeLayer(o) ||
			aeq.isTextLayer(o) ||
			aeq.isCamera(o) ||
			aeq.isLight(o);
	},
	
	isProperty: function(o) {
		return o instanceof Property;
	},
	isPropertyGroup: function(o) {
		return o instanceof PropertyGroup;
	},
	
	isPanel: function(o) {
		return o instanceof Panel;
	},
	isWindow: function(o) {
		return o instanceof Window;
	},

	reflect: function (obj) {
		var str = [];

		for (var m in obj) {
			if (obj.hasOwnProperty(m)) {
				str.push(obj[m].constructor.name + ' ' + m + '=' + obj[m]);
			}
		}

		return str.join();
	}
});

// Function Aliases
aeq.isBool = aeq.isBoolean;
aeq.isNum = aeq.isNumber;
aeq.isStr = aeq.isString;
aeq.isObj = aeq.isObject;
aeq.isArr = aeq.isArray;
aeq.isFunction = aeq.isFunc;
aeq.isComposition = aeq.isComp;
aeq.isProp = aeq.isProperty;
aeq.isDir = aeq.isDirectory = aeq.isFolder;
aeq.isCamera = aeq.isCameraLayer;
aeq.isLight = aeq.isLightLayer;

return aeq;
}(aeq || {}));
