var aeq = (function (aeq) {
aeq.extend({
	assertIsNull: function (o, err) {
		if (aeq.isNullOrUndefined(o))
			return true;

		throw new Error(err);
	},

	assertIsNotNull: function (o, err) {
		if (!aeq.isNullOrUndefined(o))
			return true;

		throw new Error(err);
	},

	assertIsTrue: function (o, err) {
		if (o === true)
			return true;

		throw new Error(err);
	},

	assertIsFalse: function (o, err) {
		if (o === false)
			return true;

		throw new Error(err);
	},

	assertIsEmpty: function (o, err) {
		if (aeq.isEmpty(o))
			return true;

		throw new Error(err);
	},

	assertIsNotEmpty: function (o, err) {
		if (!aeq.isEmpty(o))
			return true;

		throw new Error(err);
	}
});

return aeq;
}(aeq || {}));
