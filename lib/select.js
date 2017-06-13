/*jslint browser: true*/

aeq = (function(aeq) {

/**
 * @typedef {String} aeq.SelectorString
 * @description The selectorString has 3 expression types:
 *
 * - type
 * - props
 * - pseudo
 *
 * #### Type
 *
 * The type of object to find, one of:
 *
 * - `item`: Finds items in the project panel
 * - `activecomp`: Finds the active composition
 * - `comp`/`composition`: Finds CompItems
 * - `layer`: Finds Layers
 * - `propertygroup`/`propgrp`/`propgroup`: Finds property groups
 * - `prop`/`property`: Finds properties`
 * - `effect`: Finds effects property groups
 * - `key`: Finds keyframes on properties. Returns aeq.Key objects
 *
 * The types can be chained after each other, but must be in the order above,
 * but all of them are optional. Only the objects of the last specified `type`
 * will be returned.
 *
 * Type is the only expression type that is required. All other expression
 * types are optional.
 *
 * #### Props
 * written right after the type, without a space, and inside square brackes
 * (`[ ]`). The props are a list attribute names and values, separated by `=`.
 * The objects must have an attribute with the specified value to qualify as
 * a match. Attributes are separated by a space.
 *
 * #### Pseudo
 * Psoudo are a bit like `props` but start with a colon, `:`, followed by a
 * keyword specifying how the attributes should match. The attributes are
 * placed inside parenthesis `()`.
 *
 * The keywords that are currently supported are:
 *
 * - `:is()`: all attributes must match.
 * - `:has()`: same as `:is()`
 * - `:not()`: objects should not have any attributes matching the props.
 * - `:isnot()`: same as `:not()`
 *
 * Psoudo selectors can be chained.
 *
 * @example <caption>Get all comps with width and height of 1920x1080</caption>
 *     aeq("comp[width=1920 heigth=1080]")
 *
 * @example <caption>Get all properties of layers that are selected and
 *          does not have audio:</caption>
 *     aeq("layer[selected hasAudio=false] prop")
 *
 * @example <caption>Get properties that have `PropertyValueType.OneD` and are
 *          not selected.</caption>
 *     aeq("prop[propertyValueType=" + PropertyValueType.OneD + "]:not(selected)");
 *
 * @example <caption>Get layers that do not have audio inside comps
 *          that are selected:</caption>
 *    aeq("comp:is(selected) layer:not(hasAudio)")
 */

/**
 * Gets objects by looking at a string and finding objects in After Effects
 * matching the description. The context is used to determine a starting point
 * for where the function starts looking for elements.
 * @memberof aeq
 * @method
 * @param  {aeq.SelectorString} selector A string containing a
 *         selector expression
 * @param  {CompItem|FolderItem|Layer|PropertyGroup|Array} [context] The object
 *         to start looking from
 * @return {ArrayEx} The found After Effects objects
 */
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

			case 'item':
				results = filterResults(aeq.getItems());
				results.type = "item";
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
		if (!attributes.hasOwnProperty(attribute)) {
			continue;
		}

		if (!obj.hasOwnProperty(attribute)) {

			// Something weird is going on and this attribute is sometimes included
			// incorrectly on objects.
			if (attribute === 'nsSetTip') {
				continue;
			}
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
