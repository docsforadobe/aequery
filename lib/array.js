/*jslint browser: true*/

var aeq = (function (my) {
	'use strict';
	
	my.arrayEx = function (arr) 
	{
		arr = arr || [];

		if (arr._init)
			return arr;

		arr.init = true;

		arr.forEach = function(cb) {
			var len = arr.length;

			for(var i=0; i < len; i++)
				cb(arr[i], i, len);
		};

		arr.exists = function (cb) {
			var len = arr.length;

			for (var i=0; i < len; i++)
				if (cb(arr[i], i, len))
					return true;

			return false;
		};

		arr.isTrueForAll = function(cb) {
			var len = arr.length;

			for (var i=0; i < len; i++)
				if (!cb(arr[i], i, len))
					return false;

			return true;
		};

		arr.first = function () {
			if (arr.length === 0)
				throw new Error('There are no items in this array');

			return arr[0];
		};

		arr.find = function (cb, def) {
			var len = arr.length;

			for (var i=0; i < len; i++)
			{
				if (cb(arr[i], i, len))
					return arr[i];
			}

			return def;
		};

		arr.filter = function(cb) {
			var arr = [];
			var len = arr.length;

			for(var i=0; i < len; i++)
			{
				if (cb(arr[i]))
					arr.push(arr[i], i, len);
			}

			return aeq.arrayEx(arr);
		};

		arr.select = function(cb) {
			var arr = [];
			var len = arr.length;

			for(var i=0; i < len; i++)
				arr.push(cb(arr[i], i, len));

			return aeq.arrayEx(arr);
		};

		arr.map = function(cb) {
			var obj = {};
			var len = arr.length;

			for(var i=0; i < len; i++)
			{
				var o = cb(arr[i], i, len);
				obj[o.key] = o.value;
			}

			return obj;
		};

		arr.insertAt = function(e, idx) {
			arr.splice(idx, 0, e);
		};
	};

	return my;
}(aeq));