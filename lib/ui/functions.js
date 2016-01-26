aeq.ui = (function (my) {
  my.set = function(obj, options) {
    for (var option in options) {
      if (option !== 'properties' && obj.hasOwnProperty(option)) {
        obj[option] = options[option];
      }
    }
  };

	return my;
}(aeq.ui || {}));
