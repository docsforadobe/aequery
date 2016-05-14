aeq = (function (aeq) {
aeq.extend({
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

	propertyType: function(property) {
		// Uses the propertyType attribute if it is not undefined
		return aeq.valueInObject(property.propertyType || property, PropertyType);
	}
});

// Function aliases

return aeq;
}(aeq || {}));
