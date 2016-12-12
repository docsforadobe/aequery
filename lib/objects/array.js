/*jslint browser: true*/

var aeq = (function (aeq) {
aeq.arrayEx = function (arr)
{
	arr = arr || [];

	if (arr._init)
		return arr;

	arr._init = true;

	aeq.extend(arr, arrayEx);
	return arr;
};

var arrayEx = {
	forEach: function (callback) {
		var len = this.length;

		for(var i=0; i < len; i++)
			callback(this[i], i, this);
	},

	exists: function (callback) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				return true;
		}

		return false;
	},

	isTrueForAll: function (callback) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (!callback(this[i], i, this))
				return false;
		}

		return true;
	},

	first: function () {
		if (this.length === 0)
			throw new Error('There are no items in this array');

		return this[0];
	},

	find: function (callback, def) {
		var len = this.length;

		for (var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				return this[i];
		}

		return def;
	},

	filter: function (callback) {
		var filteredArr = [];
		var len = this.length;

		for(var i=0; i < len; i++)
		{
			if (callback(this[i], i, this))
				filteredArr.push(this[i]);
		}

		return aeq.arrayEx(filteredArr);
	},

	indexOf: function(searchElement, fromIndex) {
		var k;

    // 1. Let o be the result of calling ToObject passing
    //    the this value as the argument.
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var o = Object(this);

    // 2. Let lenValue be the result of calling the Get
    //    internal method of o with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = o.length >>> 0;

    // 4. If len is 0, return -1.
    if (len === 0) {
      return -1;
    }

    // 5. If argument fromIndex was passed let n be
    //    ToInteger(fromIndex); else let n be 0.
    var n = +fromIndex || 0;

    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 6. If n >= len, return -1.
    if (n >= len) {
      return -1;
    }

    // 7. If n >= 0, then Let k be n.
    // 8. Else, n<0, Let k be len - abs(n).
    //    If k is less than 0, then let k be 0.
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

    // 9. Repeat, while k < len
    while (k < len) {
      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the
      //    HasProperty internal method of o with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      //    i.  Let elementK be the result of calling the Get
      //        internal method of o with the argument ToString(k).
      //   ii.  Let same be the result of applying the
      //        Strict Equality Comparison Algorithm to
      //        searchElement and elementK.
      //  iii.  If same is true, return k.
      if (k in o && o[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
	},

	select: function (callback) {
		var selectedArr = [];
		var len = this.length;

		for(var i=0; i < len; i++)
			selectedArr.push(callback(this[i], i, this));

		return aeq.arrayEx(selectedArr);
	},

	map: function (callback) {
		var obj = {};
		var len = this.length;

		for(var i=0; i < len; i++)
		{
			var o = callback(this[i], i, this);
			obj[o.key] = o.value;
		}

		return obj;
	},

	insertAt: function (insert, index) {
		this.splice(index, 0, insert);
	},

	attr: function(attributeName, newValue) {

		// aeq.attr checks the arguments length to determine to get or set
		// and it needs an object to get or set attributes to.

		// Add this array object to the beginning of arguments
		[].unshift.call(arguments, this);
		return aeq.attr.apply( this, arguments );
	}
};

return aeq;
}(aeq || {}));
