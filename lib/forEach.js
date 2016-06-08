aeq = (function (aeq) {
aeq.extend({
	forEachLayer: function(obj, callback) {
		if (aeq.isComp(obj) ) {
			aeq.forEach(aeq.normalizeCollection(obj.layers), callback);
		} else if (aeq.isArray(obj)) {
			aeq.forEach(obj, function(obj ) {
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
		aeq.forEach(aeq.getCompositions(), callback);
	},

	forEachItem: function(callback) {
		var project = app.project;
		var items = project.items;
		var length = items.length;
		for (var i = 1; i <= length; i++) {
			if (callback(items[i], i, project) === false) {
				break;
			}
		}
		return aeq;
	},

	forEachRenderQueueItem: function(callback) {
		var renderQueue = app.project.renderQueue;
		var renderQueueItems = renderQueue.items;
		var length = renderQueueItems.length;
		for (var i = 1; i <= length; i++) {
			if (callback(renderQueueItems[i], i, renderQueue) === false) {
				break;
			}
		}
		return aeq;
	},

	forEachOutputModule: function(callback) {
		aeq.forEachRenderQueueItem(function(item) {
			var length = item.outputModules.length;
			for (var i = 1; i <= length; i++) {
				if (callback(item.outputModules[i], i, item) === false) {
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
