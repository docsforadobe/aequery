var aeq = ( function ( aeq ) {
/**
 * Module dealing with comp objects.
 * @namespace aeq.comp
 * @memberof aeq
 * @type {Object}
 */
aeq.comp = aeq.extend({}, {
	toString: function () {
		return '[object aeq.comp]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Creates a comp with the given settings
	 * @method
	 * @memberof aeq.comp
	 * @param  {FolderItem|object} [folder=app.project]  The folder to place the
	 *         comp inside in the project panel. If not provided, this argument
	 *         will be used as the `options` parameter.
	 * @param  {object} [options] Comp settings:
	 * @param  {string} [options.name=Comp] The name of the comp.
	 * @param  {number} [options.width=1920] Comp width, in pixels.
	 * @param  {number} [options.height=1080] Comp height, in pixels.
	 * @param  {number} [options.pixelAspect=1] Comp pixel aspect ratio.
	 * @param  {number} [options.duration=1] Comp duration, in seconds.
	 * @param  {number} [options.frameRate=24] Comp frame rate.
	 * @return {CompItem}  The created comp item.
	 *
	 * @example <caption>Create a comp in the project root, with name "Example",
	 *          and a duration of 10 seconds. And use default values for the
	 *          other options</caption>
	 * var comp = aeq.comp.create({
	 *     name: 'Example',
	 *     duration: 10
	 * })
	 *
	 * @example <caption>Create comp in a folder, with name "Example"</caption>
	 * var comp = aeq.comp.create(compFolder, {
	 *     name: "Example"
	 * })
	 *
	 * @example <caption>Create a comp with all default values</caption>
	 * var comp = aeq.comp.create()
	 */
	create: function ( folder, options ) {
		if ( !aeq.isFolderItem( folder ) ) {
			options = setDefault( folder, {});
			folder = setDefault( options.folder, app.project );
		}

		// TODO: Find a way to use the last used settings, or find some defaults
		var defaultOptions = {
			name: 'Comp',
			width: 1920,
			height: 1080,
			pixelAspect: 1,
			duration: 1,
			frameRate: 24
		};

		options = aeq.extend( defaultOptions, options );

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
	 * Gets the `RenderQueueItem`s that references a given comp.
	 * @method
	 * @memberof aeq.comp
	 * @param  {CompItem} comp   The comp to find in the Render Queue.
	 * @param  {boolean} [queuedOnly=true]   Only get `RenderQueueItem`s that
	 *                                       are queued.
	 * @return {RenderQueueItem[]}    The `RenderQueueItem`s that references
	 *                                the comp
	 *
	 * @example <caption>Get all `RenderQueueItem`s that references
	 *          the comp.</caption>
	 * var RQItems = aeq.comp.getCompInQueue( comp, false )
	 */
	getCompInQueue: function ( comp, queuedOnly ) {
		if ( aeq.isNullOrUndefined( queuedOnly ) ) queuedOnly = true;

		var queuedItems;

		if ( queuedOnly ) {
			queuedItems = aeq.renderqueue.getQueuedItems();
		} else {
			queuedItems = aeq.renderqueue.getRQItems();
		}

		return aeq.filter( queuedItems, function ( item ) {
			return item.comp.id === comp.id;
		});
	},

	/**
	 * Check if a comp is in the Render Queue, regardless of it being
	 * queued or not.
	 * @method
	 * @memberof aeq.comp
	 * @param  {CompItem} comp The comp to find in the queue.
	 * @return {boolean}   True if comp is in the queue.
	 */
	isInQueue: function ( comp ) {
		if ( !aeq.isComp( comp ) ) return null;

		var items = aeq.renderqueue.getRQItems();

		return items.exists( function ( item ) {
			return item.comp.id === comp.id;
		});
	},

	/**
	 * Check if a comp is in the Render Queue and queued.
	 * @method
	 * @memberof aeq.comp
	 * @param  {CompItem} comp The comp to find the queue.
	 * @return {boolean}     True if the comp is queued.
	 */
	isQueued: function ( comp ) {
		return aeq.comp.getCompInQueue( comp, true ).length > 0;
	}
});

// Function aliases

return aeq;
}( aeq || {}) );
