var aeq = ( function ( aeq ) {
/**
 * Creates and alerts an aequery error from a JS error
 * @method
 * @memberof aeq
 * @param  {Error} err JS error object
 * @param  {type} args [description]
 */
aeq.error = function ( err, args ) {
	var callingFunction = /\s*function\s*([^\(]*)/i.exec( err.source );
	callingFunction = callingFunction !== null && callingFunction[1] !== '' ?
		callingFunction[1] :
		'anonymous';

	alert( err.toString() + '\n' +
		'Script File: ' + File.decode( err.fileName ).replace( /^.*[\\|\/]/, '' ) +

		// Arguments.callee is the more reliable way of getting the function name
		'\nFunction: ' + ( args === undefined ? callingFunction : args.callee.name ) +
		( args === undefined || args.length === 0 ?
			'' :
			'\nArguments: ' + Array.prototype.toString.call( args ) ) +
		'\nError on Line: ' + err.line.toString()
	);
};

return aeq;
}( aeq || {}) );
