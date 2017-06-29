/**
 * Adds motion blur to all layers that are animated in the currenlty open comp.
 */
( function () {
	//@include ../dist/aeq.js

	var comp = aeq.getActiveComp();

	if ( comp === null ) {
		return;
	}

	aeq.createUndoGroup( "Add motionblur", addMotionBlurToCompLayers, [ comp ] );

	function addMotionBlurToCompLayers( comp ) {
		aeq( "layer:not(motionBlur)", comp ).forEach( function( layer ) {
			aeq.forEachProperty( layer, function( property ) {
				if ( property.isTimeVarying ) {
					addMotionBlur( layer );
					return false;
				}
			} );
		} );
	}

	function addMotionBlur( layer ) {
		var children = aeq.layer.children( layer );

		aeq.forEach( children, addMotionBlur );
		if ( layer.motionBlur !== undefined && !layer.nullLayer ) {
			layer.motionBlur = true;
		}
	}
}() );
