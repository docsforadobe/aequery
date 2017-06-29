var aeq = (function (aeq) {
aeq.extend({

	/**
	 * Gets all the item in a folder or project.
	 * @method
	 * @memberof aeq
	 * @param  {FolderItem} [folder=app.project] The Folder to get items from.
	 * @param  {boolean} [deep=true]             When `true`, gets items from
	 *                                           subfolders as well.
	 * @return {aeq.arrayEx}                     Array of Item objects
	 */
	getItems: function(folder, deep) {
		// If no arguments are given, just return all items in project.
		if (folder === undefined) {
			return aeq.normalizeCollection(app.project.items);
		}

		deep = setDefault(deep, true);
		folder = aeq.project.getFolder(folder);
		if (folder === null) {
			return aeq.arrayEx();
		}

		if (deep) {
			return aeq.getItemsDeep(folder);
		}

		return aeq.normalizeCollection(folder.items);
	},

	/**
	 * Returns an {@link aeq.arrayEx} with all items in a folder, and items in
	 * subfolders.
	 * @method
	 * @param  {FolderItem} folder    The folder to flatten.
	 * @return {aeq.arrayEx}          ArrayEx with Item objects.
	 */
	getItemsDeep: function(folder, returnArrayEx) {
		// The returnArrayEx param is so we can skip the converting to arrayEx when
		// recursing. It is not meant to be used outside of this function.
		var item,
			items = [],
			len = folder.items.length;

		for (var i=1; i <= len; i++) {
			item = folder.items[i];
			if (aeq.isFolderItem(item)) {
				// Add all items in subfolder to the `items` array.
				items.push.apply(items, aeq.getItemsDeep(item, false));
			}
			items.push(item);
		}
		// Skip converting to arrayEx when function is called by it self.
		if (returnArrayEx === false) {
			return items;
		}
		return aeq.arrayEx(items);
	},

	/**
	 * Gets the all layers where the given Item object is used as a source.
	 * @method
	 * @memberof aeq
	 * @param  {Item} item    The item to find in comps
	 * @return {aeq.arrayEx}  Array of Layer objects
	 */
	getItemInComps: function(item) {
		var layers = []
		aeq.forEach(item.usedIn, function(comp) {
			aeq.forEachLayer(comp, function(layer) {
				if (layer.source === item) {
					layers.push(layer);
				}
			});
		});
		return aeq.arrayEx(layers);
	},

	/**
	 * Gets all the CompItems in the project
	 * @method
	 * @memberof aeq
	 * @return {aeq.arrayEx} Array of CompItems
	 */
	getCompositions: function () {
		var arr = [];
		var len = app.project.items.length;

		for (var i=1; i <= len; i++)
		{
			var item = app.project.item(i);

			if (aeq.isComp(item))
				arr.push(item);
		}

		return aeq.arrayEx(arr);
	},

	/**
	 * Gets the active CompItem.
	 * This gets `app.project.activeItem` and verifies that it is a comp. If it
	 * not, it returns null.
	 * @method
	 * @memberof aeq
	 * @return {CompItem|null} The active comp, or null if there is none.
	 */
	getActiveComposition: function () {
		var activeItem = app.project.activeItem;
		if (aeq.isComp(activeItem)) {
			return activeItem;
		}
		return null;
	},

	/**
	 * Gets the CompItem with the matching name, or `null` if none is found.
	 * @method
	 * @memberof aeq
	 * @param  {string} name      The name of the comp to found
	 * @return {CompItem|null}    The comp with the matching name, or null if
	 *                            none is found
	 */
	getComposition: function (name) {
		var length = app.project.items.length;

		for (var i = 1; i <= length; i++) {
			var item = app.project.item(i);
			if (item.name === name && aeq.isComp(item)) {
				return item;
			}
		}

		// If the function have not returned by now, there is no comp with that name
		return null;
	},

	/**
	 * Gets all layers layers in a comp or an array of comps. This differs from
	 * `comp.layers` in that this returns an actual array. Instead of a colletion
	 * with a start index of 1.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem[]|CompItem} comps CompItem(s) to get layers from.
	 * @return {aeq.arrayEx}         Layer objects in the comp(s)
	 */
	getLayers: function(comps) {
		aeq.assertIsNotNull(comps, 'comps is null');

		var arr = [];

		if (aeq.isComp(comps)) {
			comps = [comps];
		}

		for (var c=0; c < comps.length; c++) {
			var comp = comps[c];
			arr = arr.concat(aeq.normalizeCollection(comp.layers));
		}

		return aeq.arrayEx(arr);
	},

	/**
	 * Gets selected layers from a given comp or from the active comp if no comp is given.
	 * If there is no active comp, an empty array is returned.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem} [comp] The comp to get selected layers from.
	 * @return {aeq.arrayEx}     Array of Layer objects.
	 */
	getSelectedLayers: function(comp) {
		if (!aeq.isComp(comp)) {
			comp = aeq.getActiveComp();
		}
		if (comp) {
			return aeq.arrayEx(comp.selectedLayers);
		}
		return aeq.arrayEx();
	},

	/**
	* Gets selected layers, or all layers if none is selected, from a given comp
	* or from the active comp if no comp is given. If there is no active comp,
	* an empty array is returned.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem} [comp] Comp to get layers from
	 * @return {aeq.arrayEx}     Array of Layer objects
	 */
	getSelectedLayersOrAll: function(comp) {
		if (!aeq.isComp(comp)) {
			comp = aeq.getActiveComp();
			if (comp === null) {
				return aeq.arrayEx();
			}
		}

		var layers = aeq.getSelectedLayers(comp);

		if (layers.length === 0) {
			return aeq.getLayers(comp);
		}

		return layers;
	},

	/**
	 * Gets the selected properties on a layer or in a comp. Uses the active comp
	 * if no argument is given. If there is no active comp, an empty array is
	 * returned.
	 * @method
	 * @memberof aeq
	 * @param  {CompItem|Layer} [obj] The object to get selected properties from.
	 *         Defaults to the active comp.
	 * @return {aeq.arrayEx}          Array of Property objects
	 */
	getSelectedProperties: function(obj) {
		if (!obj) {
			obj = aeq.getActiveComp();
		}
		if (obj) {
			return aeq.arrayEx(obj.selectedProperties);
		}
		return aeq.arrayEx();
	},

	/**
	 * Gets all Property objects of all Layer objects in an array.
	 * @method
	 * @memberof aeq
	 * @param  {Layer[]} layers   Layer Objects to get properties from.
	 * @param  {Object} [options] Options for the function.
	 * @param  {boolean} options.separate set to true to separate properties
	 * (e.g separates Position into xPosition and yPosition). Default is true;
	 * @return {aeq.arrayEx} Array of Property objects
	 */
	getProperties: function (layers, options) {
		aeq.assertIsNotNull(layers, 'layer is null');

		options = setDefault(options, { separate : true } );

		var arr = [];

		for (var l=0; l < layers.length; l++) {
			var layer = layers[l];
			arr = arr.concat(aeq.getPropertyChildren(layer, options));
		}

		return aeq.arrayEx(arr);
	},

	/**
	 * Gets all children of the given layer or propertyGroup. This is a recursive
	 * function, so it also gets grandchildren an so on.
	 * @method
	 * @memberof aeq
	 * @param  {Layer|PropertyGroup} propertyParent Object to get properties from
	 * @param  {Object} [options] Options for the function.
	 * @param  {boolean} options.separate set to true to separate properties
	 * (e.g separates Position into xPosition and yPosition). Default is true;
	 * @return {Array}            Array of Property objects
	 */
	getPropertyChildren: function(propertyParent, options) {
		var arr = [];
		var property;
		var len = propertyParent.numProperties;
		options = setDefault(options, { separate : false } );

		for (var i=1; i <= len; i++)
		{
			property = propertyParent.property(i);

			switch (property.propertyType)
			{
				case PropertyType.PROPERTY:
					if (options.separate)
						property = normalizeProperty(propertyParent, property);
					if ( options.props !== false ) { // On by defualt
						arr.push(property);
					}
					break;

				case PropertyType.INDEXED_GROUP:
				case PropertyType.NAMED_GROUP:
					if ( options.groups === true ) { // Off by default
						arr.push(property);
					}
					arr = arr.concat(aeq.getPropertyChildren(property, options));
					break;

				default:
					break;

			}
		}

		return arr;
	},

	/**
	 * Gets the propertyGroups inside the effects group from all layers given.
	 * @method
	 * @memberof aeq
	 * @param  {Layer[]|Layer} layers The Layer(s) to get effects from.
	 * @return {aeq.arrayEx}     Array of PropertyGroup objects
	 */
	getEffects: function(layers) {
		aeq.assertIsNotNull(layers, 'layers is null');

		if (aeq.isLayer(layers))
			layers = [layers];

		var arr = [];
		var len = layers.length;
		var effects, effectslen;

		for (var l=0; l < len; l++) {
			effects = layers[l].property("ADBE Effect Parade");
			if ( effects === null )
			{
				return aeq.arrayEx();
			}

			effectslen = effects.numProperties;
			for (var e = 1; e <= effectslen; e++) {
				arr.push(effects.property(e));
			}
		}
		return aeq.arrayEx(arr);
	},

	/**
	 * Gets the Marker property group from the given layer or comp. If no object
	 * is given, the active comp is used. If there is no active comp, `null` is
	 * returned.
	 * Note: Marker groups for comps is only available for After Effects version
	 * 14.0 and later. If a comp is used in a earlier version. This function will
	 * return `null`
	 * @method
	 * @memberof aeq
	 * @param  {Layer|CompItem} [obj] The object to get the marker group from.
	 * @return {MarkerPropertyGroup|null}
	 */
	getMarkerGroup: function(obj) {
		if (!obj) {
			obj = aeq.getActiveComp();
		}

		if (aeq.isLayer(obj))
			return obj.property("ADBE Marker");

		if (aeq.isComp(obj) && aeq.app.version >= 14.0)
			return obj.markerProperty;

		return null;
	},

	/**
	 * Gets all keys on the given property or array of properties. Returns an
	 * aeq.Keys object which can be used to see all attributes of the key.
	 * @method
	 * @memberof aeq
	 * @param  {Property|Property[]} property The Property or Properties to get
	 *                               keys from.
	 * @return {aeq.arrayEx}         Array of aeq.Key objects.
	 */
	getKeys: function(property) {
		var arr = [], i, len;
		if (aeq.isArray(property)) {
			for (i = 0, len = property.length; i < len; i++) {
				arr = arr.concat(aeq.getKeys(property[i]));
			}
			return aeq.arrayEx(arr);
		}
		for (i = 1, len = property.numKeys; i <= len; i++) {
			arr.push(aeq.Key(property, i));
		}
		return aeq.arrayEx(arr);
	},

	getChildren: function(obj) {
		var ret;
		if (aeq.isComp(obj)) {
			return aeq.normalizeCollection(obj.layers);
		}
		if (aeq.isLayer(obj) || aeq.isPropertyGroup(obj)) {
			return aeq.getPropertyChildren(obj, {});
		}
		if (aeq.isArray(obj)) {
			ret = aeq.arrayEx();
			aeq.forEach(obj, function(item) {
				ret.push.call(ret, aeq.getChildren(item));
			});
			return ret;
		}
	},

	/**
	 * Collection arrays have indexes in the range `1-Collection.length`, which is
	 * usually not ideal when programming. This function takes a Collection object
	 * and converts it to a normal array.
	 * @method
	 * @memberof aeq
	 * @param  {Collection} collection The Collection to convert
	 * @return {aeq.arrayEx}
	 */
	normalizeCollection: function(collection) {

		// Because collection objects have a range [1...length], which is not ideal.
		// This returns an array with all objects in the collection.
		var ret = Array.prototype.slice.call(collection, 1);
		var len = collection.length;
		// Because the last object is at index Collection.length and slice only goes up to
		// length - 1, we have to push the last object to the return value
		if (len !== 0) {
			ret.push(collection[len]);
		}
		return  aeq.arrayEx(ret);
	},

	/**
	 * Converts frame count to time.
	 * @method
	 * @memberof aeq
	 * @param  {number} frames
	 * @param  {number} frameRate
	 * @return {number}
	 */
	framesToTime: function(frames, frameRate) {
		return frames / frameRate;
	},

	/**
	 * Converts time to frame count.
	 * @method
	 * @memberof aeq
	 * @param  {number} time
	 * @param  {number} frameRate
	 * @return {number}
	 */
	timeToFrames: function(time, frameRate) {
		return time * frameRate;
	}
});

// Short versions of some methods

/**
 * @see aeq.getComposition
 * @function
 */
aeq.getComp = aeq.getComposition;
/**
 * @see aeq.getCompositions
 * @function
 */
aeq.getComps = aeq.getCompositions;
/**
 * @see aeq.getActiveComposition
 * @function
 */
aeq.getActiveComp = aeq.activeComp = aeq.activeComposition = aeq.getActiveComposition;
/**
 * @see aeq.getSelectedProperties
 * @function
 */
aeq.getSelectedProps = aeq.getSelectedProperties;
/**
 * @see aeq.getSelectedLayersOrAll
 * @function
 */
aeq.getSelectedOrAllLayers = aeq.getSelectedLayersOrAll;


function normalizeProperty(propertyParent, property)
{
	switch(property.name)
	{
		case 'X Position':
		case 'Y Position':
		case 'Z Position':
			property = propertyParent.property('Position');
			property.dimensionsSeparated = true;
			return property.propertyGroup().property(property.name);

		default:
			return property;
	}
}

return aeq;
}(aeq || {}));
