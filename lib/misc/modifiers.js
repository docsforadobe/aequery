aeq = ( function ( aeq ) {
/**
	 * Returns a pressed-state object of modifier keys
	 * @method
	 * @memberof aeq
	 * @return {{meta: boolean, ctrl: boolean, alt: boolean, shift: boolean}}
	 * Pressed-states object of modifier keys
	 */
aeq.getModifiers = function () {
	return {
		meta: ScriptUI.environment.keyboardState.metaKey,
		ctrl: ScriptUI.environment.keyboardState.ctrlKey,
		alt: ScriptUI.environment.keyboardState.altKey,
		shift: ScriptUI.environment.keyboardState.shiftKey
	};
};

return aeq;
}( aeq || {}) );
