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
		var ret = true, len, pseudo;
		if (!hasAllAttributes(obj, part.props, false)) {
			return false;
		}
		if (!part.pseudo) {
			return true;
		}
		len = part.pseudo.length;

		for (var i = 0; i < len; i++) {
			pseudo = part.pseudo[i];

			if (pseudo.type === "not") {
				ret = hasAllAttributes(obj, pseudo.props, true);
			} else if (pseudo.type === "is") {
				ret = hasAllAttributes(obj, pseudo.props, false);
			}

			if (ret === false) {
				return false;
			}
		}
		return true;
	}

	return aeq.arrayEx(results);
};


function hasAllAttributes(obj, attributes, not)
{
	for (var attribute in attributes)
	{
		if (!obj.hasOwnProperty(attribute))
			throw new Error('The attribute ' + attribute + ' does not exist on a ' + typeof(obj));

		if (obj[attribute].toString() == attributes[attribute].value.toString()) {
			if (not) {
				return false;
			}
		} else if (not === false) {
			return false;
		}
	}

	return true;
}
return aeq;
}(aeq || {}));
