( function () {
//@include "../../dist/aeq.js"

var testName = "Test misc/system";

var args = ["arg1", "arg2", "arg3"];
aeq.undoGroup( testName, function( a, b, c ) {
	if ( a === args[0] && b === args[1] && c === args[2] ) {
		alert(testName + "\n" + "Success!");
	} else {
		alert(testName + "\n" + "Error!");
	}
}, args );
}() );
