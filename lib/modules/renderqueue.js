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

		var items = aeq.normalizeCollection(app.project.renderQueue.items);

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
		var items = aeq.normalizeCollection(app.project.renderQueue.items);
		items = items.reverse();
		aeq.forEach(items, function(item){
			item.remove();
		});
	},

	doSomethingWithRenderQueue: function() {
		alert(app.project.renderQueue);
	}
};

// Function aliases

return aeq;
}(aeq || {}));
