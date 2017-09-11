( function ( a, b, c ) {
// @include "../../dist/aeq.js"

var testName = 'Test misc/error';

try {
	throw new Error( 'This is a test error' );
} catch ( e ) {
	aeq.error( e, arguments );
	aeq.error( e );
}
}( 'arg1', 'arg2', 'arg3' ) );
