aeq.ui = (function (my) {
my.Window = function (obj) {
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
