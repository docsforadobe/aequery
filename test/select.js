( function () {
// @include "../dist/aeq.js";

var comp = aeq.comp.create({ name: 'Test: selector' });
comp.openInViewer();
var layer = comp.layers.addShape();
for ( var i = 0; i < 5; i++ ) {
	var newLayer = layer.duplicate();
	newLayer.name = 'layerName ' + i;
}

var select4 = aeq( 'layer:not(name=[\'layerName 0\', \'layerName 2\'])' );
if ( select4.length !== 4 ) {
	alert( 'select4 did not select 4' );
}

var select1 = aeq( 'layer[name=/^Shape/]' );
if ( select1.length !== 1 ) {
	alert( 'layer[name=/^Shape/] did not select 1' );
}

var select1 = aeq( 'layer:has(name=/^Shape/)' );
if ( select1.length !== 1 ) {
	alert( 'layer:has(name=/^Shape/) did not select 1' );
}

var select2 = aeq( 'layer[name=[\'layerName 0\', \'layerName 2\']]' );
if ( select2.length !== 2 ) {
	alert( 'select2 did not select 2' );
}

if ( aeq( 'activeComp' )[0] !== comp ) {
	alert( 'activecomp did not get activecomp' );
}

select1 = aeq( 'item[name=\'' + comp.name + '\']' );
if ( select1.length !== 1 ) {
	alert( 'item[name=\'' + comp.name + '\'] did not select 1' );
}

comp.remove();
alert( 'Done checking select.js' );
}() );
