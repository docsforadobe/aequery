( function () {
//@include "../../dist/aeq.js"

var testName = "Test modules/renderqueue";
// var errors = [];

var comp = aeq.comp.create( { name: testName } );

aeq.renderqueue.queue(comp);
aeq.renderqueue.unqueue_all();
aeq.renderqueue.clear();

// alert( testName + ' Errors\n' + errors.join( '\n' ) );

}() );
