( function () {
//@include "../../dist/aeq.js"

var testName = "Test objects/layer";

app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);

var comp = aeq.comp.create({ name: testName } );
var comp2 = aeq.comp.create({ name: testName + " Target" } );
var orgLayer = comp.layers.addShape();
var parent = comp.layers.addShape();
parent.name = "parent";
var parent2 = comp.layers.addShape();
parent2.moveToEnd();

orgLayer.property("ADBE Effect Parade").addProperty("ADBE Fill");
// alert( orgLayer.property("ADBE Effect Parade").numProperties );

var layer = aeq( orgLayer );
var errors = [];
var count = 0;

var tests = [
	// command, args, expected
	["get", [], orgLayer],

	["parent", [parent.index], parent],
	["parent", [parent.name], parent],
	["parent", ["-=1"], parent],
	["parent", ["+=1"], parent2],
	["parent", [parent], parent],
	["parent", [], parent],

	["copyToComp", [comp2], function() {return comp2.numLayers === 1;}],
	["copyToComp", [comp2.name], function() {return comp2.numLayers === 2;}],

	["removeParent", [], function() {return orgLayer.parent === null;}],

	["forEachEffect", [function() {count += 1;}], function() {return count === orgLayer.property("ADBE Effect Parade").numProperties;}],
	["addEffect", ["ADBE Fill"], function() {return orgLayer.property("ADBE Effect Parade").numProperties === count + 1;}]
];

for (var i = 0; i < tests.length; i++) {
	var test = tests[i];
	var result = layer[test[0]].apply(layer, test[1]);
	if ( aeq.isFunc( test[2] ) ) {
		if ( test[2](result) === true ) {
			continue;
		}
	} else if ( aeq.isArray( test[2] ) ) {
		if ( result !== undefined && result[test[2][0]] === test[2][1]) {
			continue;
		}
	} else if (result === test[2]) {
		continue;
	}
	errors.push({test: test, result: result});
}

var e = testName + ": Errors:\n";
for (i = 0; i < errors.length; i++) {
	var error = errors[i];
	e += "\n";
	var obj = error.test[1] !== undefined && error.test[1] !== null ?
		error.test[1].toString() :
		'undefined';

	var testResult = error.result !== undefined ? error.result.toSource() : 'undefined';
	e += error.test[0] + " failed when passed " + obj +
		" it returned " + testResult + " not " + error.test[2].toSource();
}

if ( errors.length !== 0) {
	alert( e );
} else {
	alert( testName + ": No errors!" );
}

}() );
