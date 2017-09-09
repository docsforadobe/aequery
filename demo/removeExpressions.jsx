// Remove expressions from active comp
//@include "../dist/aeq.js";
aeq.snippet.activeComp( 'Remove Expressions', function ( comp ) {
	aeq( 'prop[canSetExpression]:not(expression="")', comp ).attr( 'expression', '' )
})
