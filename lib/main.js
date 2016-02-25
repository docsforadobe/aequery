/*jslint browser: true*/

/*global $, cssselector, alert, timeToCurrentFormat, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aeq = function(o) {
	'use strict';

	if (aeq.isNullOrUndefined(o))
		return o;

	var result;

	if (aeq.isAeq(o))
	{
		result = o;
	}
	else if (aeq.isString(o))
	{
		result = aeq.select(o);
	}
	else if (aeq.isArray(o))
	{
		result = aeq.arrayEx(o);
	}
	else if (aeq.isApp(o))
	{
		result = aeq.appEx(o);
	}
	else if (aeq.isComp(o))
	{
		result = aeq.compEx(o);
	}
	else if (aeq.isProperty(o))
	{
		result = aeq.propertyEx(o);
	}

	result.aeq = true;

	return result;
};

aeq.thisObj = this;
var _ = aeq;
