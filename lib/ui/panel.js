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
		get : function() {
			return this.obj;
		},

		set: function(options) {
			for (var option in options) {
				if (this.obj.hasOwnProperty(option)) {
					this.obj[option] = options[option];
				}
			}
		},

		addButton : function(title, callback)
		{
			var btn = this.obj.add('button', undefined, title);
			btn.onClick = callback;
			return btn;
		},

		addCheckbox: function(text, callback) {
			var checkbox = this.obj.add('checkbox', undefined, text);
			checkbox.onClick = callback;
			return checkbox;
		},

		addDropdownList: function(items, callback) {
			var dropdownlist = this.obj.add('dropdownlist', undefined, items);
			dropdownlist.onChange = callback;
			return dropdownlist;
		},

		addEditText : function(title, callback)
		{
			var et = this.obj.add('edittext', undefined, title);
			return et;
		},

		addGroup : function() {
			var group = this.obj.add('group');
			return new my.Container(group);
		},

		addIconButton: function(icon, creationProperties, callback) {
			var iconButton = this.obj.add('iconbutton', undefined, icon, creationProperties);
			iconButton.onClick = callback;
			return iconButton;
		},

		addListbox: function(items, creationProperties, onChange, onDoubleClick) {
			var listbox = this.obj.add('listbox', undefined, items, creationProperties);
			listbox.onChange = onChange;
			listbox.onDoubleClick = onDoubleClick;
			return listbox;
		},

		addPanel : function(title, creationProperties) {
			var panel = this.obj.add('panel', undefined, title, creationProperties);
			return new my.Container(panel);
		},

		addProgressbar: function(value, maxValue) {
			var progressbar = this.obj.add('progressbar', undefined, value, maxValue);
			return progressbar;
		},

		addRadioButton: function(title, callback) {
			var radiobutton = this.obj.add('radiobutton', undefined, title);
			radiobutton.onClick = callback;
			return radiobutton;
		},

		addScrollbar: function(bounds, value, minValue, maxValue, onChange, onChanging) {
			var scrollbar = this.obj.add('scrollbar', bounds, value, minValue, maxValue);
			scrollbar.onChange = onChange;
			scrollbar.onChanging = onChanging;
			return scrollbar;
		},

		addSlider: function(value, minValue, maxValue, onChange, onChanging) {
			var slider = this.obj.add('slider', undefined, value, minValue, maxValue);
			slider.onChange = onChange;
			slider.onChanging = onChanging;
			return slider;
		},

		addStatictext: function(text, creationProperties) {
			var statictext = this.obj.add('statictext', undefined, text, creationProperties);
			return statictext;
		},

		addTab: function(text) {
			var tab = this.obj.add('tab', undefined, text);
			return new my.Container(tab);
		},

		addTabbedPanel: function() {
			var tabbedpanel = this.obj.add('tabbedpanel');
			return new my.Container(tabbedpanel);
		},

		addTreeview: function(items, callback) {
			var treeview = this.obj.add('treeview', undefined, items);
			treeview.onChange = callback;
			return treeview;
		},



		// Set options

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
