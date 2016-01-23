/*jslint browser: true*/

/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = function(selector) {
	if (aeq.isNullOrUndefined(selector))
		return selector;

	if (selector._isAeq)
		return selector;

	var result;

	if (aeq.isString(selector))
	{
		result = aeq.select(selector);
	}
	else if (aeq.isArray(selector))
	{
		result = aeq.arrayEx(selector);
	}
	else
	{
		return selector;
	}

	result._isAeq = true;

	return result;
};

aeq.thisObj = this;
var _ = aeq;
