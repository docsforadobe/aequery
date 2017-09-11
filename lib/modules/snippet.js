var aeq = ( function ( aeq ) {
/**
 * @namespace snippet
 * @memberof aeq
 * @type {object}
 */
aeq.snippet = aeq.extend({}, {
	toString: function () {
		return '[object aeq.snippet]';
	},

	// Function for extending the object using objects
	extend: aeq.extend,

	/**
	 * Gets the active comp and alerts the user if no comp is open. It then
	 * creates an undo group and executes a callback function with the comp as
	 * the first argument.
	 * @function activeComp
	 * @memberof aeq.snippet
	 * @param  {String}   undoGroup Name of the undo group
	 * @param  {function} callback  Function to execute that gets the active comp
	 *                              as the first argument
	 * @return {Boolean|Any}        `false` if the function is not executed
	 *         because no comp was selected. Else the value the `callback`
	 *         function returns is returned.
	 */
	activeComp: function ( undoGroup, callback ) {
		var comp = getCompWithAlert();
		if ( comp === null ) return false;
		return aeq.createUndoGroup( undoGroup, callback, [ comp ] );
	},

	/**
	 * Gets the selected layers in the active comp and alerts the user if no comp
	 * is open, or if no layer is selected. It then creates an undo group and
	 * executes a callback function with the layers as the first argument, and the
	 * comp as the second argument.
	 * @memberof aeq.snippet
	 * @param  {String}   undoGroup Name of the undo group
	 * @param  {function} callback  Function to execute that gets the selected
	 * layers as the first argument, and the comp as the second argument.
	 * @return {Boolean|Any}        `false` if the function is not executed because
	 * no comp or layer was selected. Else the value the `callback` function
	 * returns is returned.
	 */
	selectedLayers: function ( undoGroup, callback ) {
		var comp = getCompWithAlert();
		if ( comp === null ) return false;
		var layers = getSelectedLayersWithAlert( comp );
		if ( layers === null ) return false;

		layers = aeq.arrayEx( layers );
		return aeq.createUndoGroup( undoGroup, callback, [ layers, comp ] );
	},

	/**
	 * Gets the selected layers or all layers if no layers are selected, in the
	 * active comp. Alerts the user if no comp is open. It then creates an undo
	 * group and executes a callback function with the layers as the first
	 * argument, and the comp as the second argument.
	 * @memberof aeq.snippet
	 * @param  {String}   undoGroup Name of the undo group.
	 * @param  {function} callback  Function to execute that gets the selected
	 * layers in an ArrayEx as the first argument, and the comp as the second
	 * argument.
	 * @return {Boolean|Any}        `false` if the function is not executed because
	 * no comp was open. Else the value the `callback` function is returned.
	 */
	selectedLayersOrAll: function ( undoGroup, callback ) {
		var comp = getCompWithAlert();
		if ( comp === null ) return false;
		var layers = aeq.getSelectedLayersOrAll( comp );

		layers = aeq.arrayEx( layers );
		return aeq.createUndoGroup( undoGroup, callback, [ layers, comp ] );
	},

	/**
	 * Gets the selected properties in the active comp and alerts the user if no
	 * comp is open, or if no property is selected. It then creates an undo group
	 * and executes a callback function with the properties as the first argument,
	 * and the comp as the second argument.
	 * @memberof aeq.snippet
	 * @param  {String}   undoGroup Name of the undo group
	 * @param  {function} callback  Function to execute that gets the selected
	 * properties in an ArrayEx as the first argument, and the comp as the second
	 * argument.
	 * @return {Boolean|Any}        `false` if the function is not executed.
	 * because no comp or property was selected. Else the value the `callback`
	 * function is returned.
	 */
	selectedProperties: function ( undoGroup, callback ) {
		var comp = getCompWithAlert();
		if ( comp === null ) return false;
		var props = getSelectedPropertiesWithAlert( comp );
		if ( props === null ) return false;

		props = aeq.arrayEx( props );
		return aeq.createUndoGroup( undoGroup, callback, [ props, comp ] );
	},

	/**
	 * Loops through the selected layers in the active comp. Alerts the user if no
	 * comp is open, or no layer is selected. It then creates an undo group
	 * and executes a callback function for each of the layers.
	 * @memberof aeq.snippet
	 * @param  {String}          undoGroup Name of the undo group.
	 * @param  {forEachArrayCallback} callback  Function to execute for each layer.
	 * @return {Boolean|ArrayEx} `false` if the function is not executed because
	 *         no comp was open or no layer selected. Else the layers array is
	 *         returned.
	 */
	forEachSelectedLayer: function ( undoGroup, callback ) {
		return aeq.snippet.selectedLayers( undoGroup, function ( layers ) {
			layers.forEach( callback );
			return layers;
		});
	},

	/**
	 * Loops through the selected layers or all layers if no layers are selected, in the
	 * active comp. Alerts the user if no comp is open. It then creates an undo group
	 * and executes a callback function for each of the layers.
	 * @memberof aeq.snippet
	 * @param  {String}          undoGroup Name of the undo group
	 * @param  {forEachArrayCallback} callback  Function to execute for each layer.
	 * @return {Boolean|ArrayEx}           `false` if the function is not executed
	 *                                     because no comp was open. Else
	 *                                     the layers array are returned.
	 */
	forEachSelectedLayerOrAll: function ( undoGroup, callback ) {
		return aeq.snippet.selectedLayersOrAll( undoGroup, function ( layers ) {
			layers.forEach( callback );
			return layers;
		});
	},

	/**
	 * Loops through the selected properties in the active comp. Alerts the user if no
	 * comp is open, or no properties is selected. It then creates an undo group
	 * and executes a callback function for each of the properties.
	 * @memberof aeq.snippet
	 * @param  {String}          undoGroup Name of the undo group
	 * @param  {forEachArrayCallback} callback  Function to execute for each property.
	 * @return {Boolean|ArrayEx}           `false` if the function is not executed
	 *                                     because no comp was open or no layer
	 *                                     selected. Else the property array
	 *                                     is returned.
	 */
	forEachSelectedProperty: function ( undoGroup, callback ) {
		return aeq.snippet.selectedProperties( undoGroup, function ( props ) {
			props.forEach( callback );
			return props;
		});
	}
});

function getCompWithAlert() {
	var comp = aeq.getActiveComp();
	if ( comp === null ) {
		alert( 'No Comp selected' );
	}
	return comp;
}

function getSelectedLayersWithAlert( comp ) {
	if ( comp.selectedLayers.length === 0 ) {
		alert( 'No layers selected' );
		return null;
	}
	return comp.selectedLayers;
}

function getSelectedPropertiesWithAlert( comp ) {
	if ( comp.selectedProperties.length === 0 ) {
		alert( 'No properties selected' );
		return null;
	}
	return comp.selectedProperties;
}

// Function aliases


return aeq;
}( aeq || {}) );
