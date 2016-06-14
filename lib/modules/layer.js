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
	}
};
return aeq;
}(aeq || {}));
