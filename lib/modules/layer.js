var aeq = (function (aeq) {
aeq.layer = {
	toString: function() {
		return "[object aeq.layer]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	setLayerToggles: function(sourceLayer, destLayer) {
		var switches = "enabled solo shy quality effectsActive motionBlur " +
			"adjustmentLayer threeDLayer blendingMode preserveTransparency " +
			"parent inPoint stretch startTime outPoint label guideLayer" +
			"name comment autoOrient".split(" ");

		for (var i in switches) {
			destLayer[switches[i]] = sourceLayer[switches[i]];
		}
	},

	children: function(parentLayer) {
		var layers = aeq.getLayers(parentLayer.containingComp);
		return aeq.filter(layers, function(layer) {
			return layer.parent === parentLayer;
		});
	},

	allChildren: function(parentLayer) {
		var allChildren = [];
		var children = aeq.layer.children(parentLayer);
		aeq.forEach(children, function() {
			allChildren = allChildren.concat(aeq.layer.allChildren(layer));
		});
		return allChildren;
	},

	parents: function(childLayer) {
		var parents = [];
		var layer = childLayer;
		while (layer.parent !== null) {
			parents.push(layer.parent);
			layer = layer.parent;
		}
		return parents;
	},

	relatedLayers: function(root) {
		var parents = aeq.layer.parents(root);
		var children = aeq.layer.allChildren(root);
		var all = parents.concat(children);
		return all;
	}
};

return aeq;
}(aeq || {}));
