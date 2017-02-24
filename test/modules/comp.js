( function () {
//@include "../../dist/aeq.js"

var testName = "Test modules/comp";

aeq.comp.create();
var folder = app.project.items.addFolder( testName );

aeq.comp.create( folder );

aeq.comp.create( folder, {
	name: testName + ' using folder as first arg',
	width: 100,
	duration: 10
} );

aeq.comp.create( {
	name: testName + ' No folder, all custom',
	width: 100,
	height: 100,
	pixelAspect: 0.3,
	duration: 10,
	frameRate: 10
} );

aeq.comp.create( {
	name: testName + ' Using folder in options',
	width: 100,
	duration: 10,
	folder: folder
} );

}() );
