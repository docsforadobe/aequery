var aeq = (function (aeq) {
aeq.extend({

	getItems: function( folder ) {
		folder = aeq.project.getFolderOrRoot(folder);
		var items = aeq.normalizeCollection( folder.items );

		return aeq.arrayEx( items );
	},

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

	getActiveComposition: function () {
		var activeItem = app.project.activeItem;
		if (aeq.isComp(activeItem)) {
			return activeItem;
		}
		return null;
	},

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

	getSelectedLayers: function(comp) {
		if (!aeq.isComp(comp)) {
			comp = aeq.getActiveComp();
		}
		if (comp) {
			return aeq.arrayEx(comp.selectedLayers);
		}
		return aeq.arrayEx();
	},

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

	// Can take a layer or comp object
	getSelectedProperties: function(obj) {
		if (!obj) {
			obj = aeq.getActiveComp();
		}
		if (obj) {
			return aeq.arrayEx(obj.selectedProperties);
		}
		return aeq.arrayEx();
	},

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

	framesToTime: function(frames, frameRate) {
		return frames / frameRate;
	},

	timeToFrames: function(time, frameRate) {
		return time * frameRate;
	}
});

// Short versions of some methods
aeq.getComp = aeq.getComposition;
aeq.getComps = aeq.getCompositions;
aeq.getActiveComp = aeq.activeComp = aeq.activeComposition = aeq.getActiveComposition;
aeq.getSelectedProps = aeq.getSelectedProperties;
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
