var utils = {
	isFunction: function(f) {
		return typeof f == 'function';
	},
	isArray: function(a) {
		return a instanceof Array;
	},
	isString: function(s) {
		return typeof s == 'string';
	},
	isNumber: function(n) {
		return typeof n == 'number';
	},
	isObject: function(o) {
		return !utils.isArray(a) && typeof o == 'object';
	},
	isPassedByRef: function(o) {
		return typeof o == 'object';
	},
	extend: function(o, extend) {
		Object.keys(extend).forEach(function(key) {
			o[key] = extend[key];
		});
		return o;
	},
	defaults: function(o, defaults) {
		Object.keys(defaults).forEach(function(key) {
			if (!(key in o))
				o[key] = defaults[key];
		});
		return o;
	},
	normalizeToArray: function(valueOrArray) {
		return utils.isArray(valueOrArray) ? valueOrArray : [valueOrArray];
	},
	arraysEqual: function(a, b) {
		if (!utils.isArray(a) || !utils.isArray(b))
			return false;
		if (a.length != b.length)
			return false;
		if (a === b)
			return true;
		for (var i = 0; i < a.length; ++i)
		{
			if (a[i] !== b[i])
				return false
		}
		return true;
	}
};
module.exports = utils;