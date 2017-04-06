aeq.ui = (function (ui) {
ui.createMainWindow = function(thisObj, title, opt) {
	if (aeq.isPanel(thisObj)) {
		return new ui.Window(thisObj);
	}

	if (aeq.isString(thisObj)) {
		opt = title;
		title = thisObj;
	}
	opt = opt || { resizeable : true };

	var root = new Window("palette", title, undefined, opt);

	aeq.ui.root = root;

	return new ui.Window(root);
};

ui.createWindow = function(title, options) {
	options = options || { resizeable : true };
	var newWindow = new Window("palette", title, undefined, options);
	return new ui.Window(newWindow);
};

ui.createDialog = function(title, options) {
	options = options || { resizeable : true };
	var newWindow = new Window("dialog", title, undefined, options);
	return new ui.Window(newWindow);
};

ui.ready = function(callback) {
	callback();
};

ui.set = function(obj, options) {
	for (var option in options) {
		if (options.hasOwnProperty(option) && option !== 'properties' && option !== 'arg1') {
			obj[option] = options[option];
		}
	}
};

return ui;
}(aeq.ui || {}));
