var aeq = ( function ( aeq ) {
/**
 * Converts a Key into an aeq.Key object
 * @memberof aeq
 * @class
 * @param  {Property} property Property to find key on
 * @param  {number}   index    The index of the key
 * @return {aeq.Key}           aeq.Key object
 */
aeq.Key = function ( property, index ) {
	if ( this instanceof aeq.Key ) {
		if ( property instanceof aeq.Property ) {
			property = property.get();
		}

		// Check if index is valid
		if ( index <= 0 || index > property.numKeys ) {
			throw new Error( 'Index ' + index + ' out of range 1-' + property.numKeys );
		}

		this.property = property;
		this.index = index;
		this.originalTime = this.getTime();
	} else {
		return new aeq.Key( property, index );
	}
};

aeq.Key.prototype = {
	isAeq: true,

	toString: function () {
		return '[object aeq.Key]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	// Used to check if the key index is the correct for refrensing
	// TODO: consider not checking this in every function or find better way to do this
	checkKey: function () {
		// Check if index is in range and that key at that index is at correct time
		if ( this.index <= this.property.numKeys && this.getTime() === this.originalTime ) {
			return; // If it is, then the index is still correct
		}

		// Get the keyIndex nearest to the keyTime
		var newIndex = this.property.nearestKeyIndex( this.originalTime );

		// The time of the nearest keyIndex could be something else if the original key
		// was deleted, so we need to check it
		if ( this.property.keyTime( newIndex ) === this.originalTime ) {
			this.index = newIndex;
		} else {
			throw new Error( 'Original key has been deleted/moved' );
		}
	},

	// Need two time functions because `this.time` relies on checkKey
	/**
	 * Gets comp time of current key
	 * @instance
	 * @method
	 * @return {number} Key time of current key, in seconds
	 */
	getTime: function () {
		return this.property.keyTime( this.index );
	},

	/**
	 * Interpolation type object
	 * @typedef  {object} InterpolationType
	 * @property {KeyframeInterpolationType} inType  Interpolation for keyIn
	 * @property {KeyframeInterpolationType} outType Interpolation for keyOut
	 */

	/**
	 * @typedef {object} KeyframeInterpolationType
	 * @property {number} LINEAR
	 * @property {number} BEZIER
	 * @property {number} HOLD
	 */

	/**
	 * Gets or sets interpolation type of current key
	 * @method
	 * @instance
	 * @param  {KeyframeInterpolationType} [inType]  In KeyframeInterpolationType
	 * enumerated value to set
	 * @param  {KeyframeInterpolationType} [outType] Out KeyframeInterpolationType
	 * enumerated value to set
	 * @return {InterpolationType|boolean}         Object of In/Out Interp types,
	 * or true/false if can/can't set type
	 */
	interpolationType: function ( inType, outType ) {
		this.checkKey();

		// Return current value if no arguments
		if ( arguments.length === 0 ) {
			return {
				inType: this.property.keyInInterpolationType( this.index ),
				outType: this.property.keyOutInterpolationType( this.index )
			};
		}

		// If arguments, set new value

		// Check if arguments is a value returned from this function
		if ( outType === undefined && inType.outType ) {
			outType = inType.outType;
		}
		if ( inType.inType ) {
			inType = inType.inType;
		}

		// Use strings as a shorthand for KeyframeInterpolationType.TYPE
		if ( aeq.isString( inType ) ) {
			inType = KeyframeInterpolationType[inType];
		}

		if ( outType && aeq.isString( outType ) ) {
			outType = KeyframeInterpolationType[outType];

			// If outType is not defined the inType is used (standard behaviour)
		} else if ( outType === undefined ) {
			outType = inType;
		}

		// Check that the value is valid
		// TODO: should this be skipped and just throw error?
		if ( !this.property.isInterpolationTypeValid( inType ) ||
			( outType && !this.property.isInterpolationTypeValid( outType ) ) ) {
			return false;
		}

		this.property.setInterpolationTypeAtKey( this.index, inType, outType );
		return true;
	},

	/**
	 * SpatialTangent type object
	 * @typedef  {object} SpatialTangent
	 * @property {KeyframeSpatialTangent} inTangent  Tangent for keyIn
	 * @property {KeyframeSpatialTangent} outTangent Tangent for keyOut
	 */

	/**
	 * @typedef {number[]} KeyframeSpatialTangent
	 * @property {number} xSpatialTangent
	 * @property {number} ySpatialTangent
	 * @property {number} [zSpatialTangent]
	 */

	/**
	 * Gets or sets in/out spatial tangents of current key
	 * @method
	 * @instance
	 * @param  {KeyframeSpatialTangent} [inType]  In KeyframeSpatialTangent enumerated value to set
	 * @param  {KeyframeSpatialTangent} [outType] Out KeyframeSpatialTangent enumerated value to set
	 * @return {SpatialTangent}                 Object of In/Out spatial tangent values
	 */
	spatialTangent: function ( inType, outType ) {
		this.checkKey();

		// Return current value if no arguments
		if ( arguments.length === 0 ) {
			return {
				inTangent: this.property.keyInSpatialTangent( this.index ),
				outTangent: this.property.keyOutSpatialTangent( this.index )
			};
		}

		// Check if arguments is a value returned from this function
		if ( outType === undefined && inType.outTangent ) {
			outType = inType.outTangent;
		}
		if ( inType.inTangent ) {
			inType = inType.inTangent;
		}

		this.property.setSpatialTangentsAtKey( this.index, inType, outType );
	},

	/**
	 * TemporalEase type object
	 * @typedef  {object} TemporalEase
	 * @property {KeyframeTemporalEase} inTemporalEase  TemporalEase for keyIn
	 * @property {KeyframeTemporalEase} outTemporalEase TemporalEase for keyOut
	 */

	/**
	 * @typedef {number[]} KeyframeTemporalEase
	 * @property {number} xTemporalEase
	 * @property {number} yTemporalEase
	 * @property {number} [zTemporalEase]
	 */

	/**
	 * Gets or sets in/out temporal ease of current key
	 * @method
	 * @instance
	 * @param  {KeyframeTemporalEase} [inType]  In KeyframeTemporalEase enumerated value to set
	 * @param  {KeyframeTemporalEase} [outType] Out KeyframeTemporalEase enumerated value to set
	 * @return {TemporalEase}                   Object of In/Out temporal ease values
	 */
	temporalEase: function ( inType, outType ) {
		this.checkKey();

		// Return current value if no arguments
		if ( arguments.length === 0 ) {
			return {
				inEase: this.property.keyInTemporalEase( this.index ),
				outEase: this.property.keyOutTemporalEase( this.index )
			};
		}

		// Check if arguments is a value returned from this function
		if ( outType === undefined && inType.outEase ) {
			outType = inType.outEase;
		}
		if ( inType.inEase ) {
			inType = inType.inEase;
		}

		// TemporalEase have to be set using arrays of KeyframeEaseObjects with
		// number of objects in the array matching the propertyValueType
		if ( !aeq.isArray( inType ) ) {
			if ( this.valueTypeIs( 'TwoD' ) ) {
				inType = [ inType, inType ];
			} else if ( this.valueTypeIs( 'ThreeD' ) ) {
				inType = [ inType, inType, inType ];
			} else {
				inType = [ inType ];
			}
		}
		if ( outType && !aeq.isArray( outType ) ) {
			if ( this.valueTypeIs( 'TwoD' ) ) {
				outType = [ outType, outType ];
			} else if ( this.valueTypeIs( 'ThreeD' ) ) {
				outType = [ outType, outType, outType ];
			} else {
				outType = [ outType ];
			}
		}

		this.property.setTemporalEaseAtKey( this.index, inType, outType );
	},

	/**
	 * Gets comp time of current key
	 * @instance
	 * @method
	 * @return {number} Key time of current key, in seconds
	 */
	time: function () {
		this.checkKey();
		return this.originalTime;
	},

	/**
	 * Removes current key from property
	 * @method
	 * @instance
	 */
	remove: function () {
		this.checkKey();
		this.property.removeKey( this.index );
	},

	/**
	 * @typedef aeq.KeyInfo
	 * @property {Property}          property           Prop that the key lives on
	 * @property {any}               value              Key value
	 * @property {time}              number             Key time
	 * @property {InterpolationType} interpolationType  In/out interpolation type
	 * @property {TemporalEase}      temporalEase       In/out temporal ease
	 * @property {SpatialTangent}    spatialTangent     In/out spatial tangents
	 * @property {boolean}    temporalAutoBezier Whether key has temporal auto-Bezier interpolation
	 * @property {boolean}    temporalContinuous Whether key has temporal continuity
	 * @property {boolean}    spatialAutoBezier  Whether key has spatial auto-Bezier interpolation
	 * @property {boolean}    spatialContinuous  Whether key has spatial continuity
	 * @property {boolean}    roving             Whether key is roving
	 */

	/**
	 * Gets key data
	 * @method
	 * @instance
	 * @return {aeq.KeyInfo} [description]
	 */
	getKeyinfo: function () {
		this.checkKey();
		var keyInfo = {
			property: this.property,
			interpolationType: this.interpolationType(),
			value: this.value(),
			time: this.time()
		};

		// These do not have any effect if interpolationType is not Bezier for in and out
		if ( keyInfo.interpolationType.inType === KeyframeInterpolationType.BEZIER &&
				keyInfo.interpolationType.outType === KeyframeInterpolationType.BEZIER ) {
			keyInfo.temporalAutoBezier = this.temporalAutoBezier();
			keyInfo.temporalContinuous = this.temporalContinuous();
		}

		// TODO: find out why this check is here, was like that in rd_scooter
		if ( keyInfo.interpolationType.outType !== KeyframeInterpolationType.HOLD ) {
			keyInfo.temporalEase = this.temporalEase();
		}

		// These attributes throws an error if valuetype is not spatial when setting
		if ( this.valueTypeIs( 'TwoD_SPATIAL' ) || this.valueTypeIs( 'ThreeD_SPATIAL' ) ) {
			keyInfo.spatialAutoBezier = this.spatialAutoBezier();
			keyInfo.spatialContinuous = this.spatialContinuous();
			keyInfo.spatialTangent = this.spatialTangent();
			keyInfo.roving = this.roving();
		}
		return keyInfo;
	},

	/**
	 * Copies current key to a new property at current (or target) time
	 * @method
	 * @instance
	 * @param  {Property} targetProp            Property to create new key on
	 * @param  {number} [time=aeq.KeyInfo.time] Time to create new key at; defaults
	 * to current key's time
	 * @return {aeq.Key}                        New key
	 */
	copyTo: function ( targetProp, time ) {
		var keyInfo = this.getKeyinfo();
		keyInfo.time = time === undefined ? keyInfo.time : time;

		if ( targetProp.isAeq ) {
			targetProp = targetProp.get();
		}
		keyInfo.property = targetProp;
		return aeq.pasteKey( keyInfo );
	},

	/**
	 * Moves current key to new time
	 * @method
	 * @instance
	 * @param  {number} time New key time
	 */
	moveTo: function ( time ) {
		var thisTime = this.time();

		// Keyframe should not be moved
		if ( time === thisTime ) {
			return;
		}

		var newKey = this.copyTo( this.property, time );
		this.remove();

		this.index = this.property.nearestKeyIndex( newKey.time() );
		this.originalTime = time;
	},

	/**
	 * Checks whether this property type matches argument
	 * @method
	 * @instance
	 * @param  {string} type PropertyValueType to check
	 * @return {boolean} `true` if property type matches argument
	 */
	valueTypeIs: function valueTypeIs( type ) {
		return this.property.propertyValueType === PropertyValueType[type];
	}
};

// Create many methods that function the same way at the same time
aeq.forEach( [
	'roving',
	'selected',
	'spatialAutoBezier',
	'spatialContinuous',
	'temporalAutoBezier',
	'temporalContinuous',
	'value'
], function ( type ) {
	var typeCapitalized = type.charAt( 0 ).toUpperCase() + type.slice( 1 );
	var getter = 'key' + typeCapitalized;
	var setter = 'set' + typeCapitalized + 'AtKey';

	aeq.Key.prototype[type] = function () {
		this.checkKey();
		if ( arguments.length === 0 ) {
			return this.property[getter]( this.index );
		}

		// Add this.index to the beginning of the arguments array
		[].unshift.call( arguments, this.index );
		this.property[setter].apply( this.property, arguments );
	};
});

/**
 * Pastes key info?
 * @method
 * @instance
 * @param {aeq.KeyInfo} keyInfo
 * @return {aeq.Key} New key
 */
aeq.pasteKey = function ( keyInfo ) {
	var keyIndex = keyInfo.property.addKey( keyInfo.time );
	var key = new aeq.Key( keyInfo.property, keyIndex );

	if ( keyInfo.property.value.length === 2 &&
			aeq.isArray( keyInfo.value ) &&
			keyInfo.value.length === 3 ) {
		keyInfo.value = [ keyInfo.value[0], keyInfo.value[1] ];
		var spatialTangent = keyInfo.spatialTangent;
		keyInfo.spatialTangent = {
			inTangent: [ spatialTangent.inTangent[0], spatialTangent.inTangent[1] ],
			outTangent: [ spatialTangent.outTangent[0], spatialTangent.outTangent[1] ]
		};
	}

	key.value( keyInfo.value );

	// Copy over the keyframe settings
	if ( keyInfo.temporalEase !== undefined ) {
		key.temporalEase( keyInfo.temporalEase );
	}

	key.interpolationType( keyInfo.interpolationType );

	if ( keyInfo.temporalAutoBezier !== undefined && keyInfo.temporalContinuous !== undefined ) {
		key.temporalAutoBezier( keyInfo.temporalAutoBezier );
		key.temporalContinuous( keyInfo.temporalContinuous );
	}

	if ( keyInfo.spatialAutoBezier !== undefined && keyInfo.spatialContinuous !== undefined ) {
		key.spatialAutoBezier( keyInfo.spatialAutoBezier );
		key.spatialContinuous( keyInfo.spatialContinuous );

		key.spatialTangent( keyInfo.spatialTangent );
		key.roving( keyInfo.roving );
	}
	return key;
};

return aeq;
}( aeq || {}) );
