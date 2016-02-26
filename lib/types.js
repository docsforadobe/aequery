aeq = (function (aeq) {
aeq.isNullOrUndefined = function(o) { return o === null || o === undefined; };

aeq.isBoolean = function(o) { return typeof o === "boolean"; }
aeq.isNumber  = function(o) { return typeof o === "number"; }
aeq.isString  = function(o) { return typeof o === "string"; }
aeq.isObject  = function(o) { return o instanceof Object; }
aeq.isPlainObject =  function( obj ) {

	// Not plain objects:
	// - Any object or value whose internal [[Class]] property is not "[object Object]"
	// - After Effects objects

	if ( obj.toString() !== "[object Object]" || obj.nodeType ) {
		return false;
	}

	if ( obj.constructor &&
			!obj.constructor.prototype.hasOwnProperty("isPrototypeOf") ) {
		return false;
	}

	// If the function hasn't returned already, we're confident that
	// |obj| is a plain object, created by {} or constructed with new Object
	return true;
};
aeq.isArray   = function(o) { return o instanceof Array; }
aeq.isFunc    = function(o) { return o instanceof Function; }
aeq.isAeq     = function(o) { return o instanceof Object && o.aeq; }

aeq.isApp      = function(o) { return o instanceof Application; }
aeq.isComp     = function(o) { return o instanceof CompItem; }
aeq.isAVLayer    = function(o) { return o instanceof AVLayer; }
aeq.isProperty = function(o) { return o instanceof Property; }


aeq.reflect = function (obj) {
	var str = [];

	for (var m in obj)
	{
		if (!obj.hasOwnProperty(m))
			return;

		str.push(obj[m].constructor.name + ' ' + m + '=' + obj[m]);
	}

	return str.join();
}

return aeq;
}(aeq || {}));
