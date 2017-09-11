( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/settings';
var sectionName = 'aeq-testing';
var errors = [];
var definedValue = 'Hello World';
var definedValue2 = 'Hello World2';

aeq.settings.save( sectionName, 'definedKey', definedValue );
aeq.settings.save( sectionName, 'otherDefinedKey', definedValue2 );

var tests = [

	// Function, args, expected value
	[ 'get', [ sectionName, 'notDefinedKey' ], undefined ],
	[ 'get', [ sectionName, 'definedKey' ], definedValue ],

	[ 'have', [ sectionName, 'notDefinedKey' ], false ],
	[ 'have', [ sectionName, 'definedKey' ], true ],

	[ 'unpack', [ sectionName, [ 'definedKey', 'otherDefinedKey' ]], function ( result ) {
		return result.definedKey === definedValue && result.otherDefinedKey === definedValue2;
	} ],

	[ 'unpack', [ sectionName, {
		definedKey: false,
		otherDefinedKey: false,
		notDefinedKey: true
	}], function ( result ) {
		return result.definedKey === definedValue &&
			result.otherDefinedKey === definedValue2 &&
			result.notDefinedKey === true;
	} ]
];

var i, result;

for ( i = 0; i < tests.length; i++ ) {
	var test = tests[i];
	result = aeq.settings[test[0]].apply( null, test[1] );
	if ( test[2] instanceof Function && test[2]( result ) === true ) {
		continue;
	}

	if ( result === test[2] ) {
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

	result = error.result === undefined ? 'undefined' : result.toSource();
	e += error.test[0] + ' failed when passed ' + obj +
		' it returned ' + result + ' not ' + error.test[2].toSource();
}

if ( errors.length > 0 ) {
	alert( e );
} else {
	alert( testName + ': No errors!' );
}
}() );
