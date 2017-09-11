var aeq = ( function ( aeq ) {
/**
 * Converts a Layer into an aeq.Layer object
 * @memberof aeq
 * @class
 * @param  {Layer} layer Layer to turn into aeq.Layer object
 * @return {aeq.Layer} aeq.Layer object of Layer
 */
aeq.Layer = function ( layer ) {
	if ( layer instanceof aeq.Layer ) {
		return layer;
	}

	// Check if function called with "new" keyword
	if ( this instanceof aeq.Layer ) {
		this.layer = layer;
	} else {
		return new aeq.Layer( layer );
	}
};

aeq.Layer.prototype = {
	isAeq: true,

	toString: function () {
		return '[object aeq.Layer]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Get the original object
	 * @method
	 * @instance
	 * @return {Layer}
	 */
	get: function () {
		return this.layer;
	},

	/**
	 * Gets or sets layer parent
	 * @method
	 * @instance
	 * @param  {aeq.SelectorString|null} [selector] Selector for new parent, or null to remove parent
	 * @return {Layer|null} Parent layer, or null if none
	 */
	parent: function ( selector ) {
		if ( arguments.length === 0 ) {
			return this.layer.parent;
		}

		// Pass in null to remove the parent
		if ( selector === null ) {
			this.layer.parent = null;
			return null;
		}

		var layer = getLayer( this.layer, selector );

		if ( layer === null ) {
			return null;
		}
		this.layer.parent = layer;
		return layer;
	},

	/**
	 * Copies current layer to comp
	 * @method
	 * @instance
	 * @param  {CompItem|aeq.Comp} comp Comp to copy layer to
	 * @return {aeq.Layer}              Newly copied layer
	 */
	copyToComp: function ( comp ) {
		if ( !aeq.isComp( comp ) ) {
			if ( comp instanceof aeq.Comp ) {
				comp = comp.comp;
			} else if ( aeq.isString( comp ) ) {
				comp = aeq.getComp( comp );
			}
		}
		this.layer.copyToComp( comp );
		return this;
	},

	/**
	 * Removes this layer's parent
	 * @method
	 * @instance
	 * @return {aeq.Layer} This layer
	 */
	removeParent: function () {
		this.layer.parent = null;
		return this;
	},

	/**
	 * Executes a callback function on each effect on this layer
	 * @method
	 * @instance
	 * @param  {Function} callback Function to run on each effect
	 * @return {aeq.Layer}         This layer
	 */
	forEachEffect: function ( callback ) {
		var effects = this.layer.property( 'ADBE Effect Parade' ),
			length = effects.numProperties,
i = 1;

		for ( ; i <= length; i++ ) {
			callback( effects.property( i ), i, effects );
		}
		return this;
	},

	/**
	 * Adds effect to layer by name or matchname
	 * @method
	 * @instance
	 * @param  {string} effectName Effect name or matchname to add to layer
	 */
	addEffect: function ( effectName ) {
		var effects = this.layer.property( 'ADBE Effect Parade' );
		if ( effects.canAddProperty( effectName ) ) {
			effects.addProperty( effectName );
		} else {
			throw new Error( 'Can not add effect "' + effectName + '" to this layer' );
		}
	},

	/**
	 * Gets all layers that has the given layer as its parent.
	 * @method
	 * @instance
	 * @return {Layer[]} Children of this layer
	 */
	children: function () {
		return aeq.layer.children( this.layer );
	},

	/**
	 * Gets all layers that has the given layer as its parent, and all layers
	 * that has those layers, and so on.
	 * @method
	 * @instance
	 * @return {Layer[]} Children and decendants of this layer
	 */
	allChildren: function () {
		return aeq.layer.allChildren( this.layer );
	},

	/**
	 * This layer's parent chain
	 * @method
	 * @instance
	 * @return {Layer[]} Parents of this layer
	 */
	parents: function () {
		return aeq.layer.parents( this.layer );
	},

	/**
	 * All [parents]{@link aeq.layer.parents} and
	 * [all children]{@link aeq.layer.allChildren} of the this layer.
	 * @method
	 * @instance
	 * @return {Layer[]} The layer's parents and children.
	 */
	relatedLayers: function () {
		return aeq.layer.relatedLayers( this.layer );
	}
};

// Create methods that only returns the value for attributes that are read-
// only and can change over time;
aeq.forEach( [
	'active',
	'index',
	'isNameSet',
	'selectedProperties',
	'time',
	'containingComp',
	'hasVideo'
], function ( attribute ) {
	aeq.Layer.prototype[attribute] = function () {
		return this.layer[attribute];
	};
});

// Create methods for attributes that are basic read/write
aeq.forEach( [
	'comment',
	'enabled',
	'inPoint',
	'locked',
	'name',
	'outPoint',
	'shy',
	'solo',
	'startTime',
	'stretch'
], function ( attribute ) {
	aeq.Layer.prototype[attribute] = function ( newValue ) {
		if ( arguments.length === 0 ) {
			return this.layer[attribute];
		}
		this.layer[attribute] = newValue;

		// Return the aeq.Layer object for chaining methods
		return this;
	};
});

// Create Methods that just call the layer object methods
aeq.forEach( [
	'activeAtTime',
	'applyPreset',
	'duplicate',
	'remove',
	'moveToBeginning',
	'moveToEnd'
], function ( method ) {
	aeq.Layer.prototype[method] = function ( newValue ) {
		this.layer[method]( newValue );

		// Return the aeq.Layer object for chaining methods
		return this;
	};
});

// Create methods that can take a Layer, aeq.Layer, number or string as input
// and need to pass that to a method that takes a Layer object
aeq.forEach( [
	'setParentWithJump',
	'moveAfter',
	'moveBefore'
], function ( method ) {
	aeq.Layer.prototype[method] = function ( selector ) {
		var layer = getLayer( this.layer, selector );

		if ( layer === null ) {
			return null;
		}
		this.layer[method]( layer );
		return layer;
	};
});


// Used in aeq.Layer.parent, setParentWithJump and move methods
var regexRelativeIndex = /^(\+|-)=/;

/* The selector argument can be one of the following:
 * An aeq.Layer object
 * A Layer object
 * An index for a layer in the comp
 * A string with a layer name
 * A string starting with "+=" or "-=" then a number to indicate an index
 * relative to the current layer
 */
function getLayer( baseLayer, selector ) {
	var index, offset;

	// Set the value
	if ( selector instanceof aeq.Layer ) {
		return selector.layer;
	}
	if ( aeq.isLayer( selector ) ) {
		return selector;
	}

	// Set parent to layer with index
	if ( aeq.isNumber( selector ) ) {
		return baseLayer.containingComp.layer( selector );
	}

	// Set parent to layer with name or with a relative index
	if ( aeq.isString( selector ) ) {
		// Check if string starts with "+=" or "-="
		if ( regexRelativeIndex.test( selector ) ) {
			offset = getRelativeIndex( selector );
			if ( offset ) {
				// Set parent to layer with index relative to this layer
				index = baseLayer.index + offset;

				// Return null if index is out of range
				if ( index === 0 || index > baseLayer.containingComp.numLayers ) {
					return null;
				}
				return baseLayer.containingComp.layer( index );
			}
		}

		// Use the string as a name if it does not start with += or -= or if the
		// rest of the string is not a valid number
		return baseLayer.containingComp.layer( selector );
	}

	// If none of the above is true it should return null
	return null;
}

function getRelativeIndex( str ) {
	var offset = str.charAt( 0 ) + str.substr( 2 );
	offset = parseInt( offset, 10 );
	if ( isNaN( offset ) ) {
		return false;
	}
	return offset;
}


return aeq;
}( aeq || {}) );
