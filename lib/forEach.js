aeq = (function (aeq) {
aeq.extend({
	forEachLayer: function(obj, callback) {
		if (aeq.isComp(obj) ) {
			var length = obj.numLayers, i = 1;
			for ( ; i <= length; i++) {
				if (callback(obj.layer(i), i, obj) === false) {
					break;
				}
			}
		} else if (aeq.isArray(obj)) {
			aeq.forEach(obj, function(obj) {
				aeq.forEachLayer(obj, callback);
			});
		} else if (aeq.isFunction(obj)) {
			callback = obj;
			aeq.forEachComp(function(comp) {
				aeq.forEachLayer(comp, callback);
			});
		}
		return aeq;
	},

	forEachProperty: function(obj, callback) {
		if (aeq.isLayer(obj)) {
			var properties = aeq.getPropertyChildren(obj, {});
			aeq.forEach(properties, callback);
		} else if (aeq.isComp(obj)) {
			aeq.forEachLayer(obj, function(layer) {
				var properties = aeq.getPropertyChildren(layer, {});
				aeq.forEach(properties, callback);
			});
		} else if (aeq.isArray(obj)) {
			aeq.forEach(obj, function(obj) {
				aeq.forEachProperty(obj, callback);
			});
		} else if (aeq.isFunction(obj)) {
			callback = obj;
			aeq.forEachLayer(function(layer) {
				aeq.forEachProperty(layer, callback);
			});
		}
		return aeq;
	},

	forEachEffect: function(obj, callback) {
		var i, length, effects;
		if (aeq.isLayer(obj)) {
			effects = obj.property("ADBE Effect Parade");
			length = effects.numProperties;

			for ( i = 1; i <= length; i++) {
				if (callback(effects.property(i), i, effects) === false) {
					break;
				}
			}
		} else if (aeq.isComp(obj)) {
			aeq.forEachLayer(obj, function(layer) {
				aeq.forEachEffect(layer, callback);
			});
		} else if (aeq.isArray(obj)) {
			aeq.forEach(obj, function(obj) {
				aeq.forEachEffect(obj, callback);
			});
		} else if (aeq.isFunction(obj)) {
			callback = obj;
			aeq.forEachLayer(function(layer) {
				aeq.forEachEffect(layer, callback);
			});
		}
		return aeq;
	},

	forEachComp: function(callback) {
		aeq("comp").forEach(callback);
	},

	forEachItem: function(callback) {
		var length = app.project.numItems;
		for (var i = 1; i <= length; i++) {
			if (callback(app.project.item(i), i, app.project) === false) {
				break;
			}
		}
		return aeq;
	},

	forEachRenderQueueItem: function(callback) {
		var renderQueue = app.project.renderQueue;
		var length = renderQueue.numItems;
		for (var i = 1; i <= length; i++) {
			if (callback(renderQueue.item(i), i, renderQueue) === false) {
				break;
			}
		}
		return aeq;
	},

	forEachOutputModule: function(callback) {
		aeq.forEachRenderQueueItem(function(item) {
			var length = item.numOutputModules;
			for (var i = 1; i <= length; i++) {
				if (callback(item.outputModule(i), i, item) === false) {
					break;
				}
			}
		});
		return aeq;
	}
});

// forEach aliases
aeq.forEachProp = aeq.forEachProperty;
aeq.forEachComposition = aeq.forEachComp;
aeq.forEachRQItem = aeq.forEachRenderQueueItem;
aeq.forEachOM = aeq.forEachOutputModule;

return aeq;
}(aeq || {}));
