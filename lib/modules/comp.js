var aeq = (function (aeq) {
/**
 * [comp description]
 * @namespace aeq.comp
 * @memberof aeq
 * @type {Object}
 */
aeq.comp = {
	toString: function() {
		return "[object aeq.comp]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.comp
	 * @param  {type} folder  [description]
	 * @param  {type} options [description]
	 * @return {type}         [description]
	 */
	create: function(folder, options) {
		if (!aeq.isFolderItem(folder)) {
			options = setDefault(folder, {});
			folder = setDefault(options.folder, app.project);
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

	/**
	 * [description]
	 * @method
	 * @memberof aeq.comp
	 * @param  {type} comp       [description]
	 * @param  {type} queuedOnly [description]
	 * @return {type}            [description]
	 */
	getCompInQueue: function(comp, queuedOnly) {
		if (aeq.isNullOrUndefined(queuedOnly))
			queuedOnly = true;

		var queuedItems;

		if (queuedOnly) {
			queuedItems = aeq.renderqueue.getQueuedItems();
		} else {
			queuedItems = aeq.renderqueue.getRQItems();
		}

		return aeq.filter(queuedItems, function (item) {
			return item.comp.id == comp.id;
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.comp
	 * @param  {type} comp [description]
	 * @return {type}      [description]
	 */
	isInQueue: function(comp) {
		if (!aeq.isComp(comp))
			return null;

		var items = aeq.renderqueue.getRQItems();

		return items.exists(function(item) {
			return item.comp.id == comp.id;
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.comp
	 * @param  {type} comp [description]
	 * @return {type}      [description]
	 */
	isQueued: function(comp) {
		return aeq.comp.getCompInQueue(comp, true).length > 0;
	}
};

// Function aliases

return aeq;
}(aeq || {}));
