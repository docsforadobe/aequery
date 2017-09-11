var aeq = ( function ( aeq ) {
/**
 * Sets or gets an attribute value for all objects in an array. When getting a
 * value, it only returns the valure from the first object.
 * @memberof aeq
 * @see aeq.arrayEx.attr
 * @method
 * @param  {Any[]}  array         The array of objects to get or set attribute
 *                                values of.
 * @param  {string} attributeName The name of the attribute to get or set.
 * @param  {Any}    [newValue]    The value to set. If not given, will only get
 *                                the value of the first object.
 * @return {Any|undefined}        When getting, the value of the attribute.
 *                                When setting, `undefined`.
 */
aeq.attr = function ( array, attributeName, newValue ) {
	var i, il;

	// Throw error if only array is given
	if ( arguments.length === 1 ) {
		throw new Error( 'Only one argument given to attr, must be 2 or 3' );

	// Get value of attributeName for first object in the array if only attributeName is given
	} else if ( arguments.length === 2 ) {
		if ( array[0] !== undefined && array[0] !== null ) {
			return getAttr( array[0], attributeName );
		}
		return undefined;

	// Set value of attributeName for all objects in array if newValue is given
	} else {
		for ( i = 0, il = array.length; i < il; i++ ) {
			setAttr( array[i], attributeName, newValue );
		}
		return array;
	}
};

function getAttr( object, attributeName ) {
	if ( object[attributeName] instanceof Function ) {
		return object[attributeName]();
	}
	return object[attributeName];
}

var attr = {
	setters: {
		'[object Property]': {
			value: 'setValue'
		}
	}
};

function setAttr( object, attributeName, newValue ) {
	var attrSetters, setter;

	// Check if there is a special setter for this object and attributeName
	attrSetters = attr.setters[object.toString()];
	if ( attrSetters !== undefined ) {
		setter = attrSetters[attributeName];
		if ( setter !== undefined ) {
			attributeName = setter;
		}
	}

	if ( object[attributeName] instanceof Function ) {
		object[attributeName]( newValue );
	} else {
		object[attributeName] = newValue;
	}
	return object;
}

return aeq;
}( aeq || {}) );
