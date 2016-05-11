// Resets the position of all groups inside selected shape layers or all shape
// layers if no layers are selected

( function() {
#include "../dist/aeq.js"; // jshint ignore:line

var layers = aeq.getSelectedLayers();

if ( layers.length === 0 ) {
	createUI();
	// aeq.getLayers needs an array;
	layers = aeq.getLayers( aeq.getActiveComp() );
} else {
	doIt();
}

function doIt() {
	aeq.undoGroup( "Reset shape position", function() {
		aeq.forEach( layers, function( layer ) {
			var content = layer.property( "content" );
			if ( content === null ) {
				return;
			}
			// Look for properties with name "Position" inside the "content" group
			aeq( "property[name='Position']", content ).forEach( function( property ) {
				property.setValue( [ 0, 0 ] );
			} );
		});
	});
}

function createUI() {
#include "../dist/aeq-ui.js"; // jshint ignore:line

	// Settings are saved as a string
	if ( aeq.getSetting("aeq_resetShapeLayerPosition", "Do not ask again") === "true" ) {
		return true;
	}
	var win = aeq.ui.createDialog( "Reset Shape Position" );

	var grp = win.addGroup( {
		alignment: 'fill',
		alignChildren: 'fill',
		orientation: 'column'
	} );

	grp.set( {
		bounds: [0, 0, 300, 80 ]
	} );

	grp.addStatictext( "No layers select,\n run script on whole comp?" );
	grp.addCheckbox( "Do not ask again", function() {
		aeq.setSetting( "aeq_resetShapeLayerPosition", "Do not ask again", this.value );
	} );
	var btnGrp = grp.addGroup({
		alignChildren: [ 'right', 'fill' ]
	});
	btnGrp.addButton( "Close", function() {
		win.get().close();
	} );
	btnGrp.addButton( "Yes", function() {
		doIT();
		win.get().close();
	}, { name: "OK" } );

	// The normal show function turn on autolayout, but we do not want that
	win.get().show();
}
}() );
