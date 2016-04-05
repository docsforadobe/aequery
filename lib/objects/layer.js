var aeq = (function (aeq) {
aeq.Layer = function (layer) {
	if (layer instanceof aeq.Layer) {
		return layer;
	}

	// Check if function called with "new" keyword
	if (this instanceof aeq.Layer) {
		this.layer = layer;

		// Copy the static attributes of the layer to the object
			this.containingComp = layer.containingComp;
			this.hasVideo = layer.hasVideo;

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

	copyToComp: function(comp) {
		if (!aeq.isComp(comp)) {
			if (comp instanceof aeq.Comp) {
				comp = comp.comp;
			}
			if (aeq.isString(comp)) {
				comp = aeq.getComp(comp);
			}
		}
		this.layer.copyToComp(comp);
	},

	forEachEffect: function(callback) {
		var effects = this.layer.property("ADBE Effect Parade"),
		length = effects.length, i = 1;

		for ( ; i <= length; i++ ) {
			callback(effects.property(i), i, effects);
		}
	}
};

// Create methods that only returns the value for attributes that are read-
// only and can change over time;
aeq.forEach([
	"active",
	"hasVideo",
	"index",
	"isNameSet",
	"selectedProperties",
	"time"
], function(attribute) {
	aeq.Layer.prototype[attribute] = function() {
		return this.layer[attribute];
	};
});

// Create methods for attributes that are basic read/write
aeq.forEach([
	"comment",
	"enabled",
	"inPoint",
	"locked",
	"name",
	"outPoint",
	"shy",
	"solo",
	"startTime",
	"stretch"
], function(attribute) {
	aeq.Layer.prototype[attribute] = function(newValue) {
		if (arguments.length === 0) {
			return this.layer[attribute];
		}
		this.layer[attribute] = newValue;
	};
});

// Create Methods that just call the layer object methods
aeq.forEach([
	"activeAtTime",
	"applyPreset",
	"duplicate",
	"remove",
	"moveToBeginning",
	"moveToEnd"
], function(method) {
	aeq.Layer.prototype[method] = function(newValue) {
		this.layer[method](newValue);
	};
});

return aeq;
}(aeq || {}));
