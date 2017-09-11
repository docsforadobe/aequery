( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/renderqueue';

// Var errors = [];

var comp = aeq.comp.create({ name: testName });

aeq.renderqueue.queue( comp );
aeq.renderqueue.unqueue_all();
aeq.renderqueue.clear();

// Alert( testName + ' Errors\n' + errors.join( '\n' ) );
}() );
