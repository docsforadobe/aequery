/*jslint browser: true*/

/*global $, alert, timeToCurrentFormat, vaporstack_debug, Folder, File, app, ScriptUI, Window, Panel, CompItem, FolderItem, system*/

var aequery= (function (my) {
 	'use strict';

	var foo = (function(){
		
		var obj = {};
		
		obj.info = function(){
			
		};

		obj.init = function(){
			this.infotext = "placeholder module";
		};

		return obj;
	}());
	

	my.foo = foo;
	// my.foo.parent = my;
	return my;
}(aequery || {}));
