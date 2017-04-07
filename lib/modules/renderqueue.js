var aeq = (function (aeq) {
aeq.renderqueue = {
	toString: function() {
		return "[object aeq.RenderQueue]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	queue: function(item){
		return app.project.renderQueue.items.add(item);
	},

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

	clear: function(){
		var items = aeq.renderqueue.getRQItems();
		items = items.reverse();
		aeq.forEach(items, function(item){
			item.remove();
		});
	},

	isQueuedStatus: function(rqItem) {
		return rqItem.status == RQItemStatus.QUEUED;
	},

	getQueuedItems: function() {
		var items = aeq.renderqueue.getRQItems();
		return aeq.filter(items, function(item) {
			return aeq.renderqueue.isQueuedStatus(item);
		});
	},

	getQueuedComps: function() {
		var queuedItems = aeq.renderqueue.getQueuedItems();
		var compIDs = [];
		var comps = [];

		aeq.forEach(queuedItems, function(item) {
			var comp = item.comp;
			var compID = comp.id;

			if (!isInArray(compID, compIDs)) {
				compIDs.push(compID);
				comps.push(comp);
			}
		});

		return comps;
	},

	getRQItems: function() {
		return aeq.normalizeCollection(app.project.renderQueue.items);
	},

	getRQComps: function() {
		var rqItems = aeq.renderqueue.getRQItems();
		var compIDs = [];
		var comps = [];

		aeq.forEach(rqItems, function(item) {
			var comp = item.comp;
			var compID = comp.id;

			if (!isInArray(compID, compIDs)) {
				compIDs.push(compID);
				comps.push(comp);
			}
		});

		return comps;
	},

	getSettings: function(renderItem) {
		return renderItem.getSettings(GetSettingsFormat.STRING);
	},

	ensureRenderPathExists: function(outputModule) {
		var outputPath = aeq.renderqueue.getSettings(outputModule)["Full Flat Path"];
		aeq.file.ensureFolderExists(outputPath);
	},

	doSomethingWithRenderQueue: function() {
		alert(app.project.renderQueue);
	}
};

// Function aliases

return aeq;
}(aeq || {}));
