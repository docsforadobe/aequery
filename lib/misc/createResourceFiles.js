aeq = (function (aeq) {
aeq.extend({
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
	}
});

// Function aliases

return aeq;
}(aeq || {}));
