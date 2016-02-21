aeq.ui = (function (my) {
  my.set = function(obj, options) {
    for (var option in options) {
      if (option !== 'properties' && option !== 'arg1') {
        obj[option] = options[option];
      }
    }
  };

	return my;
}(aeq.ui || {}));
