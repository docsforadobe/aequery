aeq = ( function ( aeq ) {
/**
 * Module for dealing with the render queue.
 * @namespace aeq.renderqueue
 * @memberof aeq
 * @type {Object}
 */
aeq.renderqueue = aeq.extend({}, {
	toString: function () {
		return '[object aeq.RenderQueue]';
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * Add a project item to the render queue.
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {Item|CompItem} item The item to add to the queue.
	 * @return {RenderQueueItem}      The added RenderQueueItem.
	 */
	queue: function ( item ) {
		return app.project.renderQueue.items.add( item );
	},

	/**
	 * Unqueues all items in the render queue
	 * @method
	 * @memberof aeq.renderqueue
	 */
	unqueueAll: function () {
		var items = aeq.renderqueue.getRQItems();

		items.forEach( function ( item ) {
			if ( item.status !== RQItemStatus.USER_STOPPED &&
				item.status !== RQItemStatus.ERR_STOPPED &&
				item.status !== RQItemStatus.RENDERING &&
				item.status !== RQItemStatus.DONE ) {
				item.render = false;
			}
		});
	},

	/**
	 * Removes all items from the render queue.
	 * @method
	 * @memberof aeq.renderqueue
	 */
	clear: function () {
		var items = aeq.renderqueue.getRQItems();
		items = items.reverse();
		items.forEach( function ( item ) {
			item.remove();
		});
	},

	/**
	 * Check if an item in the render queue is queued for rendering.
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {RenderQueueItem} rqItem The item to check.
	 * @return {boolean}        `true` if the item is going to be rendered.
	 */
	isQueued: function ( rqItem ) {
		return rqItem.status === RQItemStatus.QUEUED;
	},

	/**
	 * Gets all `RenderQueueItem`s in the render queue which are queued for
	 * rendering.
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {aeq.arrayEx} ArrayEx of `RenderQueueItem`s
	 */
	getQueuedItems: function () {
		var items = aeq.renderqueue.getRQItems();
		return items.filter( function ( item ) {
			return aeq.renderqueue.isQueued( item );
		});
	},

	/**
	 * Gets all `CompItem`s that are queued for rendering.
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {aeq.arrayEx} ArrayEx of `CompItem`s
	 */
	getQueuedComps: function () {
		var queuedItems = aeq.renderqueue.getQueuedItems();
		var compIDs = {};
		var comps = [];

		queuedItems.forEach( function ( item ) {
			var comp = item.comp;
			var compID = comp.id;

			if ( compIDs[compID] === undefined ) {
				compIDs[compID] = true;
				comps.push( comp );
			}
		});

		return aeq.arrayEx( comps );
	},

	/**
	 * Gets all render queue items.
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {aeq.arrayEx} ArrayEx of `RenderQueueItem`s
	 */
	getRQItems: function () {
		return aeq.arrayEx( aeq.normalizeCollection( app.project.renderQueue.items ) );
	},

	/**
	 * Gets all `compItem`s added to the render queue.
	 * @method
	 * @memberof aeq.renderqueue
	 * @return {aeq.arrayEx} ArrayEx of CompItems in the render queue.
	 */
	getRQComps: function () {
		var rqItems = aeq.renderqueue.getRQItems();
		var compIDs = {};
		var comps = [];

		rqItems.forEach( function ( item ) {
			var comp = item.comp;
			var compID = comp.id;

			if ( compIDs[compID] === undefined ) {
				compIDs[compID] = true;
				comps.push( comp );
			}
		});

		return aeq.arrayEx( comps );
	},

	/**
	 * Gets settings from a `RenderQueueItem` or `OutputModule`.
	 * @see [OutputModule.getSettings]{@link
	 * http://docs.aenhancers.com/outputmodule/#outputmodule-getsettings}
	 * @see [RenderQueueItem.getSettings]{@link
	 * http://docs.aenhancers.com/renderqueueitem/#renderqueueitem-getsettings}
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {RenderQueueItem|OutputModule} renderItem The object to get settings
	 * from.
	 * @return {Object}        Object with render settings as strings.
	 */
	getSettings: function ( renderItem ) {
		return renderItem.getSettings( GetSettingsFormat.STRING );
	},

	/**
	 * Checks if the folder where the output module is rendering to exists, if
	 * it does not exist, it gets created.
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {OutputModule} outputModule The output module to check the render
	 *                                     path of.
	 */
	ensureRenderPathExists: function ( outputModule ) {
		aeq.app.ensureSecurityPrefEnabled();
		aeq.file.ensureFolderExists( outputModule.file.parent );
	},

	/**
	 * Checks if the given output module template exists.
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {string} templateName Name of the template to check if exists.
	 * @return {boolean}             `true` if the output module template exists.
	 */
	omTemplateExists: function ( templateName ) {
		var tempComp = aeq.comp.create();
		var tempRQItem = aeq.renderqueue.queue( tempComp );
		var templates = aeq.arrayEx( tempRQItem.outputModule( 1 ).templates );

		var templateExists = templates.some( function ( template ) {
			return template === templateName;
		});

		tempRQItem.remove();
		tempComp.remove();
		return templateExists;
	},

	/**
	 * Checks if the given render queue template exists.
	 * @method
	 * @memberof aeq.renderqueue
	 * @param  {string} templateName Name of the template to check.
	 * @return {boolean}             `true` if the template exists.
	 */
	rqTemplateExists: function ( templateName ) {
		var tempComp = aeq.comp.create();
		var tempRQItem = aeq.renderqueue.queue( tempComp );
		var templates = aeq.arrayEx( tempRQItem.templates );

		var templateExists = templates.some( function ( template ) {
			return template === templateName;
		});

		tempRQItem.remove();
		tempComp.remove();
		return templateExists;
	}
});

// Function aliases

return aeq;
}( aeq || {}) );
