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

	getCompInQueue: function(comp, queuedOnly) {
		if (aeq.isNullOrUndefined(queuedOnly))
			queuedOnly = true;

		var queuedItems = aeq.renderqueue.getRQItems();

		if (queuedOnly)
			queuedItems = aeq.renderqueue.getQueuedItems();

		return aeq.filter(queuedItems, function (item) {
			return item.comp.id == comp.id;
		});
	},

	isInQueue: function(comp) {
		if (!aeq.isComp(comp))
			return null;

		var items = aeq.renderqueue.getRQItems();

		return aeq.exists(items, function(item) {
			return item.comp.id == comp.id;
		});
	},

	isQueued: function(comp) {
		if (aeq.comp.isInQueue(comp) && aeq.renderqueue.isQueuedStatus(comp))
			return true;

		return false;
	}
};

// Function aliases

return aeq;
}(aeq || {}));
