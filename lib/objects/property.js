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

	forEachKey: function(callback) {
		var length = this.property.numKeys, i = 1;

		for ( ; i <= length; i++ ) {
			callback(this.key(i), i, effects);
		}
	},

	key: function(keyIndex) {
		return new aeq.Key(this.property, keyIndex);
	}
};

return aeq;
}(aeq || {}));
