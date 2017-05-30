var aeq = (function(aeq) {

	/**
	 * [description]
	 * @method
	 * @memberof aeq
	 * @return {type} [description]
	 */
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
