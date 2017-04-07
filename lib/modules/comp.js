var aeq = (function (aeq) {
aeq.comp = {
	toString: function() {
		return "[object aeq.comp]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	create: function(folder, options) {
		if (!aeq.isFolderItem(folder)) {
			options = folder || {};
			folder = options.folder || app.project;
		}

		// TODO: Find a way to use the last used settings, or find some defaults
		var defaultOptions = {
			name: "Comp",
			width: 1920,
			height: 1080,
			pixelAspect: 1,
			duration: 1,
			frameRate: 24
		};

		options = aeq.extend(defaultOptions, options);

		return folder.items.addComp(
			options.name,
			options.width,
			options.height,
			options.pixelAspect,
			options.duration,
			options.frameRate
		);
	},

	isQueued: function(comp) {
		if (!aeq.isComp(comp))
			return null;

		var items = aeq.normalizeCollection(app.project.renderQueue.items);

		for (var i = 0, il = items.length; i < il; i++) {
			if (items[i].comp.id == comp.id) {
				return true;
			}
		}

		return false;
	},
};

// Function aliases

return aeq;
}(aeq || {}));
