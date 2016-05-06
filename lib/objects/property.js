var aeq = (function (aeq) {
aeq.Property = function (property) {
	if (property instanceof aeq.Property) {
		return property;
	}
	if (this instanceof aeq.Property) {
		this.property = property;
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

	expression: function(newValue) {
		if (!this.canSetExpression) {
			return false;
		}
		if (arguments.length === 0) {
			return this.property.expression;
		}
		this.property.expression = newValue;
		if (this.property.expressionEnabled || newValue === "") {
			return true;
		}
		return this.property.expressionError;
	},

	selectedKeys: function() {
		var selectedKeys = [];
		// Return key objects for selected keys
		aeq.forEach(this.property.selectedKeys, function(keyIndex) {
			selectedKeys.push(this.key(keyIndex));
		});
		return selectedKeys;
	},

	addKey: function(time) {
		var keyIndex = this.property.addKey(time);
		return this.key(keyIndex);
	},

	separationFollower: function(dim) {
		return this.property.getSeparationFollower(dim);
	},

	nearestKeyIndex: function(time) {
		var keyIndex = this.property.nearestKeyIndex(time);
		return this.key(keyIndex);
	},

	removeKey: function(keyIndex) {
		if (aeq.isNumber(keyIndex)) {
			this.property.removeKey(keyIndex);
		} else if (keyIndex.toString() === "[object aeq.Key]") {
			keyIndex.remove();
		}
	},

	separationLeader: function() {
		// Can only be accessed if the property is one of the separated properties
		// (e.g Y Position), otherwise AE throws an error
		if (this.property.isSeparationFollower) {
			return this.property.separationLeader;
		}
		return null;
	},

	separationDimension: function() {
		// Can only be accessed if the property is one of the separated properties
		// (e.g Y Position), otherwise AE throws an error
		if (this.property.isSeparationFollower) {
			return this.property.separationDimension;
		}
		return null;
	},

	maxValue: function() {
		if (this.property.hasMax) {
			return this.property.maxValue;
		}
		return null;
	},

	minValue: function() {
		if (this.property.hasMin) {
			return this.property.minValue;
		}
		return null;
	},

	value: function(newValue) {
		if (arguments.length === 0) {
			return this.property.value;
		}
		this.property.setValue(newValue);
	},

	valueAtTime: function(time, value) {
		if (arguments.length === 1) {
			return this.property.valueAtTime(time);
		}
		this.property.setValueAtTime(value);

		// TODO: should returning key object be optional?
		return this.nearestKeyIndex(time);
	},

	valuesAtTimes: function(times, values) {
		var result = [];
		if (arguments.length === 1) {
			aeq.forEach(times, function(time) {
				result.push(this.property.valueAtTime(time));
			});
			return result;
		}
		this.property.setValueAtTimes(times, values);

		// TODO: should returning key objects be optional?
		aeq.forEach(times, function(time) {
			result.push(this.nearestKeyIndex(time));
		});
		return result;
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

// Create functions for read-only attributes
aeq.forEach([
	"expressionError",
	"isTimeVarying",
	"numKeys",
	"canSetExpression",
	"canVaryOverTime",
	"isSpatial",
	"isSeparationFollower",
	"isSeparationLeader",
	"propertyIndex",
	"propertyValueType",
	"unitsText"
], function(attribute) {
	aeq.Property.prototype[attribute] = function() {
		return this.property[attribute];
	};
});

return aeq;
}(aeq || {}));
