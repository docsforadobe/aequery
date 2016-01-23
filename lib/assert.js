var aeq = (function (my) {
	my.assertIsNull = function (arr, err) {
		if (arr)
			throw new Error(err);
	};


	my.assertIsNotNull = function (arr, err) {
		if (!arr)
			throw new Error(err);
	};

	return my;
}(aeq));
