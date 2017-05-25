/*jslint browser: true*/

/**
 * @namespace aeq
 */

/**
 * @namespace aeq
 * @variation 1
 * @method
 * @param  {Any} selector
 * @param  {Any} context
 * @return {Any}
 */
var aeq = function(selector, context) {
	'use strict';

	if (aeq.isNullOrUndefined(selector))
		return selector;

	var result;

	if (aeq.isAeq(selector))
	{
		result = selector;
	}
	else if (aeq.isString(selector))
	{
		result = aeq.select(selector, context);
	}
	else if (aeq.isArray(selector))
	{
		result = aeq.arrayEx(selector);
	}
	else if (aeq.isApp(selector))
	{
		result = aeq.app;
	}
	else if (aeq.isComp(selector))
	{
		result = new aeq.Comp(selector);
	}
	else if (aeq.isLayer(selector))
	{
		result = new aeq.Layer(selector);
	}
	else if (aeq.isProperty(selector))
	{
		result = new aeq.Property(selector);
	}

	result.aeq = true;

	return result;
};

aeq.thisObj = this;

if ( typeof module === 'object' ) {
	module.exports = aeq;
}

// Copy of jQuery.extend
aeq.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = setDefault(arguments[0], {}),
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = setDefault(arguments[ i ], {});
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !aeq.isFunction( target ) ) {
		target = {};
	}

	// Extend aeq itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) !== null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( aeq.isPlainObject( copy ) ||
					( copyIsArray = aeq.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && aeq.isArray( src ) ? src : [];

					} else {
						clone = src && aeq.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = aeq.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

/**
 * Is executed for each element in an array
 * @callback forEachArrayCallback
 * @param {Any}     element The current element in the array
 * @param {Integer} index   The index of the current element in the array
 * @param {Array}   array   The array being looped through
 */

 /**
  * Is executed for key-value pair in an object
  * @callback forEachObjectCallback
  * @param {Any}     element The current key in the object
  * @param {Integer} index   The value of the current key
  * @param {Array}   array   The object being looped through
  */

/**
 * Loops through arrays and objects
 * @memberof! aeq
 * @function
 * @param  {Array|Object}   obj       [description]
 * @param  {forEachArrayCallback|forEachObjectCallback} callback  [description]
 * @return {Array|Object}             [description]
 */
aeq.forEach = function(obj, callback, fromIndex) {
	var length, i;
	if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
		length = obj.length;
		i = fromIndex !== undefined ? fromIndex : 0;
		for (; i < length; i++) {
			if (callback(obj[i], i, obj) === false) {
				break;
			}
		}
	} else {
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (callback(i, obj[i], obj) === false) {
					break;
				}
			}
		}
	}
	return obj;
};

/**
 * Loops through arrays and objects and returned a filtered array
 * @memberof! aeq
 * @function
 * @param  {Array|Object}   obj       The object to loop through
 * @param  {forEachArrayCallback|forEachObjectCallback} callback  The function
 *         to execute for each element in the object
 * @return {Array|Object}             [description]
 */
aeq.filter = function (obj, callback) {
	var filteredArr = [],
		length, i;
	if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
		length = obj.length;
		i = 0;
		for (; i < length; i++) {
			if (callback(obj[i], i, obj)) {
				filteredArr.push(obj[i]);
			}
		}
	} else {
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				if (callback(i, obj[i], obj)) {
					filteredArr.push(obj[i]);
				}
			}
		}
	}
	return filteredArr;
};

aeq.setDefault = function (value, defaultVal) {
	return typeof value == "undefined" ? defaultVal : value;
};

var setDefault = aeq.setDefault;
