( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/layer';
var errors = [];

var comp = aeq.comp.create({ name: testName });
var parent = comp.layers.addShape();
parent.name = 'parent';
var layer = comp.layers.addShape();
layer.enabled = false;

var sourceLayer = layer.duplicate();
sourceLayer.name = 'source';
sourceLayer.enabled = true;
sourceLayer.solo = true;
sourceLayer.shy = true;
sourceLayer.effectsActive = true;
sourceLayer.motionBlur = true;
sourceLayer.adjustmentLayer = true;
sourceLayer.threeDLayer = true;
sourceLayer.preserveTransparency = true;
sourceLayer.parent = parent;
sourceLayer.inPoint = 0.5;
sourceLayer.stretch = 0.3;
sourceLayer.startTime = 0.3;
sourceLayer.outPoint = 0.6;
sourceLayer.label = 15;
sourceLayer.guideLayer = true;
sourceLayer.comment = 'comment';
sourceLayer.autoOrient = AutoOrientType.ALONG_PATH;

aeq.layer.setLayerToggles( sourceLayer, layer );

if ( aeq.layer.children( parent ).length !== 2 ) {
	errors.push( 'layer.children failed' );
}

layer.parent = sourceLayer;

if ( aeq.layer.allChildren( parent ).length !== 2 ) {
	errors.push( 'layer.allChildren failed' );
}

if ( aeq.layer.parents( layer ).length !== 2 ) {
	errors.push( 'layer.parents failed' );
}

if ( aeq.layer.relatedLayers( sourceLayer ).length !== 2 ) {
	errors.push( 'layer.relatedLayers failed' );
}

alert( testName + ' Errors\n' + errors.join( '\n' ) );
}() );
