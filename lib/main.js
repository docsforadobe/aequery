/*jslint browser: true*/

/*global cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var $ = function select(selector) {
	'use strict';

	var results = [];

	if (typeof selector === 'string')
	{
		var ast = cssselector.parse(selector);
		var parts = normalize(ast);

		var comps = null;
		var layers = null;
		var props = null;

		while (parts.length > 0)
		{
			var part = parts[0];

			switch (part.type)
			{
				case 'comp':
					$.assertIsNull(comps, 'Illegal token position for "comp"');

					results = comps = $.getCompositions().filter(function (c) {
						return hasAllAttributes(c, part.props);
					});

					break;
					
				case 'layer':
					$.assertIsNull(layers, 'Illegal token position for "layers"');

					results = layers = $.getLayers(comps).filter(function (l) {
						return hasAllAttributes(l, part.props);
					});

					break;

				case 'prop':
					$.assertIsNull(props, 'Illegal token position for "prop"');

					results = props = $.getProperties(layers, { separate : true }).filter(function (p) {
						return hasAllAttributes(p, part.props);
					});

					break;

				case 'keys':
					throw new Error("Not supported yet");

				default:
					throw new Error("Unrecognized token " + part.type);
			}

			parts.shift();
		}
	}


	function ensurePartAt(parts, type, idx)
	{
		if (idx >= parts.length)
			return;

		while (parts[idx].type != type)
		{
			switch(parts[idx].type)
			{
				case 'layer':
					parts.insertAt({ type : 'comp' }, idx);
					break;

				case 'prop':
					parts.insertAt({ type : 'layer' }, idx);
					break;

				case 'key':
					parts.insertAt({ type : 'prop' }, idx);
					break;

				default:
					throw new Error('Invalid selector ' + parts[idx].type);
			}
		}
	}

	function normalize(parts)
	{
		$.arrayEx(parts);

		ensurePartAt(parts, 'comp', 0);
		ensurePartAt(parts, 'layer', 1);
		ensurePartAt(parts, 'prop', 2);
		ensurePartAt(parts, 'key', 3);

		parts.forEach(function(p) {
			p.props = p.props || {};
		});

		return parts;
	}

	function hasAllAttributes(obj, attrs)
	{
		for (var a in attrs)
		{
			if (!obj.hasOwnProperty(a))
				throw new Error('The attribute ' + a + ' does not exist on a ' + typeof(o));

			if (obj[a].toString() != attrs[a].toString())
				return false;
		}

		return true;
	}

	return $.arrayEx(results);
};