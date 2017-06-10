aeq = (function (aeq) {
aeq.extend({
	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @param  {type} resources [description]
	 * @param  {type} folder    [description]
	 * @param  {type} extension [description]
	 * @return {type}           [description]
	 */
	createResourceFiles: function(resources, folder, extension) {
		if (!aeq.app.securityPrefEnabled()) {
			return false;
		}
		folder = aeq.getFolderObject(folder);
		extension = setDefault(extension, "");
		if (extension !== "" && extension.charAt(0) !== ".") {
			extension = "." + extension;
		}

		aeq.file.ensureFolderExists(folder);

		if (!folder.exists) {
			throw new Error("Could not create resource folder: " + folder.fsname);
		}

		var resourceFiles = {};
		aeq.forEach( resources, function(name, contents) {
			var filePath = aeq.file.joinPath(folder.fsName, name + extension);
			var file = new File(filePath);
			resourceFiles[name] = file;

			if (!file.exists || contents.length !== file.length) {
				file.encoding = "BINARY";
				file.open("w");
				var success = file.write(contents);
				if (!success) {
					if (file.error === "") {
						resourceFiles[name] = null;
					} else {
						resourceFiles[name] = new Error(file.error, file.fsName, undefined);
					}
				}
				file.close();
			}
		});
		return resourceFiles;
	},

	/**
	 * Takes a file (or file path) and converts it to a binary string
	 * @method
	 * @memberof aeq
	 * @param  {File|string} filePath Path or file to get data from
	 * @return {string}               Binary string of file data
	 */
	getBinaryString: function(filePath) {
		var file = aeq.getFileObject(filePath);

		file.encoding = "BINARY";
		file.open('r');
		var fileData = file.read();
		file.close();

		var binaryString = fileData.toSource();

		binaryString = binaryString.replace(/^\(new String\(\"/, "");
		binaryString = binaryString.replace(/\"\)\)$/, "");

		return binaryString;
	}
});

// Function aliases

return aeq;
}(aeq || {}));
