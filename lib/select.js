/*jslint browser: true*/

aeq = (function(aeq) {
aeq.select = function (selector, context) {
	var results = [];

	var parsedSelector = cssselector.parse(selector);
	var parts = parsedSelector;

	if (context !== undefined) {
		if (aeq.isString(context)) {
			results = aeq.select(context);
		} else if (aeq.isArray(context)) {
			results = context;
		} else {
			results = [context];
		}
	}

	while (parts.length > 0) {
		var part = parts[0];

		// FIXME: If no props is specified in the selector the parser sets props to null
		part.props = part.props || {};

		switch (part.type)
		{
			case 'composition':
			case 'comp':
				results = aeq.getCompositions().filter(filter);
				results.type = "comp";
				parts.shift();
				break;

			case 'layer':
				if (results[0] && aeq.isComp(results[0])) {
					results = aeq.getLayers(results).filter(filter);
					results.type = "layer";
					parts.shift();
				} else if (results.type !== "comp") {
					parts.unshift({ type : 'comp', props: {} });
				}
				break;

			case 'property':
			case 'prop':
				// TODO: Consider checking if is layer or propertyGroup instead
				if (results[0] && (aeq.isLayer(results[0]) || aeq.isProperty(results[0])) ) {
					results = aeq.getProperties(results, { separate : false })
						.filter(filter);
					results.type = "property";
					parts.shift();
				} else if (results.type !== "layer") {
					parts.unshift({ type : 'layer', props: {} });
				}
				break;

			case 'effect':
				if (results[0] && (aeq.isLayer(results[0])) ) {
					results = aeq.getEffects(results).filter(filter);
					results.type = "effect";
					parts.shift();
				} else if (results.type !== "layer") {
					parts.unshift({ type : 'layer', props: {} });
				}
				break;

			case 'keys':
				throw new Error("Not supported yet");

			default:
				throw new Error("Unrecognized token " + part.type);
		}
	}

	function filter(obj) {
		return hasAllAttributes(obj, part.props);
	}

	return aeq.arrayEx(results);
};


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
