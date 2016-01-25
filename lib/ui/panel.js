aeq.ui = (function (my) {
	my.createMainWindow = function(title, opt) {
		opt = opt || { resizeable : true };

		var root = (aeq.thisObj instanceof Panel) ? aeq.thisObj : new Window("palette", title, undefined, opt);

		aeq.ui.root = root;

		return new my.Window(root);
	};

	my.ready = function(callback) {
		callback();
	};

	my.Container = function(obj) {
		this.obj = obj;
	};

	my.Container.prototype = {
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

		addGroup : function(creationProperties) {
			var group = this.obj.add('group', undefined, creationProperties);
			return new my.Container(group);
		},

		addPanel : function(title, creationProperties) {
			var panel = this.obj.add('panel', undefined, title, creationProperties);
			return new my.Container(panel);
		},

		alignment: function() {
			var newValue = arguments.length === 2 ? Array.apply(null, arguments) : arguments[0];
			this.obj.alignment = newValue;
		},

		alignChildren: function() {
			var newValue = arguments.length === 2 ? Array.apply(null, arguments) : arguments[0];
			this.obj.alignChildren = newValue;
		},

		orientation: function(orientation) {
			this.obj.orientation = orientation;
		},

		set: function(options) {
			for (var option in options) {
				if (this.obj.hasOwnProperty(option)) {
					this.obj[option] = options[option];
				}
			}
		},

		helpTip: function(helpTipString) {
			this.obj.helpTip = helpTipString;
		}

	};

	my.Window = function (obj)
	{
		this.obj = obj;
	};

	my.Window.prototype = my.Container.prototype;

	my.Window.prototype.show = function() {
		this.obj.layout.layout(true);
		this.obj.layout.resize();
		this.obj.onResizing = this.obj.onResize = function() {this.layout.resize();};
		if (this.obj instanceof Window)
			this.obj.show();
	};

	my.Window.prototype.hide = function() {
		if (this.obj instanceof Window)
			this.obj.hide();
	};

	return my;
}(aeq.ui || {}));
