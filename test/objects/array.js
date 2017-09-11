( function () {
// @include "../../dist/aeq.js"

var testName = 'Test objects/array';

var arr = aeq.arrayEx( [ 1, 2, 3, 4, 5, 6, 7 ] );
var errors = [];

var tests = [

	// Command, args, expected
	[ 'exists', [ function ( i ) {
 return i === 3;
} ], true ],
	[ 'exists', [ function ( i ) {
 return i === 8;
} ], false ],

	[ 'isTrueForAll', [ function ( i ) {
 return i !== 8;
} ], true ],
	[ 'isTrueForAll', [ function ( i ) {
 return i === 8;
} ], false ],

	[ 'first', [], arr[0] ],

	[ 'find', [ function ( i ) {
 return i === 3;
}, true ], 3 ],
	[ 'find', [ function ( i ) {
 return i === 8;
}, 'something' ], 'something' ],

	[ 'filter', [ function ( i ) {
 return i <= 4;
} ], [ 'length', 4 ]],

	[ 'indexOf', [ 3 ], 2 ],
	[ 'indexOf', [ 8 ], -1 ],

	[ 'select', [ function ( i ) {
return i * 10;
} ], [ '0', 10 ]],
	[ 'map', [ function ( i ) {
return { key: i, value: i * 10 };
} ], [ '7', 70 ]],

	[ 'insertAt', [ 10, 3 ], function () {
 return arr[3] === 10;
} ]
];


for ( var i = 0; i < tests.length; i++ ) {
	var test = tests[i];
	var result = arr[test[0]].apply( arr, test[1] );
	if ( aeq.isFunc( test[2] ) ) {
		if ( test[2]( result ) === true ) {
			continue;
		}
	} else if ( aeq.isArray( test[2] ) ) {
		if ( result !== undefined && result[test[2][0]] === test[2][1] ) {
			continue;
		}
	} else if ( result === test[2] ) {
		continue;
	}
	errors.push({ test: test, result: result });
}

var e = testName + ': Errors:\n';
for ( i = 0; i < errors.length; i++ ) {
	var error = errors[i];
	e += '\n';
	var obj = error.test[1] !== undefined && error.test[1] !== null ?
		error.test[1].toString() :
		'undefined';

	result = error.result !== undefined ? error.toSource() : 'undefined';
	e += error.test[0] + ' failed when passed ' + obj +
		' it returned ' + result + ' not ' + error.test[2].toSource();
}

if ( errors.length !== 0 ) {
	alert( e );
} else {
	alert( testName + ': No errors!' );
}
}() );
