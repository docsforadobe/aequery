/*jslint browser: true*/

var aeq = function(selector) {
	'use strict';

	if (aeq.isNullOrUndefined(selector))
		return selector;

	var result;

	if (aeq.isAeq(selector))
	{
		result = selector;
	}
	else if (aeq.isString(selector))
	{
		result = aeq.select(selector);
	}
	else if (aeq.isArray(selector))
	{
		result = aeq.arrayEx(selector);
	}
	else if (aeq.isApp(selector))
	{
		result = aeq.appEx(selector);
	}
	else if (aeq.isComp(selector))
	{
		result = aeq.compEx(selector);
	}
	else if (aeq.isProperty(selector))
	{
		result = aeq.propertyEx(selector);
	}

	result.aeq = true;

	return result;
};

aeq.thisObj = this;
var _ = aeq;
