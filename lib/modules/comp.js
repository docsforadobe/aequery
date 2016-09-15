var aeq = (function (aeq) {
aeq.comp = {
	toString: function() {
		return "[object aeq.comp]";
	},

	// Function for extending the prototype using objects
	extend: aeq.extend,

	create: function(folder, options) {
		if (!(folder instanceof FolderItem)) {
			options = folder || {};
			folder = options.folder || app.project;
		}

		// TODO: Find a way to use the last used settings, or find some defaults
		var defaultOptions = {
			name: "Comp",
			width: 1920,
			height: 1080,
			pixelAspect: 1,
			duration: 1,
			frameRate: 24
		};

		options = aeq.extend(defaultOptions, options);

		return folder.items.addComp(
			options.name,
			options.width,
			options.height,
			options.pixelAspect,
			options.duration,
			options.frameRate
		);
	}
};
return aeq;
}(aeq || {}));
