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

		var items = aeq.getRQItems();

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
		var items = aeq.getRQItems();
		items = items.reverse();
		aeq.forEach(items, function(item){
			item.remove();
		});
	},

	getRQItems: function() {
		return aeq.normalizeCollection(app.project.renderQueue.items);
	},

	getRQComps: function() {
		var rqItems = aeq.getRQItems();
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
