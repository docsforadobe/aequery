var aeq = (function (aeq) {
aeq.Comp = function (comp) {
	if (comp instanceof aeq.Comp) {
		return comp;
	}
	if (this instanceof aeq.Comp) {
		this.comp = comp;
	} else {
		return new aeq.Comp(comp);
	}
};

aeq.Comp.prototype = {
	isAeq: true,

	toString: function() {
		return "[object aeq.Comp]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	// Get the original object
	get: function() {
		return this.comp;
	},

	forEachLayer: function(callback) {
		var length = this.comp.numLayers, i = 1;
		for ( ; i <= length; i++) {
			callback(this.comp.layer(i), i, this);
		}
	}
};

return aeq;
}(aeq || {}));
