aeq.ui = (function (my) {
	my.createMainWindow = function(title, opt) {
		opt = opt || { resizeable : true };

		var root = (aeq.thisObj instanceof Panel) ? aeq.thisObj : new Window("palette", title, undefined, opt);

		aeq.ui.root = root;

		return new my.Window(root);
	};

	my.createWindow = function(title, options) {
		options = options || { resizeable : true };
		var newWindow = new Window("palette", title, undefined, options);
		return new my.Window(newWindow);
	};

	my.createDialog = function(title, options) {
		options = options || { resizeable : true };
		var newWindow = new Window("dialog", title, undefined, options);
		return new my.Window(newWindow);
	};

	my.ready = function(callback) {
		callback();
	};

	my.set = function(obj, options) {
		for (var option in options) {
			if (option !== 'properties' && option !== 'arg1') {
				obj[option] = options[option];
			}
		}
	};

	return my;
}(aeq.ui || {}));
