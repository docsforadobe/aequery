var aeq = (function (aeq) {
aeq.assertIsNull = function (arr, err) {
	if (arr)
		throw new Error(err);
};


aeq.assertIsNotNull = function (arr, err) {
	if (!arr)
		throw new Error(err);
};

return aeq;
}(aeq || {}));
