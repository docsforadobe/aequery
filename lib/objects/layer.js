var aeq = (function (aeq) {
aeq.Layer = function (layer) {
	if (layer instanceof aeq.Layer) {
		return layer;
	}

	// Check if function called with "new" keyword
	if (this instanceof aeq.Layer) {
		this.layer = layer;
	} else {
		return new aeq.Layer(layer);
	}
};

aeq.Layer.prototype = {
	isAeq: true,

	toString: function() {
		return "[object aeq.Layer]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	// Get the original object
	get: function() {
		return this.layer;
	},

	forEachEffect: function(callback) {
		var effects = this.layer.property("ADBE Effect Parade"),
		length = effects.length, i = 1;

		for ( ; i <= length; i++ ) {
			callback(effects.property(i), i, effects);
		}
	}
};

return aeq;
}(aeq || {}));
