aeq = (function (aeq) {
aeq.extend({
	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} value [description]
	 * @param  {type} obj   [description]
	 * @return {type}       [description]
	 */
	valueInObject: function(value, obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (value === obj[key]) {
					return key;
				}
			}
		}
		return undefined;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} property [description]
	 * @return {type}          [description]
	 */
	propertyType: function(property) {
		// Uses the propertyType attribute if it is not undefined
		return aeq.valueInObject(property.propertyType || property, PropertyType);
	}
});

// Function aliases

return aeq;
}(aeq || {}));
