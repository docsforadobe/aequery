var aeq = (function (aeq) {
aeq.extend({

	/**
	 * Checks if value is null. Throws an error if it is not.
	 * @method
	 * @memberof aeq
	 * @param  {Any} o   The value to check against null.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsNull: function (o, err) {
		if (aeq.isNullOrUndefined(o))
			return true;

		throw new Error(err);
	},

	/**
	 * Checks if value is null. Throws an error if it is.
	 * @method
	 * @memberof aeq
	 * @param  {Any} o   The value to check against null.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsNotNull: function (o, err) {
		if (!aeq.isNullOrUndefined(o))
			return true;

		throw new Error(err);
	},

	/**
	 * Checks if value is `true`. Throws an error if it is not.
	 * @method
	 * @memberof aeq
	 * @param  {Any} o   The value to check against `true`.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsTrue: function (o, err) {
		if (o === true)
			return true;

		throw new Error(err);
	},

	/**
	 * Checks if value is `false`. Throws an error if it is not.
	 * @method
	 * @memberof aeq
	 * @param  {Any} o   The value to check against `false`.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsFalse: function (o, err) {
		if (o === false)
			return true;

		throw new Error(err);
	},

	/**
	 * Checks if array is empty. Throws an error if it is not.
	 * @method
	 * @memberof aeq
	 * @param  {Array} o   The array to check is empty.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsEmpty: function (o, err) {
		if (aeq.isEmpty(o))
			return true;

		throw new Error(err);
	},

	/**
	 * Checks if array is empty. Throws an error if it is.
	 * @method
	 * @memberof aeq
	 * @param  {Array} o   The array to check is empty.
	 * @param  {String} err The error message to throw
	 * @return {Boolean} `true` if no error was thrown
	 */
	assertIsNotEmpty: function (o, err) {
		if (!aeq.isEmpty(o))
			return true;

		throw new Error(err);
	}
});

return aeq;
}(aeq || {}));
