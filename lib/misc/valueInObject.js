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
	}
});

// Function aliases

return aeq;
}(aeq || {}));
