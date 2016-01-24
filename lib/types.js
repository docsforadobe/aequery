(function (my) {
	my.isNullOrUndefined = function(o) { return o === null || o === undefined; };

	my.isBoolean = function(o) { return typeof o === 'boolean'; };
	my.isNumber  = function(o) { return typeof o === 'number'; };
	my.isString  = function(o) { return typeof o === 'string'; };
	my.isObject  = function(o) { return typeof o === 'object'; };
	my.isArray   = function(o) { return typeof o === 'object' && 'length' in o; };
	my.isFunc    = function(o) { return typeof o === 'function'; };

	my.isBoolean = function(o) { return o instanceof Boolean; }
	my.isNumber  = function(o) { return o instanceof Number; }
	my.isString  = function(o) { return o instanceof String; }
	my.isObject  = function(o) { return o instanceof Object; }
	my.isArray   = function(o) { return o instanceof Array; }
	my.isFunc    = function(o) { return o instanceof Function; }

	my.isAeq     = function(o) { return o instanceof Object && o.aeq; }

	my.isApp      = function(o) { return o instanceof Application; }
	my.isComp     = function(o) { return o instanceof CompItem; }
	my.isLayer    = function(o) { return o instanceof LayerItem; }
	my.isProperty = function(o) { return o instanceof PropertyItem; }


	my.reflect = function (obj) {
		var str = [];

		for (var m in obj)
		{
			if (!obj.hasOwnProperty(m))
				return;

			str.push(obj[m].constructor.name + ' ' + m + '=' + obj[m]);
		}

		return str.join();
	}

	return my;
}(aeq));
