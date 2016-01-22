(function (my) {
	'use strict';

	my.isNullOrUndefined = function(o) { return o === null || o === undefined; }

	my.isBoolean = function(o) { return typeof o === 'boolean'; }
	my.isNumber  = function(o) { return typeof o === 'number'; }
	my.isString  = function(o) { return typeof o === 'string'; }
	my.isObject  = function(o) { return typeof o === 'object'; }
	my.isArray   = function(o) { return typeof o === 'object' && 'length' in o; }
	my.isFunc    = function(o) { return typeof o === 'function'; }

	my.isApp      = function(o) { return typeof o === app; }
	my.isComp     = function(o) { return o instanceof CompItem; }
	my.isLayer    = function(o) { return o instanceof LayerItem; }
	my.isProperty = function(o) { return o instanceof PropertyItem; }

	return my;
}(aeq));
 