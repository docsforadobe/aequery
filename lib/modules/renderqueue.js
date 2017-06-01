var aeq = (function (aeq) {
/**
 * [renderqueue description]
 * @namespace aeq.renderqueue
 * @memberof aeq
 * @type {Object}
 */
aeq.renderqueue = {
	toString: function() {
		return "[object aeq.RenderQueue]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} item [description]
	 * @return {type}      [description]
	 */
	queue: function(item){
		return app.project.renderQueue.items.add(item);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	unqueue_all: function(){

		var items = aeq.renderqueue.getRQItems();

		aeq.forEach(items, function(item){
			if (item.status != RQItemStatus.USER_STOPPED &&
				item.status != RQItemStatus.ERR_STOPPED &&
				item.status != RQItemStatus.RENDERING &&
				item.status != RQItemStatus.DONE) {
				item.render = false;
			}
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	clear: function(){
		var items = aeq.renderqueue.getRQItems();
		items = items.reverse();
		aeq.forEach(items, function(item){
			item.remove();
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} rqItem [description]
	 * @return {type}        [description]
	 */
	isQueued: function(rqItem) {
		return rqItem.status == RQItemStatus.QUEUED;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	getQueuedItems: function() {
		var items = aeq.renderqueue.getRQItems();
		return aeq.filter(items, function(item) {
			return aeq.renderqueue.isQueued(item);
		});
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	getQueuedComps: function() {
		var queuedItems = aeq.renderqueue.getQueuedItems();
		var compIDs = {};
		var comps = [];

		aeq.forEach(queuedItems, function(item) {
			var comp = item.comp;
			var compID = comp.id;

			if (compIDs[compID] === undefined) {
				compIDs[compID] = true;
				comps.push(comp);
			}
		});

		return comps;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	getRQItems: function() {
		return aeq.arrayEx(aeq.normalizeCollection(app.project.renderQueue.items));
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {type} [description]
	 */
	getRQComps: function() {
		var rqItems = aeq.renderqueue.getRQItems();
		var compIDs = {};
		var comps = [];

		aeq.forEach(rqItems, function(item) {
			var comp = item.comp;
			var compID = comp.id;

			if (compIDs[compID] === undefined) {
				compIDs[compID] = true;
				comps.push(comp);
			}
		});

		return comps;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} renderItem [description]
	 * @return {type}            [description]
	 */
	getSettings: function(renderItem) {
		return renderItem.getSettings(GetSettingsFormat.STRING);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} outputModule [description]
	 * @return {type}              [description]
	 */
	ensureRenderPathExists: function(outputModule) {
		aeq.app.ensureSecurityPrefEnabled();
		aeq.file.ensureFolderExists(outputModule.file.parent);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} templateName [description]
	 * @return {type}              [description]
	 */
	omTemplateExists: function(templateName) {
		var tempComp = aeq.comp.create();
		var tempRQItem = aeq.renderqueue.queue(tempComp);
		var templates = aeq.arrayEx(tempRQItem.outputModule(1).templates);

		var templateExists = templates.exists(function(template) {
			return template == templateName;
		});

		tempRQItem.remove();
		return templateExists;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {type} templateName [description]
	 * @return {type}              [description]
	 */
	rqTemplateExists: function(templateName) {
		var tempComp = aeq.comp.create();
		var tempRQItem = aeq.renderqueue.queue(tempComp);
		var templates = aeq.arrayEx(tempRQItem.templates);

		var templateExists = templates.exists(function(template) {
			return template == templateName;
		});

		tempRQItem.remove();
		return templateExists;
	}
};

// Function aliases

return aeq;
}(aeq || {}));
