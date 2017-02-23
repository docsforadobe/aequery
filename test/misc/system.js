( function () {
//@include "../../dist/aeq.js"

var testName = "Test misc/system";

alert( testName + "\n" +
	"OS is Windows = " + aeq.isWindows + "\n" +
	"OS is mac = " + aeq.isMac + "\n" +
	"OS is: " + $.os + "\n" +
	"Info: " + aeq.getSystemInfo()
);
}() );
