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
		var unshifted = false;

		switch (part.type) {
			case 'activecomp':
				results = filterResults(aeq.arrayEx([aeq.getActiveComposition()]));
				results.type = "comp";
				break;
			case 'composition':
			case 'comp':
				results = filterResults(aeq.getCompositions());
				results.type = "comp";
				break;

			case 'layer':
				if (results.type === "comp" || aeq.isComp(results[0])) {
					results = filterResults(aeq.getLayers(results));
					results.type = "layer";
				} else if (results.type !== "comp") {
					parts.unshift({ type : 'comp' });
					unshifted = true;
				}
				break;

			case 'propertygroup':
			case 'propgrp':
			case 'propgroup':
				if ( results.type === "layer" || results.type === "propertygroup" ||
					aeq.isLayer(results[0]) || aeq.isPropertyGroup(results[0])) {
					results = filterResults(aeq.getProperties(results,
						{ separate : false, groups: true, props: false }));
					results.type = "propertygroup";
				} else if (results.type !== "layer") {
					parts.unshift({ type : 'layer' });
					unshifted = true;
				}
				break;

			case 'property':
			case 'prop':
				if (results.type === "layer" || results.type === "propertygroup" ||
					aeq.isLayer(results[0]) || aeq.isPropertyGroup(results[0])) {
					results = filterResults(aeq.getProperties(results, { separate : false }));
					results.type = "property";
				} else if (results.type !== "layer") {
					parts.unshift({ type : 'layer' });
					unshifted = true;
				}
				break;

			case 'effect':
				if (results.type === "layer" || aeq.isLayer(results[0]) ) {
					results = filterResults(aeq.getEffects(results));
					results.type = "effect";
				} else if (results.type !== "layer") {
					parts.unshift({ type : 'layer' });
					unshifted = true;
				}
				break;

			case 'key':
			case 'keys':
				if (results.type === "property" || aeq.isProperty(results[0]) ) {
					results = filterResults(aeq.getKeys(results));
					results.type = "key";
				} else if (results.type !== "property") {
					parts.unshift({ type : 'property' });
					unshifted = true;
				}
				break;

			default:
				throw new Error("Unrecognized token " + part.type);
		}
		if (!unshifted) {
			parts.shift();
		}
	}
	function filterResults(arr) {

		// Only filter if there is something to filter
		if (part.props || part.pseudo) {
			return arr.filter(filter);
		}
		return arr;
	}

	function filter(obj) {
		var ret = true, len, pseudo;
		if (part.props !== null) {
			if (!hasAllAttributes(obj, part.props, false)) {
				return false;
			}
		}
		if (!part.pseudo) {
			return true;
		}
		len = part.pseudo.length;

		for (var i = 0; i < len; i++) {
			pseudo = part.pseudo[i];

			if (pseudo.type === "not" || pseudo.type === "isnot") {
				ret = hasAllAttributes(obj, pseudo.props, true);
			} else if (pseudo.type === "is" || pseudo.type === "has") {
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


function hasAllAttributes(obj, attributes, not) {
	var attributeValue;
	for (var attribute in attributes) {
		attributeValue = attributes[attribute];
		if (!obj.hasOwnProperty(attribute)) {
			throw new Error('The attribute ' + attribute + ' does not exist on a ' + typeof(obj));
		}

		var isSame = compare(attributeValue, obj[attribute]);

		// Return false if it is the same and it should not be,
		// or if it isn't the same and it should be
		if ((isSame && not) || (!isSame && not === false)) {
			return false;
		}
	}
	return true;
}

function compare(value, attribute) {
	if (value.type === "Array") {
		return valueInArray(value, attribute);
	} else if (value.type === "RegExp") {
		return value.value.test(attribute);

	// For numbers, strings, booleans etc.
	} else {
		return value.value.toString() === attribute.toString();
	}
}

function valueInArray(value, attribute) {
	// Check if value is in array
	for (var i = 0, il = value.value.length; i < il; i++) {
		if (compare(value.value[i], attribute)) {
			return true;
		}
	}
	return false;
}

return aeq;
}(aeq || {}));
