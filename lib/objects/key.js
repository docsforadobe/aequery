var aeq = (function (aeq) {
aeq.Key = function (property, index) {
	if (this instanceof aeq.Key) {
		this.property = property;
		this.index = index;
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

	interpolationType: function(inType, outType) {
		if (arguments.length === 0) {
			return {
				// Wrap property name "in" or else After Effects throws an error
				// because of the use of in; a reserved word
				"in": this.property.keyInInterpolationType(this.index),
				out: this.property.keyOutInterpolationType(this.index)
			};
		}
		if (!this.property.isInterpolationTypeValid(inType) ||
			(outType && !this.property.isInterpolationTypeValid(outType) )) {
			return false;
		}
		this.property.setInterpolationTypeAtKey(this.index, inType, outType);
	},

	spatialTangent: function(inType, outType) {
		if (arguments.length === 0) {
		return {
			// Wrap property name "in" or else After Effects throws an error
			// because of the use of in; a reserved word
			"in": this.property.keyInSpatialTangent(this.index),
			out: this.property.keyOutSpatialTangent(this.index)
		};
	}
	this.property.setSpatialTangentAtKey(this.index, inType, outType);
 },

	temporalEase: function(inType, outType) {
		if (arguments.length === 0) {
		return {
			// Wrap property name "in" or else After Effects throws an error
			// because of the use of in; a reserved word
			"in": this.property.keyInTemporalEase(this.index),
			out: this.property.keyOutTemporalEase(this.index)
		};
	}
	// TemporalEase have to be set using arrays of KeyframeEaseObjects with
	// number of objects in the array matching the propertyValueType
	if (!aeq.isArray(inType)) {
		if (this.property.propertyValueType === PropertyValueType.OneD) {
			inType = [inType];
		} else if (this.property.propertyValueType === PropertyValueType.TwoD ||
			this.property.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
			inType = [inType, inType];
		} else if (this.property.propertyValueType === PropertyValueType.ThreeD ||
			this.property.propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
			inType = [inType, inType, inType];
		}
	}
	if (outType && !aeq.isArray(outType)) {
		if (this.property.propertyValueType === PropertyValueType.OneD) {
			outType = [outType];
		} else if (this.property.propertyValueType === PropertyValueType.TwoD ||
			this.property.propertyValueType === PropertyValueType.TwoD_SPATIAL) {
			outType = [outType, outType];
		} else if (this.property.propertyValueType === PropertyValueType.ThreeD ||
			this.property.propertyValueType === PropertyValueType.ThreeD_SPATIAL) {
			outType = [outType, outType, outType];
		}
	}
	this.property.setTemporalEaseAtKey(this.index, inType, outType);
 },

	time: function() {
		this.property.keyTime(this.index);
	},

	remove: function() {
		this.property.removeKey(this.index);
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
	return function() {
		if (arguments.length === 0) {
			return this.property[getter](this.index);
		}

		// Add this.index to the beginning of the arguments by creating an array
		// with this.index and pushing the other arguments to the end
		var args = [this.index];
		Array.prototype.push.apply(args, arguments);
		this.property[setter].apply(this.property, args);
	};
});

return aeq;
}(aeq || {}));
