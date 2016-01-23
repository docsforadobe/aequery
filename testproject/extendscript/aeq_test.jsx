#include "aeq.js"
#include "aeq-ui.js"

function buildUI(win)
{
	var aeqFile = File("aeq.js");
	var aeqUiFile = File("aeq-ui.js");

	var winObj = win.get();

	winObj.alignment = ['fill', 'fill'];
	winObj.alignChildren = ['fill', 'fill'];
	var txtInput = win.addEditText('Enter a value');

	var btn1 = win.addButton('Button 1', function(e) {
		alert(aeq(txtInput.text));
	});

	var btn2 = win.addButton('Redefine AEQ', function(e) {
		$.evalFile(aeqFile);
		$.evalFile(aeqUiFile);
	});
}

aeq.ui.ready(function()
{
	var win = aeq.ui.createMainWindow("Hello world!");

	buildUI(win);

	win.show();
});
