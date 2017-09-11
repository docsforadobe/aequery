var aeq = ( function ( aeq ) {
/**
 * Module dealing with Layer objects.
 * @namespace aeq.layer
 * @memberof aeq
 * @type {Object}
 */
aeq.layer = aeq.extend({}, {
	toString: function () {
		return '[object aeq.layer]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Copies the state of layer toggles from one layer to another.
	 * Layer toggles: enabled, solo, shy, quality, effectsActive, motionBlur
	 * adjustmentLayer, threeDLayer, blendingMode, preserveTransparency
	 * parent, inPoint, stretch, startTime, outPoint, label, guideLayer
	 * name, comment, autoOrient
	 * @method
	 * @memberof aeq.layer
	 * @param  {Layer} sourceLayer The layer to copy from.
	 * @param  {Layer} destLayer   The layer to copy to.
	 */
	setLayerToggles: function ( sourceLayer, destLayer ) {
		var switches = 'enabled solo shy quality effectsActive motionBlur ' +
			'adjustmentLayer threeDLayer blendingMode preserveTransparency ' +
			'parent inPoint stretch startTime outPoint label guideLayer ' +
			'name comment autoOrient';
		switches = switches.split( ' ' );

		aeq.forEach( switches, function ( switchName ) {
			destLayer[switchName] = sourceLayer[switchName];
		});
	},

	/**
	 * Gets all layers that has the given layer as its parent.
	 * @method
	 * @memberof aeq.layer
	 * @param  {Layer} parentLayer The layer to get children from.
	 * @return {aeq.arrayEx}           The children Layers of the given Layer.
	 */
	children: function ( parentLayer ) {
		var layers = aeq.getLayers( parentLayer.containingComp );
		return layers.filter( function ( layer ) {
			return layer.parent === parentLayer;
		});
	},

	/**
	 * Gets all layers that has the given layer as its parent, and all layers
	 * that has those layers, and so on.
	 * @method
	 * @memberof aeq.layer
	 * @param  {Layer} parentLayer The layer to get decendants from.
	 * @return {aeq.arrayEx}           Children and decendants of the given Layer.
	 */
	allChildren: function ( parentLayer ) {
		var allChildren = [];
		var children = aeq.layer.children( parentLayer );
		aeq.forEach( children, function ( layer ) {
			allChildren.push( layer );
			allChildren = allChildren.concat( aeq.layer.allChildren( layer ) );
		});
		return aeq.arrayEx( allChildren );
	},

	/**
	 * Gets the layers parent chain. I.e This layer's parent's parent, and so on.
	 * @method
	 * @memberof aeq.layer
	 * @param  {Layer} childLayer The layer to get parents from.
	 * @return {aeq.arrayEx}          The Parents of the given layer.
	 */
	parents: function ( childLayer ) {
		var parents = aeq.arrayEx();
		var layer = childLayer;
		while ( layer.parent !== null ) {
			parents.push( layer.parent );
			layer = layer.parent;
		}
		return parents;
	},

	/**
	 * Gets all [parents]{@link aeq.layer.parents} and
	 * [all children]{@link aeq.layer.allChildren} of the given layers.
	 * @method
	 * @memberof aeq.layer
	 * @param  {Layer} root The Layer to get the parents and children from
	 * @return {aeq.arrayEx}    The layer's parents and children.
	 */
	relatedLayers: function ( root ) {
		var parents = aeq.layer.parents( root );
		var children = aeq.layer.allChildren( root );
		var all = parents.push.apply( parents, children );
		return aeq.arrayEx( all );
	}
});

// Function aliases

return aeq;
}( aeq || {}) );
