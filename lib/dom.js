/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = (function (my) {
	'use strict';

	my.getCompositions = function ()
	{
		var arr = [];
		var len = app.project.items.length;

		for (var i=1; i <= len; i++)
		{
			var item = app.project.item(i);

			if (item instanceof CompItem)
				arr.push(item);
		}

		return aeq.arrayEx(arr);
	};


	my.getActiveComposition = function ()
	{
		return aeq.getCompositions().first();
	};


	my.getLayers = function (comps)
	{
		aeq.assertIsNotNull(comps, 'comps is null');

		var arr = [];

		for (var c=0; c < comps.length; c++)
		{
			var comp = comps[c];
			var len = comp.numLayers;

			for (var l=1; l <= len; l++)
			{
				var layer = comp.layers[l];

				arr.push(layer);
			}
		}

		return aeq.arrayEx(arr);
	};


	my.getProperties = function (layers, options)
	{
		aeq.assertIsNotNull(layers, 'layer is null');

		options = options || { separate : true };

		var arr = [];

		for (var l=0; l < layers.length; l++)
		{
			var layer = layers[l];
			arr = arr.concat(getPropertyChildren(layer, options));
		}

		return aeq.arrayEx(arr);
	};


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

	function getPropertyChildren(propertyParent, options)
	{
		var arr = [];
		var property;
		var len = propertyParent.numProperties;

		for (var i=1; i <= len; i++)
		{
			property = propertyParent.property(i);

			switch (property.propertyType)
			{
				case PropertyType.PROPERTY:
					if (options.separate)
						property = normalizeProperty(propertyParent, property);

					arr.push(property);
					break;

				case PropertyType.INDEXED_GROUP:
				case PropertyType.NAMED_GROUP:
					arr = arr.concat(getPropertyChildren(property, options));
					break;

				default:
					break;

			}
		}

		return arr;
	}

	my.getEffects = function (layers)
	{
		aeq.assertIsNotNull(layers, 'layers is null');

		var arr = [];
		var len = layers.length;
		var effects;

		for (var l=0; l < len; l++) {
			effects = layers[l].property("ADBE Effect Parade");
			effectslen = effects.numProperties;

			for (var e = 1; e <= effectslen; e++) {
				arr.push(effects.property(e));
			}
		}
		return aeq.arrayEx(arr);
	};


	return my;
}(aeq));
