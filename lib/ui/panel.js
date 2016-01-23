aeq.ui = (function (my) {
	my.createMainWindow = function(title, opt) {
		opt = opt || { resizeable : true };

		var root = (aeq.thisObj instanceof Panel) ? aeq.thisObj : new Window("palette", title, undefined, opt);

		aeq.ui.root = root;

		return new my.MainWin(root);
	};

	my.ready = function(callback) {
		callback();
	};

	my.MainWin = function (obj)
	{
		this.obj = obj;
	};

	my.MainWin.prototype = {
		get : function() { return this.obj; },

		addButton : function(title, callback)
		{
			var btn = this.obj.add('button', undefined, title);
			btn.onClick = callback;
			return btn;
		},

		addEditText : function(title, callback)
		{
			var et = this.obj.add('edittext', undefined, title);
			return et;
		},

		show : function() {
			this.obj.layout.layout(true);
			this.obj.layout.resize();
			this.obj.onResizing = this.obj.onResize = function() {this.layout.resize();};
			if (this.obj instanceof Window)
				this.obj.show();
		},

		hide : function() {
			if (this.obj instanceof Window)
				this.obj.hide();
		}
	};

	return my;
}(aeq.ui || {}));
