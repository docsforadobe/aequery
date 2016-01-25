/*jshint ignore:start*/
#include "aeq.js";
#include "aeq-ui.js";
/*jshint ignore:end*/

function buildUI(win) {
	// TODO statictext
	win.set({
		alignment: ['fill', 'top'],
		alignChildren: ['fill', 'top']
	});
	win.addEditText('EditText text');
	win.addButton('Button Name', function() {
		alert('Button clicked');
	});
	win.addCheckbox('Checkbox Name', function() {
		alert(this.value);
	});
	// TODO radiobutton
	win.addDropdownList(['Item 1', 'Item 2', 'Item 3', 'Item 4'], function() {
		alert(this.selection);
	});
	win.addListbox(['Item 1', 'Item 2', 'Item 3', 'Item 4'], {
		multiselect: true,
		numberOfColumns: 1
	}, function() {
		alert(this.selection);
	});

	var buttonGroup = win.addGroup();
	buttonGroup.alignChildren('fill', 'top');
	buttonGroup.addButton('Button 1');
	buttonGroup.addButton('Button 2');
	buttonGroup.addButton('Button 3');

	var buttonPanel = win.addPanel('Panel Name');
	buttonPanel.set({ alignChildren: 'fill' });
	buttonPanel.addButton('Button 1');
	buttonPanel.addButton('Button 2');
	buttonPanel.addButton('Button 3');

	// TODO tabbedPanel

	// TODO progressbar

}

aeq.ui.ready(function()
{
	var win = aeq.ui.createMainWindow("Panel Name");

	buildUI(win);

	win.show();
});
function redefineAeq(aeqFile, aeqUiFile) {
	$.evalFile(aeqFile);
	$.evalFile(aeqUiFile);
	return aeq;
}
