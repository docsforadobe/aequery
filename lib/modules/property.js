var aeq = (function (aeq) {
/**
 * [property description]
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
	 * [description]
	 * @method
	 * @memberof aeq.property
	 * @param  {type} property [description]
	 * @return {type}          [description]
	 */
	valueType: function(property) {
		return aeq.valueInObject(property.propertyValueType || property, PropertyValueType);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq.property
	 * @param  {type} property [description]
	 * @return {type}          [description]
	 */
	type: function(property) {
		return aeq.valueInObject(property.propertyType || property, PropertyType);
	}
};

// Function aliases
aeq.prop = aeq.property;

return aeq;
}(aeq || {}));
