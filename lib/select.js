/*jslint browser: true*/

aeq = (function(aeq) {
aeq.select = function (selector)
{
	var results = [];

	var parsedSelector = cssselector.parse(selector);
	var parts = normalize(parsedSelector);

	var comps = null;
	var layers = null;
	var props = null;
	var effects = null;

	while (parts.length > 0)
	{
		var part = parts[0];

		switch (part.type)
		{
			case 'composition':
			case 'comp':
				aeq.assertIsNull(comps, 'Illegal token position for "' + part.type + '"');

				results = comps = aeq.getCompositions().filter(function (comp) {
					return hasAllAttributes(comp, part.props);
				});

				break;

			case 'layer':
				aeq.assertIsNull(layers, 'Illegal token position for "layers"');

				results = layers = aeq.getLayers(comps).filter(function (layer) {
					return hasAllAttributes(layer, part.props);
				});

				break;

			case 'property':
			case 'prop':
				aeq.assertIsNull(props, 'Illegal token position for "' + part.type + '"');

				results = props = aeq.getProperties(layers, { separate : false }).filter(function (property) {
					return hasAllAttributes(property, part.props);
				});

				break;

			case 'effect':
				aeq.assertIsNull(effects, 'Illegal token position for "' + part.type + '"');

				results = effects = aeq.getEffects(layers).filter(function (effect) {
					return hasAllAttributes(effect, part.props);
				});

				break;

			case 'keys':
				throw new Error("Not supported yet");

			default:
				throw new Error("Unrecognized token " + part.type);
		}

		parts.shift();
	}

	return aeq.arrayEx(results);
};

function ensurePartAt(parts, type, index)
{
	if (index >= parts.length)
		return;
	type = aeq.arrayEx(type);
	while (type.indexOf(parts[index].type) <= -1)
	{
		switch(parts[index].type)
		{
			case 'layer':
				parts.insertAt({ type : 'comp' }, index);
				break;

			case 'property':
			case 'prop':
			case 'effect':
				parts.insertAt({ type : 'layer' }, index);
				break;

			case 'key':
				parts.insertAt({ type : 'prop' }, index);
				break;

			default:
				throw new Error('Invalid selector ' + parts[index].type);
		}
	}
}

function normalize(parts)
{
	aeq.arrayEx(parts);

	ensurePartAt(parts, ['comp', 'composition'], 0);
	ensurePartAt(parts, ['layer'], 1);
	ensurePartAt(parts, ['prop', 'property', 'effect'], 2);
	ensurePartAt(parts, ['key'], 3);

	parts.forEach(function(part) {
		part.props = part.props || {};
	});

	return parts;
}

function hasAllAttributes(obj, attributes)
{
	for (var attribute in attributes)
	{
		if (!obj.hasOwnProperty(attribute))
			throw new Error('The attribute ' + attribute + ' does not exist on a ' + typeof(obj));

		if (obj[attribute].toString() != attributes[attribute].value.toString())
			return false;
	}

	return true;
}
return aeq;
}(aeq || {}));
