var aeq = (function (aeq) {
aeq.extend({
	readFile: function(filePath) {
		var file, contents;
		file = new File(filePath);
		if (file.exists) {
			file.open();
			contents = file.read();
			file.close();
			return contents;
		}
		return null;
	},

	writeFile: function(filePath, contents) {
		var file = new File(filePath);
		if (!file.exists) {
			var folder = new Folder( file.path );
			if ( !folder.exists ) {
				folder.create();
			}
		}
		file.open("w");
		var success = file.write(contents);
		file.close();
		return success;
	}
});
return aeq;
}(aeq || {}));
