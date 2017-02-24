( function () {
//@include "../../dist/aeq.js"

var testName = "Test modules/property";
// var errors = [];

var layer = aeq.comp.create( { name: testName } ).layers.addShape();
var prop = layer.property("Position");

alert(aeq.property.valueType(prop));
alert(aeq.property.type(prop));

// alert( testName + ' Errors\n' + errors.join( '\n' ) );

}() );
