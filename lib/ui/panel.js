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
			my.set(this.obj, options);
		},

		_add: function(type, options) {
			var obj = this.obj.add(type, options.bounds, options.text, options.properties);
			my.set(obj, options);
			return obj;
		},

		addButton : function(text, properties, onClick) {
			if (typeof text === 'string') {
				return this._add('button', {
					text: text,
					properties: properties,
					onClick: onClick
				});
		  } else if (typeof text === 'object' && !Array.isArray(text)) {
		    return this._add('button', text);
		  }
		  return this._add('button', {});
		},

		addCheckbox: function(text, properties, onClick) {
			if (typeof text === 'string') {
				return this._add('checkbox', {
					text: text,
					properties: properties,
					onClick: onClick
				});
			} else if (typeof text === 'object' && !Array.isArray(text)) {
				return this._add('checkbox', text);
			}
			return this._add('checkbox', {});
		},

		addDropdownList: function(items, properties, onChange) {
			if (Array.isArray(items)) {
				return this._add('dropdownlist', {
					text: items,
					properties: properties,
					onChange: onChange
				});
			} else if (typeof text === 'object') {
				return this._add('dropdownlist', text);
			}
			return this._add('dropdownlist', {});
		},

		addEditText : function(text, properties, onChange, onChanging) {
			if (typeof text === 'string') {
				return this._add('edittext', {
					text: text,
					properties: properties,
					onChange: onChange,
					onChanging: onChanging
				});
			} else if (typeof text === 'object' && !Array.isArray(text)) {
				return this._add('edittext', text);
			}
			return this._add('edittext', {});
		},

		addGroup : function(options) {
			var group = this.obj.add('group');
			group = new my.Container(group);
			if (options) {
				group.set(options);
			}
			return group;
		},

		addIconButton: function(icon, properties, onClick) {
			if (typeof icon === 'string' || icon instanceof File) {
				return this._add('iconbutton', {
					text: icon,
					properties: properties,
					onClick: onClick
				});
			} else if (typeof icon === 'object' && !Array.isArray(icon)) {
				return this._add('iconbutton', text);
			}
			return this._add('iconbutton', {});
		},

		addListbox: function(items, properties, onChange, onDoubleClick) {
			if (Array.isArray(items)) {
				return this._add('listbox', {
					text: items,
					properties: properties,
					onChange: onChange,
					onDoubleClick: onDoubleClick
				});
			} else if (typeof items === 'object') {
				return this._add('listbox', items);
			}
			return this._add('listbox', {});
		},

		addPanel : function(text, properties) {
			var panel;
			if (typeof text === 'string') {
				panel = this._add('panel', {
					text: text,
					properties: properties,
				});
			} else if (typeof text === 'object' && !Array.isArray(text)) {
				panel = this._add('panel', text);
			}
			panel = this._add('panel', {});
			return new my.Container(panel);
		},

		addProgressbar: function(value, maxValue) {
			var progressbar = this.obj.add('progressbar', undefined, value, maxValue);
			return progressbar;
		},

		addRadioButton: function(text, properties, onClick) {
			if (typeof text === 'string') {
				return this._add('radiobutton', {
					text: text,
					properties: properties,
					onClick: onClick
				});
			} else if (typeof text === 'object' && !Array.isArray(text)) {
				return this._add('radiobutton', text);
			}
			return this._add('radiobutton', {});
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

		addStatictext: function(text, properties) {
			if (typeof text === 'string') {
				return this._add('statictext', {
					text: text,
					properties: properties,
				});
			} else if (typeof text === 'object' && !Array.isArray(text)) {
				return this._add('statictext', text);
			}
			return this._add('statictext', {});
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
