( function () {
// @include "../dist/aeq.js"

var testName = 'Test `types.js`';

aeq.undoGroup( testName, function () {
	var comp = setup( 'test types' );
	var errors = [];
	var tests = getTests( comp );

	var i, result;
	for ( i = 0; i < tests.length; i++ ) {
		var test = tests[i];
		result = aeq[test.method]( test.value );
		if ( result !== test.expect ) {
			errors.push({ test: test, result: result });
		}
	}

	var e = testName + ' Failed\n';
	for ( i = 0; i < errors.length; i++ ) {
		var error = errors[i];
		e += '\n';
		var obj = error.test.value !== undefined && error.test.value !== null ?
			error.test.value.toString() :
			'undefined';

		result = error.result === undefined ? 'undefined' : result.toSource();
		e += '"' + error.test.method + '" failed when passed: "' + obj +
			'"\nIt returned "' + result + '"\nNot ' + error.test.expect.toSource() + '\n';
	}

	if ( errors.length > 0 ) {
		alert( e );
	} else {
		alert( testName + ' Succeeded\nNo errors!' );
	}
});

function setup( name, duration ) {
	var comp = aeq.comp.create({ name: name, duration: duration || 3 });
	var adj = comp.layers.addShape();
	adj.name = 'adjustment';
	adj.adjustmentLayer = true;
	var guide = comp.layers.addShape();
	guide.name = 'guide';
	guide.guideLayer = true;
	comp.layers.addShape().name = 'shape';
	comp.layers.addLight( 'light', [ 0, 0 ] );
	comp.layers.addCamera( 'camera', [ 0, 0 ] );
	comp.layers.addText().name = 'text';
	comp.layers.addBoxText( [ 100, 100 ] ).name = 'boxtext';
	comp.layers.addNull().name = 'null';
	comp.layers.addSolid( [ 0, 0, 0 ], 1080, 1920, 1, 1, 1 ).name = 'solid';
	comp.layers.addSolid( [ 0, 0, 0 ], 1080, 1920, 1, 1, 1 ).name = 'av';
	return comp;
}

function getTests( comp ) {
	return [
		{ method: 'isNullOrUndefined', value: null, expect: true },
		{ method: 'isNullOrUndefined', value: undefined, expect: true },
		{ method: 'isNullOrUndefined', value: [], expect: false },

		{ method: 'isBoolean', value: false, expect: true },
		{ method: 'isBoolean', value: true, expect: true },
		{ method: 'isBoolean', value: [], expect: false },

		{ method: 'isNumber', value: 1, expect: true },
		{ method: 'isNumber', value: [], expect: false },

		{ method: 'isString', value: 'Hello', expect: true },
		{ method: 'isString', value: 1, expect: false },

		{ method: 'isObject', value: {}, expect: true },
		{ method: 'isObject', value: 1, expect: false },
		{ method: 'isObject', value: comp, expect: true },
		{ method: 'isObject', value: [], expect: true }, // TODO: Should this return false?

		{ method: 'isPlainObject', value: {}, expect: true },
		{ method: 'isPlainObject', value: 1, expect: false },
		{ method: 'isPlainObject', value: comp, expect: false },
		{ method: 'isPlainObject', value: [], expect: false },

		{ method: 'isArray', value: [], expect: true },
		{ method: 'isArray', value: {}, expect: false },
		{ method: 'isArray', value: 1, expect: false },

		{ method: 'isFunc', value: function () {}, expect: true },
		{ method: 'isFunc', value: 1, expect: false },

		// TODO: Fails
		// [ 'isAeq', aeq( 'comp' ), true ],
		// [ 'isAeq', new aeq.Comp(), true ],
		// [ 'isAeq', new aeq.Layer(), true ],
		// [ 'isAeq', new aeq.Property(), true ],
		// [ 'isAeq', {}, false ],
		// [ 'isAeq', 1, false ],

		{ method: 'isApp', value: app, expect: true },
		{ method: 'isApp', value: app.project, expect: false },

		// TODO: Fails
		// { method: 'isComp', value: comp, expect: true },
		// { method: 'isComp', value: comp.layer( 1 ), expect: false },
		// { method: 'isComp', value: {}, expect: false },

		{ method: 'isAVLayer', value: comp.layer( 'av' ), expect: true },
		{ method: 'isAVLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isAVLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isAVLayer', value: null, expect: false },

		{ method: 'isLayer', value: comp.layer( 'av' ), expect: true },
		{ method: 'isLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isLayer', value: comp.layer( 'shape' ), expect: true },
		{ method: 'isLayer', value: null, expect: false },

		{ method: 'isSolidLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isSolidLayer', value: comp.layer( 'solid' ), expect: true },
		{ method: 'isSolidLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isSolidLayer', value: null, expect: false },

		{ method: 'isNullLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isNullLayer', value: comp.layer( 'solid' ), expect: false },
		{ method: 'isNullLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isNullLayer', value: null, expect: false },

		{ method: 'isAdjustmentLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isAdjustmentLayer', value: comp.layer( 'adjustment' ), expect: true },
		{ method: 'isAdjustmentLayer', value: null, expect: false },

		{ method: 'isGuideLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isGuideLayer', value: comp.layer( 'guide' ), expect: true },
		{ method: 'isGuideLayer', value: null, expect: false },

		// TODO:
		// 'isPhotoshopLayer'
		// 'isCinema4DLayer'
		// 'isFileLayer'
		// 'isPlaceholder'
		// 'isTrackMatte'
		// 'isEnvironmentLayer'

		{ method: 'isProperty', value: comp.layer( 1 ).property( 'Position' ), expect: true },
		{ method: 'isProperty', value: comp.layer( 1 ).property( 'ADBE Transform Group' ), expect: false },

		{ method: 'isPropertyGroup', value: comp.layer( 1 ).property( 'Position' ), expect: false },
		{ method: 'isPropertyGroup', value: comp.layer( 1 ).property( 'ADBE Transform Group' ), expect: true }
	];
}
}() );
