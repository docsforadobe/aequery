aeq = ( function ( aeq ) {
aeq.extend({

	/**
	 * Loops through the layers of a comp, array of comps, or all layers in the
	 * project, and executes a function for each one.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem|CompItem[]|forEachArrayCallback}   [obj]
	 *         A `CompItem` or array of `compItem`s to get layers from.
	 *         If this is function, the function will loop through all layers in
	 *         the project.
	 * @param  {forEachArrayCallback}
	 *         callback The function to execute for each layer
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachLayer: function ( obj, callback ) {
		if ( aeq.isComp( obj ) ) {
			var length = obj.numLayers,
i = 1;

			for ( ; i <= length; i++ ) {
				if ( callback( obj.layer( i ), i, obj ) === false ) {
					break;
				}
			}
		} else if ( aeq.isArray( obj ) ) {
			aeq.forEach( obj, function ( obj ) {
				aeq.forEachLayer( obj, callback );
			});
		} else if ( aeq.isFunction( obj ) ) {
			callback = obj;
			aeq.forEachComp( function ( comp ) {
				aeq.forEachLayer( comp, callback );
			});
		}
		return aeq;
	},

	/**
	 * Loops through the properties of a Comp, Layer, PropertyGroup, or an array
	 * of any of them, and executes a function for each one.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem|Layer|PropertyGroup|Array|forEachArrayCallback}   [obj]
	 *         The object or array of objects to get properties from.
	 *         If this is function, the function will loop through all properties
	 *         in the project.
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each property
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachProperty: function ( obj, callback ) {
		if ( aeq.isLayer( obj ) || aeq.isPropertyGroup( obj ) ) {
			var properties = aeq.getPropertyChildren( obj, {});
			aeq.forEach( properties, callback );
		} else if ( aeq.isComp( obj ) ) {
			aeq.forEachLayer( obj, function ( layer ) {
				var properties = aeq.getPropertyChildren( layer, {});
				aeq.forEach( properties, callback );
			});
		} else if ( aeq.isArray( obj ) ) {
			aeq.forEach( obj, function ( obj ) {
				aeq.forEachProperty( obj, callback );
			});
		} else if ( aeq.isFunction( obj ) ) {
			callback = obj;
			aeq.forEachLayer( function ( layer ) {
				aeq.forEachProperty( layer, callback );
			});
		}
		return aeq;
	},

	/**
	 * Loops through the effects in a Comp, or on a Layer, and executes a function
	 * for each one.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem|Layer|Array|forEachArrayCallback}   [obj]
	 *         The object or array of objects to get effects from.
	 *         If this is function, the function will loop through all properties
	 *         in the project.
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each effect
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachEffect: function ( obj, callback ) {
		var i, length, effects;
		if ( aeq.isLayer( obj ) ) {
			effects = obj.property( 'ADBE Effect Parade' );
			length = effects.numProperties;

			for ( i = 1; i <= length; i++ ) {
				if ( callback( effects.property( i ), i, effects ) === false ) {
					break;
				}
			}
		} else if ( aeq.isComp( obj ) ) {
			aeq.forEachLayer( obj, function ( layer ) {
				aeq.forEachEffect( layer, callback );
			});
		} else if ( aeq.isArray( obj ) ) {
			aeq.forEach( obj, function ( obj ) {
				aeq.forEachEffect( obj, callback );
			});
		} else if ( aeq.isFunction( obj ) ) {
			callback = obj;
			aeq.forEachLayer( function ( layer ) {
				aeq.forEachEffect( layer, callback );
			});
		}
		return aeq;
	},

	/**
	 * Loops through the comps in a project and executes a function for each one.
	 * @method
	 * @memberof aeq
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each comp.
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachComp: function ( callback ) {
		aeq.forEach( aeq.getCompositions(), callback );
	},

	/**
	 * Loops through the Project items in a project and executes a function
	 * for each one.
	 * @method
	 * @memberof aeq
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each item.
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachItem: function ( callback ) {
		var project = app.project;
		var items = project.items;
		var length = items.length;
		for ( var i = 1; i <= length; i++ ) {
			if ( callback( items[i], i, project ) === false ) {
				break;
			}
		}
		return aeq;
	},

	/**
	 * Loops through the items in the renderqueue and executes a function
	 * for each one.
	 * @method
	 * @memberof aeq
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each renderQueue Item.
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachRenderQueueItem: function ( callback ) {
		var renderQueue = app.project.renderQueue;
		var renderQueueItems = renderQueue.items;
		var length = renderQueueItems.length;
		for ( var i = 1; i <= length; i++ ) {
			if ( callback( renderQueueItems[i], i, renderQueue ) === false ) {
				break;
			}
		}
		return aeq;
	},

	/**
	 * Loops through the output modules in the renderqueue and executes a function
	 * for each one.
	 * @method
	 * @memberof aeq
	 * @param  {forEachArrayCallback} callback
	 *         The function to execute for each Output Module.
	 * @return {aeq}
	 *         The AEQuery library.
	 */
	forEachOutputModule: function ( callback ) {
		aeq.forEachRenderQueueItem( function ( item ) {
			var length = item.outputModules.length;
			for ( var i = 1; i <= length; i++ ) {
				if ( callback( item.outputModules[i], i, item ) === false ) {
					break;
				}
			}
		});
		return aeq;
	}
});

// ForEach aliases
/**
 * @see aeq.forEachProperty
 * @function
 */
aeq.forEachProp = aeq.forEachProperty;

/**
 * @see aeq.forEachComp
 * @function
 */
aeq.forEachComposition = aeq.forEachComp;

/**
 * @see aeq.forEachRenderQueueItem
 * @function
 */
aeq.forEachRQItem = aeq.forEachRenderQueueItem;

/**
 * @see aeq.forEachOutputModule
 * @function
 */
aeq.forEachOM = aeq.forEachOutputModule;

return aeq;
}( aeq || {}) );
