( function ( aeq ) {
// @include "../dist/aeq.js"

aeq.undoGroup( 'test Key.copyTo', function () {
	var prop = setup( 'test aeq.Key methods' );

	// Set easing and tangents
	aeq( 'keys', prop ).forEach( function ( key ) {
		key.interpolationType( 'BEZIER', KeyframeInterpolationType.BEZIER );
		var easeIn = new KeyframeEase( 0.5, 50 );
		var easeOut = new KeyframeEase( 0.1, 50 );
		key.temporalEase( easeIn, easeOut );
		key.spatialTangent( [ 11.0, 50, 10 ], [ 11.0, 40, 100 ] );
	});

	// Test setting other properties
	var aProp = new aeq.Property( prop );
	aProp.key( 2 ).roving( true );
	aProp.key( 2 ).selected( true );
	aProp.key( 2 ).spatialAutoBezier( false );
	aProp.key( 2 ).spatialContinuous( false );
	aProp.key( 2 ).temporalAutoBezier( false );
	aProp.key( 2 ).temporalContinuous( false );
	aProp.key( 2 ).value( [ 400, 400, 400 ] );
});

function setup( name, duration ) {
	var comp = aeq.comp.create({ name: name, duration: duration || 3 });
	var layer = comp.layers.addShape();

	var prop = layer.property( 'transform' ).property( 'Position' );
	prop.setValuesAtTimes( [ 0, 1, 2 ], [[ 100, 100, 100 ], [ 0, 0, 0 ], [ 100, 200, 0 ]] );

	// Create a referance layer
	var ref = layer.duplicate();
	ref.moveToBeginning();
	ref.name = 'Original';

	comp.openInViewer();
	return prop;
}
}() );
