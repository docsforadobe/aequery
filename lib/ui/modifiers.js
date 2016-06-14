aeq.ui = (function (ui) {

ui.modifiers = {
	alt: function() {
    	return ScriptUI.environment.keyboardState.altKey;
	}
};

return ui;
}(aeq.ui || {}));
