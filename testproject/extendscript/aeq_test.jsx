#include "aeq.js"
#include "aeq-ui.js"

function buildUI(win)
{
	var txtInput = win.addEditText('Enter a value');

	var btn1 = win.addButton('Button 1', function(e) { 
		alert(txtInput.text);
	});

	var btn2 = win.addButton('Button 2', function(e) { 
		alert("Hello world");
	});
}

aeq.ui.ready(function() 
{
	var win = aeq.ui.createMainWindow("Hello world!");

	buildUI(win);

	win.show();
});