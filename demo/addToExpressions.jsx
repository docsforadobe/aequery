// Add posterize(0.00001) to expressions on selected properties
//@include "../dist/aeq.js";
aeq.snippet.forEachSelectedProperty( 'Posterize', function ( prop ) {
	if ( prop.expression ) {
		prop.expression = 'posterizeTime(0.000001);\n' + props[i].expression
	}
})
