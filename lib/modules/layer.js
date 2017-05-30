var aeq = (function (aeq) {
/**
 * [layer description]
 * @namespace aeq.layer
 * @memberof aeq
 * @type {Object}
 */
aeq.layer = {
	toString: function() {
		return "[object aeq.layer]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.layer
	 * @param  {type} sourceLayer [description]
	 * @param  {type} destLayer   [description]
	 * @return {type}             [description]
	 */
	setLayerToggles: function(sourceLayer, destLayer) {
		var switches = "enabled solo shy quality effectsActive motionBlur " +
			"adjustmentLayer threeDLayer blendingMode preserveTransparency " +
			"parent inPoint stretch startTime outPoint label guideLayer " +
			"name comment autoOrient";
		switches = switches.split(" ");

		aeq.forEach(switches, function(switchName) {
			destLayer[switchName] = sourceLayer[switchName];
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.layer
	 * @param  {type} parentLayer [description]
	 * @return {type}             [description]
	 */
	children: function(parentLayer) {
		var layers = aeq.getLayers(parentLayer.containingComp);
		return aeq.filter(layers, function(layer) {
			return layer.parent === parentLayer;
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.layer
	 * @param  {type} parentLayer [description]
	 * @return {type}             [description]
	 */
	allChildren: function(parentLayer) {
		var allChildren = [];
		var children = aeq.layer.children(parentLayer);
		aeq.forEach(children, function(layer) {
			allChildren.push( layer );
			allChildren = allChildren.concat(aeq.layer.allChildren(layer));
		});
		return allChildren;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.layer
	 * @param  {type} childLayer [description]
	 * @return {type}            [description]
	 */
	parents: function(childLayer) {
		var parents = [];
		var layer = childLayer;
		while (layer.parent !== null) {
			parents.push(layer.parent);
			layer = layer.parent;
		}
		return parents;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.layer
	 * @param  {type} root [description]
	 * @return {type}      [description]
	 */
	relatedLayers: function(root) {
		var parents = aeq.layer.parents(root);
		var children = aeq.layer.allChildren(root);
		var all = parents.concat(children);
		return all;
	}
};

// Function aliases

return aeq;
}(aeq || {}));
