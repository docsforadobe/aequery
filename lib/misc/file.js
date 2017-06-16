var aeq = (function (aeq) {
aeq.extend({

	/**
	 * Takes a file path or a file object, and returns a file object
	 * allows functions to be flexible in whether they take a path vs file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath String path to a file, or file object
	 * @return {File}                 Resolved file object
	 */
	getFileObject: function(filePath) {
		return aeq.isFile(filePath) ? filePath : new File(filePath);
	},

	/**
	 * Takes a folder path or a folder object, and returns a folder object
	 * allows functions to be flexible in whether they take a path vs folder
	 * @method
	 * @memberof aeq
	 * @param  {Folder|string} folderPath String path to a folder, or folder object
	 * @return {Folder}                   Resolved folder object
	 */
	getFolderObject: function(folderPath) {
		return aeq.isFolder(folderPath) ? folderPath : new Folder(folderPath);
	},

	/**
	 * Returns the contents of a specified file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath    Path or file to read
	 * @param  {string} [encoding=UTF-8] Encoding method
	 * @return {string|null}             Contents of the file, or null if file doesn't exist
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
	 * Writes data to a file, returns file
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath              Path or file to write to
	 * @param  {string}  contents                  Data to write to the file
	 * @param  {object} [options]                  Options for writing file.
	 * @param  {boolean} [options.overwrite=false] `true` if file should be overwritten if exists.
	 * @param  {string} [options.encoding="UTF-8"] Encoding method.
	 * @return {File|null}                         New file, or null if file was not written
	 *                                             correctly or file exits and overwrite = false
	 */
	writeFile: function(filePath, contents, options) {
		var file = aeq.getFileObject(filePath);
		options = aeq.setDefault(options, {});

		if (file.exists && options.overwrite === false) {
			return null
		}

		if (!file.exists) {
			aeq.file.ensureFolderExists(file.path);
		}

		if (!aeq.isNullOrUndefined(options.encoding) && File.isEncodingAvailable(encoding)) {
			file.encoding = options.encoding;
		}

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
