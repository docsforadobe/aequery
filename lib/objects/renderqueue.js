var aeq = (function (aeq) {
aeq.renderqueue = {
	toString: function() {
		return "[object aeq.RenderQueue]";
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	unqueue_all: function(){
		var rq = app.project.renderQueue;
		//	idk how to properly invoke aeq's nice looking forEach'es, so
		//	dumb loops it is
		var len = rq.items.length;
		for ( var i = 1; i <= len; ++i ){
			var item = rq.items[i];
			if (item.status != RQItemStatus.USER_STOPPED &&
				item.status != RQItemStatus.ERR_STOPPED &&
				item.status != RQItemStatus.RENDERING &&
				item.status != RQItemStatus.DONE) {
				rq.items[i].render = false;
			}
		}
	},

	clear: function(){
		var rq = app.project.renderQueue;
		while ( rq.items.length > 0 ){
			rq.items[1].remove();
		}
	},

	doSomethingWithRenderQueue: function() {
		alert(app.project.renderQueue);
	}
};

return aeq;
}(aeq || {}));
