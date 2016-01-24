/*jslint browser: true*/

/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = function(o) {
	'use strict';

	if (my.isNullOrUndefined(o))
		return o;

	var result;

	if (my.isAeq(o))
	{
		result = o;
	}
	else if (my.isString(o))
	{
		result = my.select(o);
	}
	else if (my.isArray(o))
	{
		result = my.arrayEx(o);
	}
	else if (my.isApp(o))
	{
		result = my.appEx(o);
	}
	else if (my.isComp(o))
	{
		result = my.compEx(o);
	}
	else if (my.isProperty(o))
	{
		result = my.propertyEx(o);
	}

	result.aeq = true;

	return result;
};

aeq.thisObj = this;
var _ = aeq; 