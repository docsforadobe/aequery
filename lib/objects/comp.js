aeq = ( function ( aeq ) {
/**
 * Converts a CompItem into an aeq.Comp object
 * @memberof aeq
 * @class
 * @param  {CompItem} comp CompItem to turn into aeq.Comp object
 * @return {aeq.Comp} aeq.Comp object of CompItem
 */
aeq.Comp = function ( comp ) {
	if ( comp instanceof aeq.Comp ) {
		return comp;
	}
	if ( this instanceof aeq.Comp ) {
		this.comp = comp;
	} else {
		return new aeq.Comp( comp );
	}
};

aeq.Comp.prototype = {
	isAeq: true,

	toString: function () {
		return '[object aeq.Comp]';
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Get the original object
	 * @method
	 * @instance
	 * @return {CompItem}
	 */
	get: function () {
		return this.comp;
	},

	/**
	 * Runs a function on each layer in aeq.Comp object
	 * @method
	 * @instance
	 * @param  {Function} callback Function to run on each layer in aeq.Comp object
	 */
	forEachLayer: function ( callback ) {
		var length = this.comp.numLayers,
			i = 1;

		for ( ; i <= length; i++ ) {
			callback( this.comp.layer( i ), i, this );
		}
	}
};

return aeq;
}( aeq || {}) );
