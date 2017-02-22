( function() {
//@include "../dist/aeq.js"

var testName ="Test types";

aeq.undoGroup( testName, function() {
	var comp = setup( "test types" );
	var errors = [];

	var tests = [
		["isNullOrUndefined", null, true],
		["isNullOrUndefined", undefined, true],
		["isNullOrUndefined", [], false],

		["isBoolean", false, true],
		["isBoolean", true, true],
		["isBoolean", [], false],

		["isNumber", 1, true],
		["isNumber", [], false],

		["isString", "Hello", true],
		["isString", 1, false],

		["isObject", {}, true],
		["isObject", 1, false],
		["isObject", comp, true],
		["isObject", [], true], // TODO: Should this return false?

		["isPlainObject", {}, true],
		["isPlainObject", 1, false],
		["isPlainObject", comp, false],
		["isPlainObject", [], false],

		["isArray", [], true],
		["isArray", {}, false],
		["isArray", 1, false],

		["isFunc", function() {}, true],
		["isFunc", 1, false],

		["isAeq", aeq('comp'), true],
		["isAeq", new aeq.Comp(), true],
		["isAeq", new aeq.Layer(), true],
		["isAeq", new aeq.Property(), true],
		["isAeq", {}, false],
		["isAeq", 1, false],

		["isApp", app, true],
		["isApp", app.project, false],

		["isComp", comp, true],
		["isComp", comp.layer(1), false],
		["isComp", {}, false],

		["isAVLayer", comp.layer("av"), true],
		["isAVLayer", comp.layer("null"), true],
		["isAVLayer", comp.layer("shape"), false],
		["isAVLayer", null, false],


		["isLayer", comp.layer("av"), true],
		["isLayer", comp.layer("shape"), true],
		["isLayer", comp.layer("null"), true],
		["isLayer", null, false],

		["isProperty", comp.layer(1).property("Position"), true],
		["isProperty", comp.layer(1).property("ADBE Transform Group"), false],

		["isPropertyGroup", comp.layer(1).property("ADBE Transform Group"), true],
		["isPropertyGroup", comp.layer(1).property("Position"), false],
	];

	for (var i = 0; i < tests.length; i++) {
		var test = tests[i];
		var result = aeq[test[0]](test[1]);
		if (result !== test[2]) {
			errors.push({test: test, result: result});
		}
	}

	var e = testName + ": Errors:\n";
	for (i = 0; i < errors.length; i++) {
		var error = errors[i];
		e += "\n";
		var obj = error.test[1] !== undefined && error.test[1] !== null ?
			error.test[1].toString() :
			'undefined';

		result = error.result !== undefined ? result.toSource() : 'undefined';
		e += error.test[0] + " failed when passed " + obj +
			" it returned " + result + " not " + error.test[2].toSource();
	}

	if ( errors.length !== 0) {
		alert( e );
	} else {
		alert( testName + ": No errors!" );
	}
} );

function setup( name, duration ) {
	var comp = aeq.comp.create( { name: name, duration: duration || 3 } );
	comp.layers.addShape().name = "shape";
	comp.layers.addNull().name = "null";
	comp.layers.addSolid([0,0,0], 1080, 1920, 1, 1, 1).name = "av";
	return comp;
}
}() );
