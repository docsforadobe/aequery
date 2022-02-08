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
		$.writeln( test.method );
		$.writeln( test.value );
		$.writeln( test.expect );
		$.writeln( result );
		$.writeln( test.expect === result ? 'Success' : 'Failed' );
		$.writeln();
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

function getItem( name ) {
	return aeq.getItems()
		.filter( function ( item ) {
			return item.name === name;
		})[0];
}

function setup( name, duration ) {
	var basePath = new File( $.fileName ).parent.toString();
	var items = aeq.importFiles( [
		basePath + '/assets/aeq.jpg',
		basePath + '/assets/aeq.psd',
		basePath + '/assets/cine.c4d',
		basePath + '/assets/aeq.jpg'
	] );
	var ph = items[3];
	ph.replaceWithPlaceholder( 'placeholder', 100, 100, 24.0, 1.0 );
	var comp = aeq.comp.create({ name: name, duration: duration || 3 });
	var comp2 = aeq.comp.create({ name: 'comp', duration: duration || 3 });
	comp.renderer = 'ADBE Ernst'; // Cinema4D renderer
	comp.layers.add( comp2 );
	var adj = comp.layers.addShape();
	adj.name = 'adjustment';
	adj.adjustmentLayer = true;
	var guide = comp.layers.addShape();
	guide.name = 'guide';
	guide.guideLayer = true;
	var env = comp.layers.add( items[0] );
	env.name = 'env';
	env.environmentLayer = true;
	var tm = comp.layers.addNull();
	tm.name = 'hasTrackMatte';
	tm.trackMatteType = TrackMatteType.ALPHA;
	comp.layers.addNull().name = 'isTrackMatte';
	var ml = comp.layers.addSolid( [ 0, 0, 0 ], 1080, 1920, 1, 1, 1 );
	ml.name = 'masked';
	var shape = new Shape();
	shape.vertices = [[ 0, 0 ], [ 0, 100 ], [ 100, 100 ], [ 100, 0 ]];
	var mask = ml.property( 'ADBE Mask Parade' ).addProperty( 'ADBE Mask Atom' );
	mask.property( 'ADBE Mask Shape' ).setValue( shape );
	comp.layers.add( items[0] ).name = 'jpg';
	comp.layers.add( items[1] ).name = 'psd';
	comp.layers.add( items[2] ).name = 'c4d';
	comp.layers.add( ph );
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

		// TODO: isEmpty

		{ method: 'isAeq', value: aeq( 'comp' ), expect: true },
		{ method: 'isAeq', value: new aeq.Comp(), expect: true },
		{ method: 'isAeq', value: new aeq.Layer(), expect: true },
		{ method: 'isAeq', value: new aeq.Property(), expect: true },
		{ method: 'isAeq', value: {}, expect: false },
		{ method: 'isAeq', value: 1, expect: false },

		{ method: 'isApp', value: app, expect: true },
		{ method: 'isApp', value: app.project, expect: false },
		{ method: 'isApp', value: {}, expect: false },

		{ method: 'isFolder', value: new Folder(), expect: true },
		{ method: 'isFolder', value: getItem( 'Solids' ), expect: false },
		{ method: 'isFolder', value: getItem( 'aeq.jpg' ), expect: false },
		{ method: 'isFolder', value: {}, expect: false },

		{ method: 'isFolderItem', value: getItem( 'Solids' ), expect: true },
		{ method: 'isFolderItem', value: getItem( 'aeq.jpg' ), expect: false },
		{ method: 'isFolderItem', value: {}, expect: false },

		{ method: 'isFile', value: new File(), expect: true },
		{ method: 'isFile', value: getItem( 'aeq.jpg' ), expect: false },
		{ method: 'isFile', value: getItem( 'Solids' ), expect: false },
		{ method: 'isFile', value: {}, expect: false },

		{ method: 'isFootageItem', value: getItem( 'aeq.jpg' ), expect: true },
		{ method: 'isFootageItem', value: getItem( 'Solids' ), expect: false },
		{ method: 'isFootageItem', value: {}, expect: false },

		{ method: 'isComp', value: comp, expect: true },
		{ method: 'isComp', value: comp.layer( 1 ), expect: false },
		{ method: 'isComp', value: {}, expect: false },

		{ method: 'isSolidLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isSolidLayer', value: comp.layer( 'solid' ), expect: true },
		{ method: 'isSolidLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isSolidLayer', value: null, expect: false },

		{ method: 'isAdjustmentLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isAdjustmentLayer', value: comp.layer( 'adjustment' ), expect: true },
		{ method: 'isAdjustmentLayer', value: null, expect: false },

		{ method: 'isEnvironmentLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isEnvironmentLayer', value: comp.layer( 'env' ), expect: true },
		{ method: 'isEnvironmentLayer', value: null, expect: false },

		{ method: 'isGuideLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isGuideLayer', value: comp.layer( 'guide' ), expect: true },
		{ method: 'isGuideLayer', value: null, expect: false },

		{ method: 'isNullLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isNullLayer', value: comp.layer( 'solid' ), expect: false },
		{ method: 'isNullLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isNullLayer', value: null, expect: false },

		{ method: 'isPhotoshopLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isPhotoshopLayer', value: comp.layer( 'psd' ), expect: true },
		{ method: 'isPhotoshopLayer', value: null, expect: false },

		{ method: 'isCinema4DLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isCinema4DLayer', value: comp.layer( 'jpg' ), expect: false },
		{ method: 'isCinema4DLayer', value: comp.layer( 'c4d' ), expect: true },
		{ method: 'isCinema4DLayer', value: null, expect: false },

		{ method: 'isFileLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isFileLayer', value: comp.layer( 'jpg' ), expect: true },
		{ method: 'isFileLayer', value: comp.layer( 'psd' ), expect: true },
		{ method: 'isFileLayer', value: comp.layer( 'c4d' ), expect: true },
		{ method: 'isFileLayer', value: null, expect: false },

		{ method: 'isPlaceholder', value: comp.layer( 'placholder' ), expect: true },
		{ method: 'isPlaceholder', value: comp.layer( 'null' ), expect: false },
		{ method: 'isPlaceholder', value: comp.layer( 'jpg' ), expect: false },
		{ method: 'isPlaceholder', value: null, expect: false }, // TODO: Fails

		{ method: 'isTrackMatte', value: comp.layer( 'null' ), expect: false },
		{ method: 'isTrackMatte', value: comp.layer( 'jpg' ), expect: false },
		{ method: 'isTrackMatte', value: comp.layer( 'isTrackMatte' ), expect: true },
		{ method: 'isTrackMatte', value: null, expect: false },

		{ method: 'isAVLayer', value: comp.layer( 'av' ), expect: true },
		{ method: 'isAVLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isAVLayer', value: comp.layer( 'shape' ), expect: false },
		{ method: 'isAVLayer', value: null, expect: false },

		{ method: 'isLayer', value: comp.layer( 'av' ), expect: true },
		{ method: 'isLayer', value: comp.layer( 'null' ), expect: true },
		{ method: 'isLayer', value: comp.layer( 'shape' ), expect: true },
		{ method: 'isLayer', value: null, expect: false },

		{ method: 'isShapeLayer', value: comp.layer( 'av' ), expect: false },
		{ method: 'isShapeLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isShapeLayer', value: comp.layer( 'shape' ), expect: true },
		{ method: 'isShapeLayer', value: null, expect: false },

		{ method: 'isTextLayer', value: comp.layer( 'av' ), expect: false },
		{ method: 'isTextLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isTextLayer', value: comp.layer( 'text' ), expect: true },
		{ method: 'isTextLayer', value: comp.layer( 'boxtext' ), expect: true },
		{ method: 'isTextLayer', value: null, expect: false },

		{ method: 'isCameraLayer', value: comp.layer( 'av' ), expect: false },
		{ method: 'isCameraLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isCameraLayer', value: comp.layer( 'light' ), expect: false },
		{ method: 'isCameraLayer', value: comp.layer( 'camera' ), expect: true },
		{ method: 'isCameraLayer', value: null, expect: false },

		{ method: 'isLightLayer', value: comp.layer( 'av' ), expect: false },
		{ method: 'isLightLayer', value: comp.layer( 'null' ), expect: false },
		{ method: 'isLightLayer', value: comp.layer( 'camera' ), expect: false },
		{ method: 'isLightLayer', value: comp.layer( 'light' ), expect: true },
		{ method: 'isLightLayer', value: null, expect: false },

		{ method: 'isPrecomp', value: comp.layer( 'null' ), expect: false },
		{ method: 'isPrecomp', value: comp.layer( 'camera' ), expect: false },
		{ method: 'isPrecomp', value: comp.layer( 'light' ), expect: false },
		{ method: 'isPrecomp', value: comp.layer( 'comp' ), expect: true },
		{ method: 'isPrecomp', value: null, expect: false },

		{ method: 'isProperty', value: comp.layer( 1 ).property( 'Position' ), expect: true },
		{ method: 'isProperty', value: comp.layer( 1 ).property( 'ADBE Transform Group' ), expect: false },

		{ method: 'isPropertyGroup', value: comp.layer( 1 ).property( 'Position' ), expect: false },
		{ method: 'isPropertyGroup', value: comp.layer( 1 ).property( 'ADBE Transform Group' ), expect: true },

		{ method: 'isMaskPropertyGroup', value: comp.layer( 'masked' ).property( 'ADBE Transform Group' ), expect: false },
		{ method: 'isMaskPropertyGroup', value: comp.layer( 'masked' ).property( 'ADBE Mask Parade' ).property( 'ADBE Mask Atom' ).property( 'ADBE Mask Shape' ), expect: false },
		{ method: 'isMaskPropertyGroup', value: comp.layer( 'masked' ).property( 'ADBE Mask Parade' ).property( 'ADBE Mask Atom' ), expect: true }
	];
}
}() );
