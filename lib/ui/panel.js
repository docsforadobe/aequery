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
			my.set(this.obj, options);
		},

		_add: function(type, options) {
		  if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1)) {
		    options = options.arg1;
				options.arg1 = options.text || options.items;
		  }

			var obj = this.obj.add(type, options.bounds, options.arg1, options.properties);
			my.set(obj, options);
			return obj;
		},

		addButton: function(arg1, onClick, properties) {
			return this._add('button', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addCheckbox: function(arg1, onClick, properties) {
			return this._add('checkbox', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addDropdownList: function(arg1, onChange, properties) {
			return this._add('dropdownlist', {
				arg1: arg1,
				properties: properties,
				onChange: onChange
			});
		},

		addEditText: function(arg1, onChange, onChanging, properties) {
			return this._add('edittext', {
				arg1: arg1,
				properties: properties,
				onChange: onChange,
				onChanging: onChanging
			});
		},

		addGroup: function(options) {
			var group = this.obj.add('group');
			group = new my.Container(group);
			if (options) {
				group.set(options);
			}
			return group;
		},

		addIconButton: function(arg1, onClick, properties) {
			if (aeq.isObject(arg1) && !aeq.isArray(options.arg1) &&
				!(arg1 instanceof File) && !(arg1 instanceof ScriptUIImage)) {
				options = options.arg1;
				options.arg1 = options.text || options.items;
			}

			var obj = this.obj.add(type, options.bounds, options.arg1, options.properties);
			my.set(obj, options);
			return obj;
		},

		addListbox: function(arg1, onChange, onDoubleClick, properties) {
			return this._add('listbox', {
				arg1: arg1,
				properties: properties,
				onChange: onChange,
				onDoubleClick: onDoubleClick
			});
		},

		addPanel : function(arg1, properties) {
			var panel = this._add('panel', {
				arg1: arg1,
				properties: properties,
			});
			return new my.Container(panel);
		},

		addProgressbar: function(value, maxValue) {
			return this.obj.add('progressbar', undefined, value, maxValue);
		},

		addRadioButton: function(arg1, onClick, properties) {
			return this._add('radiobutton', {
				arg1: arg1,
				properties: properties,
				onClick: onClick
			});
		},

		addScrollbar: function(value, maxValue, onChange, onChanging) {
			var scrollbar = this.obj.add('scrollbar', undefined, value, maxValue);
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

		addStatictext: function(arg1, properties) {
			return this._add('statictext', {
				arg1: arg1,
				properties: properties
			});
		},

		addTab: function(text) {
			var tab = this.obj.add('tab', undefined, text);
			return new my.Container(tab);
		},

		addTabbedPanel: function() {
			var tabbedpanel = this.obj.add('tabbedpanel');
			return new my.Container(tabbedpanel);
		},

		addTreeview: function(arg1, onChange, properties) {
			return this._add('treeview', {
				arg1: arg1,
				properties: properties,
				onChange: onChange
			});
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
