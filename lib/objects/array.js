/* jslint browser: true */

var aeq = ( function ( aeq ) {
/**
 * Array with some extensions that mimics modern JavaScript.
 * @memberof aeq
 * @class
 * @param  {Array} arr The array object to extend. If not supplied, an empty
 *                     arrayEx will be returned.
 */
aeq.arrayEx = function ( arr ) {
	arr = setDefault( arr, [] );

	if ( arr._init ) {
return arr;
}

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

	aeq.extend( arr, arrayEx );
	return arr;
};

var arrayEx = {

	/**
	 * Loops through the elements in the array and executes a function.
	 * @memberof aeq.arrayEx
	 * @method
	 * @param  {forEachArrayCallback} callback Function to execute for each element
	 */
	forEach: function ( callback ) {
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
callback( this[i], i, this );
}
	},

	/**
	 * Loops through the elements in the array and returns `true` if callback returns true for any element
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to execute for each element
	 * @return {boolean}           Whether the function returned true for any element
	 */
	some: function ( callback ) {
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
			if ( callback( this[i], i, this ) ) {
return true;
}
		}

		return false;
	},

	/**
	 * Loops through the elements in the array and returns `true` if callback returns true for all elements
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to execute for each element
	 * @return {boolean}           Whether the function returned true for ALL elements
	 */
	every: function ( callback ) {
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
			if ( !callback( this[i], i, this ) ) {
return false;
}
		}

		return true;
	},

	/**
	 * Gets first element in array
	 * @method
	 * @memberof aeq.arrayEx
	 * @return {any} First element in array
	 */
	first: function () {
		if ( this.length === 0 ) {
throw new Error( 'There are no items in this array' );
}

		return this[0];
	},

	/**
	 * Returns array element that triggers callback === true
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to execute for each element
	 * @param  {any}      [def]    Default element to return if target be found
	 * @return {any}               Array element that triggered callback, or default
	 */
	find: function ( callback, def ) {
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
			if ( callback( this[i], i, this ) ) {
return this[i];
}
		}

		return def;
	},

	/**
	 * Runs callback on each element, and returns a new arrayEx of elements that trigger callback === true
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to execute for each element
	 * @return {aeq.arrayEx}       ArrayEx of filtered elements
	 */
	filter: function ( callback ) {
		var filteredArr = [];
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
			if ( callback( this[i], i, this ) ) {
filteredArr.push( this[i] );
}
		}

		return aeq.arrayEx( filteredArr );
	},

	/**
	 * Returns index of searchElement in an array, or -1 if not found
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {any}    searchElement Element to find in arrayEx
	 * @param  {number} [fromIndex=0] Index to start searching from, or 0 if not passed
	 * @return {number}               `-1` if element is not found, else index number
	 */
	indexOf: function ( searchElement, fromIndex ) {
		var k;

		// 1. Let o be the result of calling ToObject passing
		//    the this value as the argument.
		if ( this === null ) {
			throw new TypeError( '"this" is null or not defined' );
		}

		var o = Object( this );

		// 2. Let lenValue be the result of calling the Get
		//    internal method of o with the argument "length".
		// 3. Let len be ToUint32(lenValue).
		var len = o.length >>> 0;

		// 4. If len is 0, return -1.
		if ( len === 0 ) {
			return -1;
		}

		// 5. If argument fromIndex was passed let n be
		//    ToInteger(fromIndex); else let n be 0.
		var n = +fromIndex || 0;

		if ( Math.abs( n ) === Infinity ) {
			n = 0;
		}

		// 6. If n >= len, return -1.
		if ( n >= len ) {
			return -1;
		}

		// 7. If n >= 0, then Let k be n.
		// 8. Else, n<0, Let k be len - abs(n).
		//    If k is less than 0, then let k be 0.
		k = Math.max( n >= 0 ? n : len - Math.abs( n ), 0 );

		// 9. Repeat, while k < len
		while ( k < len ) {
			// A. Let Pk be ToString(k).
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
			if ( k in o && o[k] === searchElement ) {
				return k;
			}
			k++;
		}
		return -1;
	},

	/**
	 * Creates a new array with the results of calling a provided function on every element in the calling array
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to execute for each element
	 * @return {aeq.arrayEx}       A new array with each element being the result of the callback function
	 * @see [Array.prototype.map()]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map/} for more info
	 */
	map: function ( callback ) {
		var selectedArr = [];
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
selectedArr.push( callback( this[i], i, this ) );
}

		return aeq.arrayEx( selectedArr );
	},

	/**
	 * Groups an array by some condition as determined by each element
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {Function} callback Function to determine the key to group by
	 * @return {object}            An object whose keys are the result of callback and each value is an array of elements matching key
	 */
	groupBy: function ( callback ) {
		var obj = {};
		var len = this.length;

		for ( var i = 0; i < len; i++ ) {
		    var key = callback( this[i], i, this ) || 'undefined';
		    var arr = obj[key] || [];

		    arr.push( o );

		    obj[key.toString()] = arr;
		}

		return obj;
	},

	/**
	 * Inserts an element into arrayEx at specified index
	 * @method
	 * @memberof aeq.arrayEx
	 * @param  {any}    insert Element to insert
	 * @param  {number} index  Index to insert element at
	 */
	insertAt: function ( insert, index ) {
		this.splice( index, 0, insert );
	},

	/**
	 * Sets or gets an attribute value for all objects in the array. When getting a
	 * value, it only returns the valure from the first object.
	 * @method
	 * @memberof aeq.arrayEx
	 * @param {string} attributeName  The name of the attribute to get or set.
	 * @param  {Any}    [newValue]    The value to set. If not given, will only get
	 *                                the value of the first object.
	 * @return {Any}                  when getting, the value of the attribute.
	 *                                When setting, `undefined`.
	 * @see aeq.attr
	 */
	attr: function () {
		// Add this array object to the beginning of arguments
		[].unshift.call( arguments, this );
		return aeq.attr.apply( this, arguments );
	}
};

return aeq;
}( aeq || {}) );
