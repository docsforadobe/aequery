/*jslint browser: true*/

var aeq = (function (aeq) {

/**
 * Array with some extensions that mimics modern JavaScript.
 * @memberof aeq
 * @class
 * @param  {Array} arr The array object to extend. If not supplied, an empty
 *                     arrayEx will be returned.
 */
aeq.arrayEx = function (arr)
{
	arr = setDefault(arr, []);

	if (arr._init)
		return arr;

	/**
	 * Used to check if array is already extended.
	 * @memberof aeq.arrayEx
	 * @private
	 * @type {Boolean}
	 * @default
	 */
	arr._init = true;

	/**
	 * @memberof aeq.arrayEx
	 * @private
	 * @type {Boolean}
	 * @default
	 */
	arr.isAeq = true;

	aeq.extend(arr, arrayEx);
	return arr;
};

var arrayEx = {

	/**
	 * Loops through the elements in the array an executes a function.
	 * @memberof aeq.arrayEx
	 * @method
	 * @param  {forEachArrayCallback} callback Function to execute for each element
	 */
	forEach: function (callback) {
		var len = this.length;

		for(var i=0; i < len; i++)
			callback(this[i], i, this);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @return {type}            [description]
	 */
	exists: function (callback) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				return true;
		}

		return false;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @return {type}            [description]
	 */
	isTrueForAll: function (callback) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (!callback(this[i], i, this))
				return false;
		}

		return true;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @return {type} [description]
	 */
	first: function () {
		if (this.length === 0)
			throw new Error('There are no items in this array');

		return this[0];
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @param  {type}   def      [description]
	 * @return {type}            [description]
	 */
	find: function (callback, def) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				return this[i];
		}

		return def;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @return {type}            [description]
	 */
	filter: function (callback) {
		var filteredArr = [];
		var len = this.length;

		for(var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				filteredArr.push(this[i]);
		}

		return aeq.arrayEx(filteredArr);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {type} searchElement [description]
	 * @param  {type} fromIndex     [description]
	 * @return {type}               [description]
	 */
	indexOf: function(searchElement, fromIndex) {
		var k;

		// 1. Let o be the result of calling ToObject passing
		//    the this value as the argument.
		if (this === null) {
			throw new TypeError('"this" is null or not defined');
		}

		var o = Object(this);

		// 2. Let lenValue be the result of calling the Get
		//    internal method of o with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = o.length >>> 0;

		// 4. If len is 0, return -1.
		if (len === 0) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if (Math.abs(n) === Infinity) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if (n >= len) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

		// 9. Repeat, while k < len
		while (k < len) {
			// a. Let Pk be ToString(k).
			//   This is implicit for LHS operands of the in operator
			// b. Let kPresent be the result of calling the
			//    HasProperty internal method of o with argument Pk.
			//   This step can be combined with c
			// c. If kPresent is true, then
			//    i.  Let elementK be the result of calling the Get
			//        internal method of o with the argument ToString(k).
			//   ii.  Let same be the result of applying the
			//        Strict Equality Comparison Algorithm to
			//        searchElement and elementK.
			//  iii.  If same is true, return k.
			if (k in o && o[k] === searchElement) {
				return k;
			}
			k++;
		}
		return -1;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @return {type}            [description]
	 */
	select: function (callback) {
		var selectedArr = [];
		var len = this.length;

		for(var i=0; i < len; i++)
			selectedArr.push(callback(this[i], i, this));

		return aeq.arrayEx(selectedArr);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback [description]
	 * @return {type}            [description]
	 */
	map: function (callback) {
		var obj = {};
		var len = this.length;

		for(var i=0; i < len; i++)
		{
			var o = callback(this[i], i, this);
			obj[o.key] = o.value;
		}

		return obj;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {type} insert [description]
	 * @param  {type} index  [description]
	 * @return {type}        [description]
	 */
	insertAt: function (insert, index) {
		this.splice(index, 0, insert);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.arrayEx
	 * @return {type} [description]
	 * @see aeq.attr
	 */
	attr: function() {

		// aeq.attr checks the arguments length to determine to get or set
		// and it needs an object to get or set attributes to.

		// Add this array object to the beginning of arguments
		[].unshift.call(arguments, this);
		return aeq.attr.apply( this, arguments );
	}
};

return aeq;
}(aeq || {}));
