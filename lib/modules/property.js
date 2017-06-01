var aeq = (function (aeq) {
/**
 * Module for dealing with Property objects.
 * @namespace aeq.property
 * @memberof aeq
 * @type {Object}
 */
aeq.property = {
	toString: function() {
		return "[object aeq.property]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	/**
	 * Returns the property value type of a Property as a string.
	 * @method
	 * @memberof aeq.property
	 * @param  {Property} property The property to get the value type of.
	 * @return {string}          The property value type, on of:
	 *
	 * - `NO_VALUE`: Stores no data.
	 * - `ThreeD_SPATIAL`: Array of three floating-point positional values.
	 *    For example, an Anchor Point value might be `[10.0, 20.2, 0.0]`
	 * - `ThreeD`: Array of three floating-point quantitative values.
	 *    For example, a Scale value might be `[100.0, 20.2, 0.0]`
	 * - `TwoD_SPATIAL`: Array of 2 floating-point positional values.
	 *    For example, an Anchor Point value might be `[5.1, 10.0]`
	 * - `TwoD`: Array of 2 floating-point quantitative values.
	 *    For example, a Scale value might be `[5.1, 100.0]`
	 * - `OneD`: A floating-point value.
	 * - `COLOR`:Array of 4 floating-point values, in the range `[0.0..1.0]`.
	 *    For example, `[0.8, 0.3, 0.1, 1.0]`
	 * - `CUSTOM_VALUE`: Custom property value, such as the Histogram
	 *    property for the Levels effect.
	 * - `MARKER`: MarkerValue object
	 * - `LAYER_INDEX`: Integer; a value of `0` means no layer.
	 * - `MASK_INDEX`: Integer; a value of `0` means no mask.
	 * - `SHAPE`: Shape object
	 * - `TEXT_DOCUMENT`: TextDocument object
	 *
	 * @example <caption>Returns "ThreeD_SPATIAL"</caption>
	 * aeq.property.valueType( layer.Transform.Position )
	 */
	valueType: function(property) {
		return aeq.valueInObject(property.propertyValueType || property, PropertyValueType);
	},

	/**
	 * Returns the property type as a string.
	 * @method
	 * @memberof aeq.property
	 * @param  {Property} property The property to get the type of
	 * @return {string}          The property type, on of:
	 *
	 * - `PROPERTY`: A single property such as position or zoom.
	 * - `INDEXED_GROUP`: A property group whose members have an editable name
	 *   and an index. Effects and masks are indexed groups. For example,
	 *   the masks property of a layer refers to a variable number of individual
	 *   masks by index number.
	 * - `NAMED_GROUP`: A property group in which the member names are not
	 *    editable. Layers are named groups.
	 */
	type: function(property) {
		return aeq.valueInObject(property.propertyType || property, PropertyType);
	}
};

// Function aliases
aeq.prop = aeq.property;

return aeq;
}(aeq || {}));
