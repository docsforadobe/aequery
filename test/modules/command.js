( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/command';

// CallSystem gets tested by the other functions

// openURL
aeq.command.openURL( 'https://bitbucket.org/motiondesign/' );
aeq.command.openURL( 'http://bitbucket.org/motiondesign/aequery' );
aeq.command.openURL( 'bitbucket.org/motiondesign/aequery/downloads/' );

// RevealFile
var file = new File( '../../dist/aeq.js' );
aeq.command.revealFile( file );
aeq.command.revealFile( file.fsName );
aeq.command.revealFile( '../../dist/aeq.js' );

// CopyToClipboard
aeq.command.copyToClipboard( testName );
}() );
