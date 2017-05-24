( function ( resourceFiles) {
//@include "../../dist/aeq.js"

var testName = "Test createResourceFiles";

var folder = aeq.file.joinPath(Folder.desktop.fsName, testName);

var resourceStrings = {
	"image": "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\x04\x03\x00\x00\x00\x7F\u00A7\x00>\x00\x00\x000PLTEGpL\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\u00BD\x05g=\x00\x00\x00\x0FtRNS\x00\u00F2\u00E8\u0087\x15\u0099\fx\u00C4p1\u00A4}\tk\x0E=\x12\u00C9\x00\x00\x00eIDATx^c\u00C0\r\u008C\u00E1,\x16A\x07\x18\u0093\u00F9\u00BF\x01\u008C\u00E9\u00F8_\x04\u00CA\u00CA\u00DA\u00FF\u00FF\u00F72\x10\u0083\u00B5\u00E9?\bh\x04\u0080\x14\u0082\x01Xy=\u0098\u00F5\x1D\u00A4\u0082\x13\u00CC\u009C\u00C0\x00\x02\u00E7\u0081\u00AC?\f`\u00F0\x1E\u00C8\u00FC\x07a\u00C6\x03\u0099_!\u00CC\u00FE\u00FFJ\u00FF\x7F@\u0098\u00F2\u009Aw'}\x04\u00B3X\u00C4\x13\x18\u00D8\n\x1D\x18\b\x03\x00Ni5\u0087&\u00DD\x19j\x00\x00\x00\x00IEND\u00AEB`\u0082",
	"image2": "\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x14\x00\x00\x00\x14\b\x03\x00\x00\x00\u00BAW\u00ED?\x00\x00\x003PLTEGpL7\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E97\u00BC\u00E9\u00F4\u00D4\x04\u008F\x00\x00\x00\x10tRNS\x00\u00C4p\r\x15\u0099x\u00F2\u00E8\u00871\u00A4}\f\tk\x1A\u00FD\u00FCB\x00\x00\x00fIDATx^\u00A5\u00CF\u00CB\n\u00800\fDQ[M\u009B\u00FA\u00BC\u00FF\u00FF\u00B5\u00E2bh\u00B0+q6\u0081C\u0098\u0090\u00E9{Z\x1Bm\u00A9u\x19\x17\u00A1\u008D\u008B\u00F0Z\u009D\u00D7\r`[g\u0089%G\u00C1\u0093\u00A9-D\u00CD%ZQA\u00EE\u0096\u00FB\u00A1]\u00B6\u0087\u00EB\u0097\u00F0\nhB\x0B\u0098\x00w \x05\u00ACx>\u00CF\u00EC\u00D4\u00F8c9\u009Ey\x14}\u00FA/7\u008D\x04\x06\u00EB@\u00B5q\u00A0\x00\x00\x00\x00IEND\u00AEB`\u0082",
}
var resourceFiles = aeq.createResourceFiles(resourceStrings, folder, "png")
alert(JSON.stringify(resourceFiles, function(key, value) {
	if (aeq.isFile(value)) {
		return value.fsName
	} if (value instanceof Error) {
		return value.message
	}
	return value
}))

if (aeq.isFile(resourceFiles.image)) {
	var binary = aeq.getBinaryString(resourceFiles.image)
	alert(binary)
}

}() );
