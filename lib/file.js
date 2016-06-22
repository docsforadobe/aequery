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
	}
});
return aeq;
}(aeq || {}));
