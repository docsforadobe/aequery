/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = (function(my) {
	'use strict';
	
	my.getCompositions = function () 
	{
		var arr = [];
		var len = app.project.numItems;

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
			var len = comp.layers.length;

			for (var l=0; l < len; l++)
			{
				var layer = comp.layers[l + 1];

				arr.push(layer);
			}
		}

		return aeq.arrayEx(arr);
	};


	my.getProperties = function (layers, opt)
	{
		aeq.assertIsNotNull(layers, 'layer is null');

		opt = opt || { separate : true };

		var arr = [];

		for (var l=0; l < layers.length; l++)
		{
			var layer = layers[l];

			for (var p in layer.properties)
			{
				if (!layer.properties.hasOwnProperty(p))
					continue;

				var prop = layer.properties[p];

				if (opt.separate)
					prop = normalizeProperty(layer, p);

				arr.push(prop);
			}
		}

		return aeq.arrayEx(arr);
	};


	function normalizeProperty(layer, name)
	{
		switch(name)
		{
			case 'X Position':
			case 'Y Position':
			case 'Z Position':
				var prop = layer['Position'];
				prop.dimensionsSeparated = true;
				return prop.propertyGroup().property(name);

			default:
				return layer[name];
		}
	}
}(aeq));