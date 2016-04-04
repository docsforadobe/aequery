var aeq = (function (aeq) {
aeq.Property = function (property) {
	if (property instanceof aeq.Property) {
		return property;
	}
	if (this instanceof aeq.Property) {
		this.property = property;

		// Copy the static attributes of the property to the object
		var attributes = [
			"canSetExpression",
			"canVaryOverTime",
			"isSpatial",
			"isSeparationFollower",
			"isSeparationLeader",
			"propertyIndex",
			"propertyValueType",
			"unitsText"
		];
		for (var i = 0; i < attributes.length; i++) {
			this[attributes[i]] = property[attributes[i]];
		}

		// Copy attributes that must meet a condition to be accessed

		// Can only be accessed if the property is one of the separated properties
		// (e.g Y Position), otherwise AE throws an error
		if (property.isSeparationFollower) {
			this.separationLeader = property.separationLeader;
			this.separationDimension = property.separationDimension;
		}

		if (property.hasMax) {
			this.maxValue = property.maxValue;
		}
		if (property.hasMin) {
			this.maxValue = property.minValue;
		}
	} else {
		return new aeq.Property(property);
	}
};

aeq.Property.prototype = {
	isAeq: true,

	toString: function() {
		return "[object aeq.Property]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	// Get the original object
	get: function() {
		return this.property;
	},

	forEachKey: function(callback) {
		var length = this.property.numKeys, i = 1;

		for ( ; i <= length; i++ ) {
			callback(this.key(i), i, this.property);
		}
	},

	key: function(keyIndex) {
		return new aeq.Key(this.property, keyIndex);
	}
};

return aeq;
}(aeq || {}));
