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
		if (newValue === undefined) {
			return {
				in: this.property.keyInInterpolationType(this.index),
				out: this.property.keyOutInterpolationType(this.index)
			};
		}
		this.property.setInterpolationTypeAtKey(this.index, inType, outType);
	},

	remove: function() {
		this.property.removeKey(this.index);
	}
};

return aeq;
}(aeq || {}));
