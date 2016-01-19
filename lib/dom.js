/*global cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var $ = (function(my) {
	'use strict';
	
	$.getCompositions = function (cb) 
	{
		var arr = [];
		var len = app.project.numItems;

		cb = cb || function() { };

		for (var i=1; i <= len; i++)
		{
			var item = app.project.item(i);

			if (item instanceof CompItem)
				arr.push(item);
		}

		return $.arrayEx(arr);
	};


	$.getActiveComposition = function () 
	{
		return $.getCompositions().first();
	};


	$.getLayers = function (comps, cb)
	{
		$.assertIsNotNull(comps, 'comps is null');

		cb = cb || function() { };

		var arr = [];

		for (var c=0; c < comps.length; c++)
		{
			var comp = comps[c];
			var len = comp.layers.length;

			for (var i=0; i < len; i++)
			{
				var layer = comp.layers[i + 1];

				arr.push(layer);
			}
		}

		return $.arrayEx(arr);
	};


	$.getProperties = function (layers, opt, cb)
	{
		$.assertIsNotNull(layers, 'layer is null');

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

		return $.arrayEx(arr);
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
}($));