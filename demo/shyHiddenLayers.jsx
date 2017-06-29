// Shy all disabled layers in active comp
//@include "../dist/aeq.js";
aeq.snippet.activeComp( 'ShyHiddenLayers', function ( comp ) {
	aeq( 'layer:not(enabled)', comp ).forEach( function ( layer ) {
		layer.shy = true
	})
	comp.hideShyLayers = true
})
