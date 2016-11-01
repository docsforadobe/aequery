aeq.ui = (function (ui) {
ui.Container = function(obj) {
	this.obj = obj;
};

ui.Container.prototype = {
	toString: function() {
		return "[object aeq.ui.Container]";
	},

	extend: aeq.extend,

	get : function() {
		return this.obj;
	},

	set: function(options) {
		ui.set(this.obj, options);
	},

	_add: function(type, options) {
		if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1)) {
			options = options.arg1;

			// "items" is used by listbox, dropdownlist and treeview
			// if it is defined, it most likely one of those controls
			options.arg1 = options.items || options.text;
		}

		var obj = this.obj.add(type, options.bounds, options.arg1, options.properties);
		ui.set(obj, options);
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
		group = new ui.Container(group);
		if (options) {
			group.set(options);
		}
		return group;
	},

	addIconButton: function(arg1, onClick, properties) {
		var options = {
			arg1: arg1,
			onClick: onClick,
			properties: properties
		};

		if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1) &&
			!(options.arg1 instanceof File) && options.arg1.format === undefined) {
				// Check options.arg1.format to see if it is ScriptUIImage
			options = options.arg1;
			options.arg1 = options.image || undefined;
		}

		var obj = this.obj.add("iconbutton", options.bounds, options.arg1, options.properties);
		ui.set(obj, options);
		return obj;
	},

	addImage: function(arg1, onClick, properties) {
		var options = {
			arg1: arg1,
			onClick: onClick,
			properties: properties
		};

		if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1) &&
			!(options.arg1 instanceof File) && options.arg1.format === undefined) {
				// Check options.arg1.format to see if it is ScriptUIImage
			options = options.arg1;
			options.arg1 = options.image || undefined;
		}

		var obj = this.obj.add("image", options.bounds, options.arg1, options.properties);
		ui.set(obj, options);
		return obj;
	},

	addListBox: function(arg1, onChange, onDoubleClick, properties) {
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
		return new ui.Container(panel);
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

	addStaticText: function(arg1, properties) {
		return this._add('statictext', {
			arg1: arg1,
			properties: properties
		});
	},

	addTab: function(text) {
		var tab = this.obj.add('tab', undefined, text);
		return new ui.Container(tab);
	},

	addTabbedPanel: function() {
		var tabbedpanel = this.obj.add('tabbedpanel');
		return new ui.Container(tabbedpanel);
	},

	addTreeView: function(arg1, onChange, properties) {
		return this._add('treeview', {
			arg1: arg1,
			properties: properties,
			onChange: onChange
		});
	},

	update: function() {
		this.obj.layout.layout(true);
		this.obj.layout.resize();
	},

	remove: function(obj) {
		if (obj instanceof ui.Container ) {
			obj = obj.obj;
		}
		this.obj.remove(obj);
	},

	removeAll: function() {
		for (var i = this.obj.children.length - 1; i >= 0; i--) {
			this.obj.remove( this.obj.children[i] );
		}
	}
};

// Aliases, backwards compatible
ui.Container.prototype.addListbox = ui.Container.prototype.addListBox;
ui.Container.prototype.addStatictext = ui.Container.prototype.addStaticText;
ui.Container.prototype.addTreeview = ui.Container.prototype.addTreeView;

(function createControllerSetters() {
	var oneParameters = ['enabled', 'helpTip', 'orientation', 'text', 'visible'],
		twoParameters = [
			'alignChildren',
			'alignment',
			'location',
			'maximumSize',
			'minimumSize',
			'preferredSize',
			'size'
		],
		fourParameters = ['bounds', 'margins'];

	aeq.forEach(oneParameters, function(type) {
		ui.Container.prototype[type] = function(newValue) {
			if ( newValue === undefined ) {
				return this.obj[type];
			}
			this.obj[type] = newValue;
		};
	});

	function multiParameter(type, numParameters) {
		return function(newValue) {
			if ( newValue === undefined ) {
				return this.obj[type];
			}
			newValue = arguments.length === numParameters ? Array.apply(null, arguments) : arguments[0];
			this.obj[type] = newValue;
		};
	}

	aeq.forEach(twoParameters, function(type) {
		ui.Container.prototype[type] = multiParameter(type, 2);
	});

	aeq.forEach(fourParameters, function(type) {
		ui.Container.prototype[type] = multiParameter(type, 4);
	});

})();

return ui;
}(aeq.ui || {}));
