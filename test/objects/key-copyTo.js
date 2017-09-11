( function ( aeq ) {
// @include "../dist/aeq.js"

aeq.undoGroup( 'test Key.copyTo', function () {
	var prop = setup( 'test key.copyTo 1' );

	// Simple copy and move
	aeq( 'keys', prop ).forEach( function ( key ) {
		key.copyTo( prop, key.time() + 1.5 );
		key.moveTo( key.time() + 0.1 );
	});

	// Move keys around more
	prop = setup( 'test key.copyTo 2', 5 );
	aeq( 'keys', prop ).forEach( function ( key, i ) {
		key.copyTo( prop, key.time() + ( 0.9 * ( i % 2 === 0 ? 1 : -1 ) ) );

		// This moves the first key after the second key, which flips the indexes,
		// But the objects should still keep up
		key.moveTo( key.time() + 1.5 );
	});
});

function setup( name, duration ) {
	var comp = aeq.comp.create({ name: name, duration: duration || 3 });
	var layer = comp.layers.addShape();

	var prop = layer.property( 'transform' ).property( 'Position' );
	prop.setValuesAtTimes( [ 0, 1 ], [[ 100, 100, 100 ], [ 0, 0, 0 ]] );

	for ( var i = 1, il = prop.numKeys; i <= il; i++ ) {
		var easeIn = new KeyframeEase( 0.5, i * 10 );
		var easeOut = new KeyframeEase( 0.1, i * 10 );
		prop.setTemporalEaseAtKey( i, [ easeIn ], [ easeOut ] );
	}
	prop.setInterpolationTypeAtKey(
			1,
			KeyframeInterpolationType.BEZIER,
			KeyframeInterpolationType.HOLD
	);
	prop.setInterpolationTypeAtKey(
			2,
			KeyframeInterpolationType.HOLD,
			KeyframeInterpolationType.BEZIER
	);

	// Create a referance layer
	var ref = layer.duplicate();
	ref.moveToBeginning();
	ref.name = 'Original';

	comp.openInViewer();
	return prop;
}
}() );
