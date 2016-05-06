var aeq = (function (aeq) {
aeq.extend({
	assertIsNull: function (arr, err) {
		if (arr)
			throw new Error(err);
	},

	assertIsNotNull: function (arr, err) {
		if (!arr)
			throw new Error(err);
	}
});

return aeq;
}(aeq || {}));
