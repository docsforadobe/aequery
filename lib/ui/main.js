aeq.ui = (function (ui) {
ui.createMainWindow = function(title, opt) {
	opt = opt || { resizeable : true };

	var root = (aeq.thisObj instanceof Panel) ? aeq.thisObj : new Window("palette", title, undefined, opt);

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
		if (option !== 'properties' && option !== 'arg1') {
			obj[option] = options[option];
		}
	}
};

return ui;
}(aeq.ui || {}));
