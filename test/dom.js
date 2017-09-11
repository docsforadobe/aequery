( function () {
// @include "../dist/aeq.js"

var testName = 'Test dom';

aeq.undoGroup( testName, function () {
	var comp = setup( testName );
	var errors = [];

	var tests = [

		// Method, argument, result
		[ 'getItems', undefined, [ 'length', app.project.rootFolder.numItems ]],
		[ 'getItemLayers', comp, [ 'length', 2 ]],
		[ 'getCompositions', undefined, [ 'length', 2 ]],
		[ 'getActiveComposition', undefined, comp ],
		[ 'getComposition', comp.name, comp ],
		[ 'getComposition', 'asdf1234', null ],

		[ 'getLayers', comp, [ 'length', 3 ]],
		[ 'getLayers', [ comp ], [ 'length', 3 ]],

		[ 'getSelectedLayers', comp, [ 'length', 1 ]],
		[ 'getSelectedLayers', undefined, [ 'length', 1 ]],

		[ 'getSelectedProperties', comp, [ 'length', comp.selectedProperties.length ]],
		[ 'getSelectedProperties', comp.layer( 1 ), [ 'length', comp.layer( 1 ).selectedProperties.length ]],
		[ 'getSelectedProperties', undefined, [ 'length', 0 ]],

		// ["getProperties", [comp.layer(1)], ['length', 2]], // TODO: How to test this function
		// ["getPropertyChildren", [comp.layer(1)], ['length', 2]], // TODO: How to test this function

		[ 'getEffects', [ comp.layer( 1 ) ], [ 'length', 1 ]],
		[ 'getKeys', comp.layer( 1 ).property( 'Position' ), [ 'length', 1 ]],
		[ 'getKeys', [ comp.layer( 1 ).property( 'Position' ) ], [ 'length', 1 ]],

		// ["getChildren", [comp.layer(1).property("Position")], ['length', 1]], // TODO: How to test this function

		[ 'normalizeCollection', comp.layers, [ 'length', comp.numLayers ]]


	];

	for ( var i = 0; i < tests.length; i++ ) {
		var test = tests[i];
		var result = aeq[test[0]]( test[1] );
		if ( aeq.isArray( test[2] ) ) {
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

		result = error.result !== undefined ? result.toSource() : 'undefined';
		e += error.test[0] + ' failed when passed ' + obj +
			' it returned ' + result + ' not ' + error.test[2].toSource();
	}

	if ( errors.length !== 0 ) {
		alert( e );
	} else {
		alert( testName + ': No errors!' );
	}
});

function setup( name, duration ) {
	app.project.close( CloseOptions.DO_NOT_SAVE_CHANGES );
	var comp = aeq.comp.create({ name: name, duration: duration || 3 });

	var main = aeq.comp.create({ name: name + ' main', duration: duration || 3 });
	main.layers.add( comp );
	main.layers.add( comp );

	var layer1 = comp.layers.addShape();
	layer1.name = 'shape';
	layer1.property( 'Position' ).selected = true;
	layer1.property( 'Position' ).addKey( 1 );

	layer1.property( 'ADBE Effect Parade' ).addProperty( 'ADBE Slider Control' );

	var layer2 = comp.layers.addNull();
	layer2.name = 'null';
	layer2.property( 'Position' ).selected = true;
	comp.layers.addSolid( [ 0, 0, 0 ], 1080, 1920, 1, 1, 1 ).name = 'av';
	comp.openInViewer();

	layer1.moveToBeginning();
	return comp;
}
}() );
