( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/property';

// Var errors = [];

var layer = aeq.comp.create({ name: testName }).layers.addShape();
var prop = layer.property( 'Position' );

alert( aeq.property.valueType( prop ) );
alert( aeq.property.type( prop ) );

// Alert( testName + ' Errors\n' + errors.join( '\n' ) );
}() );
