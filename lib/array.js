/*jslint browser: true*/

var aeq = (function (my) {
	'use strict';

	my.arrayEx = function (arr)
	{
		arr = arr || [];

		if (arr._init)
			return arr;

		arr._init = true;

		arr.forEach = function (callback) {
			var len = arr.length;

			for(var i=0; i < len; i++)
				callback(arr[i], i, arr);
		};

		arr.exists = function (callback) {
			var len = arr.length;

			for (var i=0; i < len; i++)
			{
				if (callback(arr[i], i, arr))
					return true;
			}

			return false;
		};

		arr.isTrueForAll = function (callback) {
			var len = arr.length;

			for (var i=0; i < len; i++)
			{
				if (!callback(arr[i], i, arr))
					return false;
			}

			return true;
		};

		arr.first = function () {
			if (arr.length === 0)
				throw new Error('There are no items in this array');

			return arr[0];
		};

		arr.find = function (callback, def) {
			var len = arr.length;

			for (var i=0; i < len; i++)
			{
				if (callback(arr[i], i, arr))
					return arr[i];
			}

			return def;
		};

		arr.filter = function (callback) {
			var filteredArr = [];
			var len = arr.length;

			for(var i=0; i < len; i++)
			{
				if (callback(arr[i], i, arr))
					filteredArr.push(arr[i]);
			}

			return aeq.arrayEx(filteredArr);
		};

		arr.select = function (callback) {
			var selectedArr = [];
			var len = arr.length;

			for(var i=0; i < len; i++)
				selectedArr.push(callback(arr[i], i, arr));

			return aeq.arrayEx(selectedArr);
		};

		arr.map = function (callback) {
			var obj = {};
			var len = arr.length;

			for(var i=0; i < len; i++)
			{
				var o = callback(arr[i], i, arr);
				obj[o.key] = o.value;
			}

			return obj;
		};

		arr.insertAt = function (insert, index) {
			arr.splice(index, 0, insert);
		};

		return arr;
	};

	return my;
}(aeq));
