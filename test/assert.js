( function () {
// @include "../dist/aeq.js"

var testName = 'Test assert';

aeq.undoGroup( testName, function () {
	var errors = [];

	var tests = [
		[ 'assertIsNull', [ null, 'error' ], false ],
		[ 'assertIsNull', [{}, 'error' ], true ],
		[ 'assertIsNotNull', [ null, 'Error' ], true ],
		[ 'assertIsNotNull', [{}, 'Error' ], false ]
	];

	var i, result;

	for ( i = 0; i < tests.length; i++ ) {
		var test = tests[i];
		try {
			result = aeq[test[0]].apply( null, test[1] );
		} catch ( e ) {
			var shouldThrowError = test[2];
			if ( !shouldThrowError ) {
				errors.push({ test: test, result: result });
			}
		}
	}

	var e = testName + ': Errors:\n';
	for ( i = 0; i < errors.length; i++ ) {
		var error = errors[i];
		e += '\n';
		var obj = error.test[1] !== undefined && error.test[1] !== null ?
			error.test[1].toString() :
			'undefined';

		result = error.result === undefined ? 'undefined' : result.toSource();
		e += error.test[0] + ' failed when passed ' + obj +
			' it returned ' + result + ' not ' + error.test[2].toSource();
	}

	if ( errors.length > 0 ) {
		alert( e );
	} else {
		alert( testName + ': No errors!' );
	}
});
}() );
