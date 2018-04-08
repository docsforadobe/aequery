( function () {
// @include "../dist/aeq.js";

aeq.undoGroup( 'test attr', function () {
	setup();
	var log = [];

	// Test layer and simple attribute
	var disabledLayers = aeq( 'layer:not(enabled)' );

	var allAreNotEnabled = disabledLayers.isTrueForAll( function ( layer ) {
		return layer.enabled === false;
	});
	log.push( 'All layers are disabled = ' + allAreNotEnabled );

	var firstLayerEnabled = disabledLayers.attr( 'enabled' );
	log.push( 'First layer is enabled = ' + firstLayerEnabled );

	disabledLayers.attr( 'enabled', true );
	firstLayerEnabled = disabledLayers.attr( 'enabled' );
	log.push( 'First layer is enabled = ' + firstLayerEnabled );

	// Test Property and special attribute

	var positionProps = aeq( 'prop[name=\'Rotation\']' );

	var firstValue = positionProps.attr( 'value' );
	log.push( 'First value = ' + firstValue );

	positionProps.attr( 'value', 50 );

	firstValue = positionProps.attr( 'value' );
	log.push( 'First value = ' + firstValue );

	alert( 'Log:\n' + log.join( '\n' ) );
});

function setup() {
	var comp = aeq.comp.create({ name: 'test attr' });
	for ( var i = 0; i < 8; i++ ) {
		var layer = comp.layers.addShape();
		layer.enabled = i % 2 === 0;
	}
	comp.openInViewer();
}
}() );
