var aeq = (function (aeq) {
aeq.Key = function (property, index) {
	if (this instanceof aeq.Key) {
		if (property instanceof aeq.Property) {
			property = property.get();
		}
		this.property = property;
		this.index = index;
		this.originalTime = this.getTime();
	} else {
		return new aeq.Key(property, index);
	}
};

aeq.Key.prototype = {
	isAeq: true,

	toString: function() {
		return "[object aeq.Key]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	// Used to check if the key index is the correct for refrensing
	// TODO: consider not checking this in every function or find better way to do this
	checkKey: function() {

		// Check if index is in range and that key at that index is at correct time
		if (this.index <= this.property.numKeys && this.getTime() === this.originalTime) {
			return; // If it is, then the index is still correct
		}

		// Get the keyIndex nearest to the keyTime
		var newIndex = this.property.nearestKeyIndex(this.originalTime);

		// The time of the nearest keyIndex could be something else if the original key
		// was deleted, so we need to check it
		if (this.property.keyTime(newIndex) === this.originalTime) {
			this.index = newIndex;
		} else {
			throw new Error("Original key has been deleted/moved");
		}
	},

	// Need two time functions because `this.time` relies on checkKey
	getTime: function() {
		return this.property.keyTime(this.index);
	},

	interpolationType: function(inType, outType) {
		this.checkKey();

		// Return current value if no arguments
		if (arguments.length === 0) {
			return {
				inType: this.property.keyInInterpolationType(this.index),
				outType: this.property.keyOutInterpolationType(this.index)
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
		if (aeq.isString(inType)) {
			inType = KeyframeInterpolationType[inType];
		}

		if (outType && aeq.isString(outType)) {
			outType = KeyframeInterpolationType[outType];

			// If outType is not defined the inType is used (standard behaviour)
		} else if (outType === undefined) {
			outType = inType;
		}

		// Check that the value is valid
		// TODO: should this be skipped and just throw error?
		if (!this.property.isInterpolationTypeValid(inType) ||
			(outType && !this.property.isInterpolationTypeValid(outType) )) {
			return false;
		}
		this.property.setInterpolationTypeAtKey(this.index, inType, outType);
	},

	spatialTangent: function(inType, outType) {
		this.checkKey();

		// Return current value if no arguments
		if (arguments.length === 0) {
			return {
				inTangent: this.property.keyInSpatialTangent(this.index),
				outTangent: this.property.keyOutSpatialTangent(this.index)
			};
		}

		// Check if arguments is a value returned from this function
		if ( outType === undefined && inType.outTangent ) {
			outType = inType.outTangent;
		}
		if ( inType.inTangent ) {
			inType = inType.inTangent;
		}

		this.property.setSpatialTangentsAtKey(this.index, inType, outType);
	},

	temporalEase: function(inType, outType) {
		this.checkKey();

		// Return current value if no arguments
		if (arguments.length === 0) {
			return {
				inEase: this.property.keyInTemporalEase(this.index),
				outEase: this.property.keyOutTemporalEase(this.index)
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
		if (!aeq.isArray(inType)) {
			if (this.valueTypeIs("TwoD")) {
				inType = [inType, inType];
			} else if (this.valueTypeIs("ThreeD")) {
				inType = [inType, inType, inType];
			} else {
				inType = [inType];
			}
		}
		if (outType && !aeq.isArray(outType)) {
			if (this.valueTypeIs("TwoD")) {
				outType = [outType, outType];
			} else if (this.valueTypeIs("ThreeD")) {
				outType = [outType, outType, outType];
			} else {
				outType = [outType];
			}
		}

		this.property.setTemporalEaseAtKey(this.index, inType, outType);
	},

	time: function() {
		this.checkKey();
		return this.originalTime;
	},

	remove: function() {
		this.checkKey();
		return this.property.removeKey(this.index);
	},

	getKeyinfo: function() {
		this.checkKey();
		var keyInfo = {
			property: this.property,
			interpolationType: this.interpolationType(),
			value: this.value(),
			time: this.time()
		};

		// These do not have any effect if interpolationType is not Bezier for in and out
		if (keyInfo.interpolationType.inType === KeyframeInterpolationType.BEZIER &&
				keyInfo.interpolationType.outType === KeyframeInterpolationType.BEZIER) {
			keyInfo.temporalAutoBezier = this.temporalAutoBezier();
			keyInfo.temporalContinuous = this.temporalContinuous();
		}

		// TODO: find out why this check is here, was like that in rd_scooter
		if (keyInfo.interpolationType.outType !== KeyframeInterpolationType.HOLD) {
			keyInfo.temporalEase = this.temporalEase();
		}

		// These attributes throws an error if valuetype is not spatial when setting
		if (this.valueTypeIs("TwoD_SPATIAL" ) || this.valueTypeIs("ThreeD_SPATIAL")) {
			keyInfo.spatialAutoBezier = this.spatialAutoBezier();
			keyInfo.spatialContinuous = this.spatialContinuous();
			keyInfo.spatialTangent = this.spatialTangent();
			keyInfo.roving = this.roving();
		}
		return keyInfo;
	},

	copyTo: function(targetProp, time) {
		var keyInfo = this.getKeyinfo();
		keyInfo.time = time !== undefined ? time : keyInfo.time;

		if ( targetProp.isAeq ) {
			targetProp = targetProp.get();
		}
		keyInfo.property = targetProp;
		return aeq.pasteKey(keyInfo);
	},

	moveTo: function(time) {
		var thisTime = this.time();

		// Keyframe should not be moved
		if (time === thisTime) {
			return;
		}

		var newKey = this.copyTo(this.property, time);
		this.remove();

		this.index = this.property.nearestKeyIndex(newKey.time());
		this.originalTime = time;
	},

	valueTypeIs: function valueTypeIs(type) {
		return this.property.propertyValueType === PropertyValueType[type];
	}
};

// Create many methods that function the same way at the same time
aeq.forEach([
	"roving",
	"selected",
	"spatialAutoBezier",
	"spatialContinuous",
	"temporalAutoBezier",
	"temporalContinuous",
	"value"
], function(type) {
	var typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
	var getter = "key" + typeCapitalized;
	var setter = "set" + typeCapitalized + "AtKey";

	aeq.Key.prototype[type] = function() {
		this.checkKey();
		if (arguments.length === 0) {
			return this.property[getter](this.index);
		}

		// Add this.index to the beginning of the arguments array
		[].unshift.call(arguments, this.index);
		this.property[setter].apply(this.property, arguments);
	};
});

aeq.pasteKey = function( keyInfo ) {
	var keyIndex = keyInfo.property.addKey(keyInfo.time);
	var key = new aeq.Key(keyInfo.property, keyIndex);

	key.value(keyInfo.value);

	// Copy over the keyframe settings
	if (keyInfo.temporalEase !== undefined) {
		key.temporalEase(keyInfo.temporalEase);
	}

	key.interpolationType(keyInfo.interpolationType);

	if (keyInfo.temporalAutoBezier !== undefined && keyInfo.temporalContinuous !== undefined) {

		key.temporalAutoBezier(keyInfo.temporalAutoBezier);
		key.temporalContinuous(keyInfo.temporalContinuous);
	}

	if (keyInfo.spatialAutoBezier !== undefined && keyInfo.spatialContinuous !== undefined) {
		key.spatialAutoBezier(keyInfo.spatialAutoBezier);
		key.spatialContinuous(keyInfo.spatialContinuous);

		key.spatialTangent(keyInfo.spatialTangent);
		key.roving(keyInfo.roving);
	}
	return key;
};

return aeq;
}(aeq || {}));
