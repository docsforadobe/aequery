var aeq = (function (aeq) {
aeq.property = {
	toString: function() {
		return "[object aeq.property]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	valueType: function(property) {
		return aeq.valueInObject(property.propertyValueType || property, PropertyValueType);
	},

	type: function(property) {
		return aeq.valueInObject(property.propertyType || property, PropertyType);
	}
};
aeq.prop = aeq.property;
return aeq;
}(aeq || {}));
