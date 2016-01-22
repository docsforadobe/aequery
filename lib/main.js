/*jslint browser: true*/

/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = function(selector) {
	'use strict';

	if (my.isNullOrUndefined(selector))
		return selector;

	if (selector._isAeq)
		return selector;

	var result;

	if (my.isString(selector))
	{
		result = my.select(selector);
	}
	else if (my.isArray(selector))
	{
		result = my.arrayEx(selector);
	}
	else
	{
		return selector;
	}

	result._isAeq = true;

	return result;
};

var _ = aeq; 
