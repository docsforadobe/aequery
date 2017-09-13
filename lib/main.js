/* jslint browser: true */

/**
 * @namespace aeq
 */

/**
 * Gets objects by looking at a string and finding objects in After
 * Effects matching the description. The context is used to
 * determine a starting point for where the function starts looking
 * for elements.
 * If an `Array`, `CompItem`, `Layer`, or `Property` is given, the object will be
 * converted to the corresponding aequery object: `aeq.ArrayEx`, `aeq.Comp`,
 * `aeq.Layer`, `aeq.Property`.
 * @namespace aeq
 * @variation 1
 * @method
 * @param  {aeq.SelectorString|Array|CompItem|Layer|Property} selector A string containing
 *         a selector expression, or an object to be converted to aeq type object.
 * @param  {CompItem|FolderItem|Layer|PropertyGroup|Array} [context] The object
 *         to start looking from
 * @return {ArrayEx|aeq.Comp|aeq.Layer|aeq.Property} The found After Effects
 *         objects, or the converted AEQuery object
 */
var aeq = function ( selector, context ) {
	'use strict';

	if ( aeq.isNullOrUndefined( selector ) ) {
		return selector;
	}

	var result;

	if ( aeq.isAeq( selector ) ) {
		result = selector;
	} else if ( aeq.isString( selector ) ) {
		result = aeq.select( selector, context );
	} else if ( aeq.isArray( selector ) ) {
		result = aeq.arrayEx( selector );
	} else if ( aeq.isApp( selector ) ) {
		result = aeq.app;
	} else if ( aeq.isComp( selector ) ) {
		result = new aeq.Comp( selector );
	} else if ( aeq.isLayer( selector ) ) {
		result = new aeq.Layer( selector );
	} else if ( aeq.isProperty( selector ) ) {
		result = new aeq.Property( selector );
	}

	result.aeq = true;

	return result;
};

aeq.version = '0.4.0';

aeq.thisObj = this;


/* eslint-env commonjs */
if ( typeof module === 'object' ) {
	module.exports = aeq;
}

/**
 * Used for setting the default value in functions. Returns the first argument
 * is not undefined, else it returns `defaultVal`.
 * @method
 * @param  {Any} value      The value to check
 * @param  {Any} defaultVal The value to use if `value` is `undefined`
 * @return {Any}            `value` if it is not `undefined`, else `defaultVal`
 *
 * @example
 * function say( greeting ) {
 *     a = aeq.setDefault( greeting, 'Hello World!' )
 *     alert( a )
 * }
 */
aeq.setDefault = function ( value, defaultVal ) {
	return typeof value == 'undefined' ? defaultVal : value;
};

var setDefault = aeq.setDefault;

// Copy of jQuery.extend
/**
 * Merge the contents of two or more objects together into the first object.
 *
 * If only one object is given, the `aeq` object is assumed to be the target.
 *
 * @memberof aeq
 * @method
 * @return {Object} The merged object
 * @see [jQuery.extend]{@link https://api.jquery.com/jquery.extend/} for more
 *      information, this function uses the same api.
 * @example
 * var objectA = {
 *     test: "example"
 * };
 *
 * aeq.extend( objectA, {
 *     prop: "prop"
 * });
 *
 * // ObjectA is now
 * {
 *     test: "example",
 *     prop: "prop"
 * }
 */
aeq.extend = function () {
	var options, name, src, copy, copyIsArray, clone,
		target = setDefault( arguments[0], {}),
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === 'boolean' ) {
		deep = target;

		// Skip the boolean and the target
		target = setDefault( arguments[i], {});
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== 'object' && !aeq.isFunction( target ) ) {
		target = {};
	}

	// Extend aeq itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( ( options = arguments[i] ) !== null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( aeq.isPlainObject( copy ) ||
					( copyIsArray = aeq.isArray( copy ) ) ) ) {
					// eslint-disable-next-line
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && aeq.isArray( src ) ? src : [];
					} else {
						clone = src && aeq.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = aeq.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[name] = copy;
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
 * @memberof aeq
 * @function
 * @param  {Array|Object}   obj       The array or object to loop through.
 * @param  {forEachArrayCallback|forEachObjectCallback} callback
 *         Function to execute for each element in the object or array
 * @return {Array|Object}             The value of `obj`
 */
aeq.forEach = function ( obj, callback, fromIndex ) {
	var length, i;
	if ( obj && Object.prototype.toString.call( obj ) === '[object Array]' ) {
		length = obj.length;
		i = fromIndex === undefined ? 0 : fromIndex;
		for ( ; i < length; i++ ) {
			if ( callback( obj[i], i, obj ) === false ) {
				break;
			}
		}
	} else {
		for ( i in obj ) {
			if ( obj.hasOwnProperty( i ) ) {
				if ( callback( i, obj[i], obj ) === false ) {
					break;
				}
			}
		}
	}
	return obj;
};

/**
 * Loops through arrays and objects and returns a filtered array
 * @memberof aeq
 * @function
 * @param  {Array|Object}   obj       The Array/object to loop through
 * @param  {forEachArrayCallback|forEachObjectCallback} callback  The function
 *         to execute for each element in the object. Should return a truthy
 *         value if the element should be included in the returned array.
 * @return {Array} The filtered array
 */
aeq.filter = function ( obj, callback ) {
	var filteredArr = [],
		length, i;
	if ( obj && Object.prototype.toString.call( obj ) === '[object Array]' ) {
		length = obj.length;
		i = 0;
		for ( ; i < length; i++ ) {
			if ( callback( obj[i], i, obj ) ) {
				filteredArr.push( obj[i] );
			}
		}
	} else {
		for ( i in obj ) {
			if ( obj.hasOwnProperty( i ) ) {
				if ( callback( i, obj[i], obj ) ) {
					filteredArr.push( obj[i] );
				}
			}
		}
	}
	return filteredArr;
};
