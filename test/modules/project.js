( function () {
// @include "../../dist/aeq.js"

var testName = 'Test modules/project';
var errors = [];

var folder = app.project.items.addFolder( testName );
app.project.importPlaceholder( testName + '1', 100, 100, 20, 10 ).parentFolder = folder;
app.project.importPlaceholder( testName + '2', 100, 100, 20, 10 ).parentFolder = folder;
app.project.importPlaceholder( testName + '3', 100, 100, 20, 10 ).parentFolder = folder;

if ( aeq.project.getFootage().length !== 3 ) {
	errors.push( 'getFootage failed' );
}

if ( aeq.project.getFolders().length !== 1 ) {
	errors.push( 'getFolders failed' );
}

folder.selected = true;
if ( aeq.project.getSelectedFolders().length !== 1 ) {
	errors.push( 'getSelectedFolders failed' );
}

alert( testName + ' Errors\n' + errors.join( '\n' ) );
}() );
