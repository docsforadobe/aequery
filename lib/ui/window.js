aeq.ui = (function (ui) {
ui.Window = function (obj) {
	this.obj = obj;
};

ui.Window.prototype = ui.Container.prototype;

ui.Window.prototype.show = function() {
	this.obj.layout.layout(true);
	this.obj.layout.resize();
	this.obj.onResizing = this.obj.onResize = function() {this.layout.resize();};
	if (this.obj instanceof Window)
		this.obj.show();
};

ui.Window.prototype.hide = function() {
	if (this.obj instanceof Window)
		this.obj.hide();
};

return ui;
}(aeq.ui || {}));
