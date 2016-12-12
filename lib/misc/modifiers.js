var aeq = (function(aeq) {

	aeq.getModifiers = function() {
		return {
			meta: ScriptUI.environment.keyboardState.metaKey,
			ctrl: ScriptUI.environment.keyboardState.ctrlKey,
			alt: ScriptUI.environment.keyboardState.altKey,
			shift: ScriptUI.environment.keyboardState.shiftKey
		};
	};

return aeq;
}(aeq || {}));
