var aeq = (function (aeq) {
aeq.extend({

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} filePath [description]
	 * @return {type}          [description]
	 */
	getFileObject: function(filePath) {
		return aeq.isFile(filePath) ? filePath : new File(filePath);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} filePath [description]
	 * @return {type}          [description]
	 */
	getFolderObject: function(filePath) {
		return aeq.isFolder(filePath) ? filePath : new Folder(filePath);
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} filePath [description]
	 * @param  {type} encoding [description]
	 * @return {type}          [description]
	 */
	readFile: function(filePath, encoding) {
		var file = aeq.getFileObject(filePath),
			contents;

		encoding = setDefault(encoding, "UTF-8");

		if (file.exists) {
			if (File.isEncodingAvailable(encoding))
				file.encoding = encoding;

			file.open();
			contents = file.read();
			file.close();
			return contents;
		}
		return null;
	},

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} filePath [description]
	 * @param  {type} contents [description]
	 * @param  {type} encoding [description]
	 * @return {type}          [description]
	 */
	writeFile: function(filePath, contents, encoding) {
		var file = aeq.getFileObject(filePath);
		encoding = setDefault(encoding, "UTF-8");

		if (!file.exists)
			aeq.file.ensureFolderExists(file.path);

		if (File.isEncodingAvailable(encoding))
			file.encoding = encoding;

		file.open("w");
		var success = file.write(contents);
		file.close();

		if (success)
			return file;

		return null;
	}
});

return aeq;
}(aeq || {}));
