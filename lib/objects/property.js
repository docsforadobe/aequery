var aeq = (function (aeq) {
/**
 * Converts a Property into an aeq.Property object
 * @memberof aeq
 * @class
 * @param  {Property} property Property to convert
 * @return {aeq.Property}      aeq.Property object
 */
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

	/**
	 * Get the original object
	 * @method
	 * @instance
	 * @return {Property}
	 */
	get: function() {
		return this.property;
	},

	/**
	 * Gets or sets expression on property
	 * @method
	 * @instance
	 * @param  {string} [newValue] Expression to set
	 * @return {string|boolean}    Returns current expression, current expression error, or `true` if expression was set
	 */
	expression: function(newValue) {
		if (!this.property.canSetExpression) {
			return false;
		}
		if (arguments.length === 0) {
			return this.property.expression;
		}
		this.property.expression = newValue;
		if (this.property.expressionError === ""
				&& (this.property.expressionEnabled
				|| newValue === "")) {
			return true;
		}
		return this.property.expressionError;
	},

	/**
	 * Gets array of selected keys
	 * @method
	 * @instance
	 * @return {Key[]} Array of keys to return
	 */
	selectedKeys: function() {
		var selectedKeys = [];
		// Return key objects for selected keys
		for (var i = 1; i <= this.property.selectedKeys.length; i++) {
			selectedKeys.push(this.key(i));
		}
		return selectedKeys;
	},

	/**
	 * Adds & returns a new key at time
	 * @method
	 * @instance
	 * @param  {number} time The time in seconds; a floating-point value. The beginning of the composition is 0.
	 * @return {Key}         Newly-created key
	 */
	addKey: function(time) {
		var keyIndex = this.property.addKey(time);
		return this.key(keyIndex);
	},

	/**
	 * Retrieves property following passed dimension
	 * @method
	 * @instance
	 * @param  {number} dim The dimension number (starting at 0).
	 * @return {Property}   Property following passed dimension
	 */
	separationFollower: function(dim) {
		return this.property.getSeparationFollower(dim);
	},

	/**
	 * Returns the index of the keyframe nearest to the specified time.
	 * @method
	 * @instance
	 * @param  {number} time The time in seconds; a floating-point value. The beginning of the composition is 0.
	 * @return {Key}         Nearest key
	 */
	nearestKeyIndex: function(time) {
		var keyIndex = this.property.nearestKeyIndex(time);
		return this.key(keyIndex);
	},

	/**
	 * Removes key by index or key object
	 * @method
	 * @instance
	 * @param  {number|Key} keyIndex Index of target key, or key itself
	 */
	removeKey: function(keyIndex) {
		if (aeq.isNumber(keyIndex)) {
			this.property.removeKey(keyIndex);
		} else if (keyIndex.toString() === "[object aeq.Key]") {
			keyIndex.remove();
		}
	},

	/**
	 * Returns the original multidimensional property for this separated follower
	 * Can only be accessed if the property is one of the separated properties
	 * 	(e.g Y Position), otherwise AE throws an error
	 * @method
	 * @instance
	 * @return {Property|null} Original multidimensional property, or null
	 */
	separationLeader: function() {
		if (this.property.isSeparationFollower) {
			return this.property.separationLeader;
		}
		return null;
	},

	/**
	 * Returns the dimension number it represents in the multidimensional leader
	 * Can only be accessed if the property is one of the separated properties
	 * 	(e.g Y Position), otherwise AE throws an error
	 * @method
	 * @instance
	 * @return {number|null} Dimension number, or null
	 */
	separationDimension: function() {
		if (this.property.isSeparationFollower) {
			return this.property.separationDimension;
		}
		return null;
	},

	/**
	 * Returns maximum permitted value of property
	 * @method
	 * @instance
	 * @return {number|null} Max value, or null if there isn't one
	 */
	maxValue: function() {
		if (this.property.hasMax) {
			return this.property.maxValue;
		}
		return null;
	},

	/**
	 * Returns minimum permitted value of property
	 * @method
	 * @instance
	 * @return {number|null} Max value, or null if there isn't one
	 */
	minValue: function() {
		if (this.property.hasMin) {
			return this.property.minValue;
		}
		return null;
	},

	/**
	 * Gets or sets property value
	 * 	If expressionEnabled is true, returns the evaluated expression value.
	 * 	If there are keyframes, returns the keyframed value at the current time.
	 * 	Otherwise, returns the static value.
	 * @method
	 * @instance
	 * @param  {any} [newValue] New value to try to set
	 * @return {any}            Current value
	 */
	value: function(newValue) {
		if (arguments.length === 0) {
			return this.property.value;
		}
		this.property.setValue(newValue);
	},

	/**
	 * Get or set the value of the current property as evaluated at the specified time
	 * @method
	 * @instance
	 * @param  {number} time    The time in seconds; a floating-point value. The beginning of the composition is 0.
	 * @param  {any}    [value] Property value at time
	 * @return {any|number}     Set value, or index of nearest key to `time`
	 */
	valueAtTime: function(time, value) {
		// TODO: Both setValueAtTime and valueAtTime require two arguments
		// How should this be handled?
		if (arguments.length === 1) {
			return this.property.valueAtTime(time);
		}
		this.property.setValueAtTime(time, value);

		// TODO: should returning key object be optional?
		return this.nearestKeyIndex(time);
	},

	/**
	 * Get or sets values for a set of keyframes at specified times
	 * @method
	 * @instance
	 * @param  {number[]} time    Array of times
	 * @param  {any[]}    [value] Array of values
	 * @return {any[]|number[]}   Array of set values, or array of indices of nearest key to `time`
	 */
	valuesAtTimes: function(times, values) {
		var result = [], i = 0, il = times.length;
		if (arguments.length === 1) {
			for ( ; i < il; i++ ) {
				// TODO: valueAtTime require two arguments How should this be handled?
				result.push(this.property.valueAtTime(times[i]));
			}
			return result;
		}
		this.property.setValuesAtTimes(times, values);

		// TODO: should returning key objects be optional?
		for ( ; i < il; i++ ) {
			result.push(this.nearestKeyIndex(times[i]));
		}
		return result;
	},

	/**
	 * Runs a function on each key in current property
	 * @method
	 * @instance
	 * @param  {Function} callback Function to execute on each key
	 */
	forEachKey: function(callback) {
		var keys = this.getKeys()
		var length = keys.length, i = 0;

		for ( ; i < length; i++ ) {
			callback(keys[i], keys[i].index, this.property);
		}
	},

	/**
	 * Returns a aeq.Key object for specific key index
	 * @method
	 * @instance
	 * @param  {number} keyIndex Index of target key
	 * @return {aeq.Key}         aeq.Key object for target key
	 */
	key: function(keyIndex) {
		return new aeq.Key(this.property, keyIndex);
	},

	/**
	 * Gets all keys of the property
	 * @method
	 * @return {aeq.Key[]} ArrayEx of all keyframes on the property
	 */
	getKeys: function() {
		var keys = []
		var length = this.property.numKeys, i = 1;

		for ( ; i <= length; i++ ) {
			keys.push(this.key(i));
		}
		return aeq.arrayEx( keys )
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
