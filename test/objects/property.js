( function () {
//@include "../../dist/aeq.js"

var testName = "Test objects/layer";

app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);

var comp = aeq.comp.create({ name: testName } );
var layer = comp.layers.addShape();
var orgProp = layer.property("Position");
var transformGroup = layer.property("ADBE Transform Group");
var orgAltProp = transformGroup;
var prop = aeq( orgProp );
var altProp = new aeq.Property( orgAltProp );
var altProp2 = new aeq.Property( transformGroup.property("ADBE Position_0") );
var opacity = new aeq.Property( transformGroup.property("ADBE Opacity") );
var errors = [];
var count = 0;

orgProp.addKey( 1 );
orgProp.addKey( 2 );
orgProp.setSelectedAtKey( 1, true );

var tests = [
	// method, args, expected
	["get", [], orgProp],

	["expression", ["throw Error('error')"], function(res) {
		return aeq.isString(res) && res !== '';
	}],
	["expression", ["value"], true],
	["expression", [], "value"],
	[[altProp, "expression"], [""], false],

	["selectedKeys", [], ['length', 1]],

	["addKey", [3], ['index', 3]],

	["separationFollower", [1], ["matchName", "ADBE Position_1"]],
	["separationFollower", [0], ["matchName", "ADBE Position_0"]],

	["nearestKeyIndex", [3], ["originalTime", 3]],

	["removeKey", [3], function() {
		return orgProp.numKeys === 2;
	}],

	["removeKey", [prop.key(2)], function() {
		return orgProp.numKeys === 1;
	}],

	["key", [1], ["originalTime", 1]],

	["separationLeader", [], null],
	[[altProp2, "separationLeader"], [], ["matchName", "ADBE Position"]],
	[[altProp2, "separationDimension"], [], 0],
	["separationDimension", [], null],

	["maxValue", [], null],
	[[opacity, "maxValue"], [], opacity.property.maxValue],

	["minValue", [], null],
	[[opacity, "minValue"], [], opacity.property.minValue],

	["value", [], function(res) {return prop.property.value[0] === res[0];}],
	[[opacity, "value"], [50], function() {return opacity.property.value === 50;}],

	// ["valueAtTime", [2], orgProp.valueAtTime(2, false)] // TODO: Throws Error
	[[opacity, "valueAtTime"], [2, 10], ["originalTime", 2]],
	// [[opacity, "valuesAtTimes"], [[2]], ["originalTime", 2]] // TODO: Throws Error
	[[opacity, "valuesAtTimes"], [[2,4], [10, 20]], function(res) {
		return res[0].value() === 10;
	}],

	["forEachKey", [function() {count++;}], function() {
		return count === orgProp.numKeys;
	}],

	[ "expressionError", [], orgProp.expressionError],
	[ "isTimeVarying", [], orgProp.isTimeVarying],
	[ "numKeys", [], function(res ) {return res === orgProp.numKeys;}],
	[ "canSetExpression", [], orgProp.canSetExpression],
	[ "canVaryOverTime", [], orgProp.canVaryOverTime],
	[ "isSpatial", [], orgProp.isSpatial],
	[ "isSeparationFollower", [], orgProp.isSeparationFollower],
	[ "isSeparationLeader", [], orgProp.isSeparationLeader],
	[ "propertyIndex", [], orgProp.propertyIndex],
	[ "propertyValueType", [], orgProp.propertyValueType],
	[ "unitsText", [], orgProp.unitsText],
];

for (var i = 0; i < tests.length; i++) {
	var test = tests[i];
	var result;
	if( aeq.isArray(test[0])) {
		result = test[0][0][test[0][1]].apply(test[0][0], test[1]);
	} else {
		result = prop[test[0]].apply(prop, test[1]);
	}

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
		error.test[1].toSource() :
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
