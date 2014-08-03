var curry = require('./curry');
var compose = require('./compose');
var args = require('./args');
var bool = require('./bool');
var utils = require('./utils');

var private = {
	iterate: function(o, fn, defaultRet) {
		var keys = Object.keys(o);
		var abort = false;
		var ret = defaultRet;
		for (var i = 0; i < keys.length; ++i)
		{
			fn(keys[i], function(returnValue) {
				abort = true;
				ret = returnValue;
			});
			if (abort)
				return ret;
		}
		return ret;
	}
};
var obj = {
	propEq: function(prop, value, o) {
		return o[prop] == value;
	},
	prop: function(prop, o) {
		return o[prop];
	},
	keys: function(o) {
		return Object.keys(o);
	},
	values: function(o) {
		return obj.keys(o).map(function(key) {
			return o[key];
		});
	},
	forObj: function(fn, o) {
		private.iterate(o, function(key) {
			fn(o[key], key, o);
		});
	},
	mapObj: function(fn, o) {
		var newObj = {};
		private.iterate(o, function(key) {
			newObj[key] = fn(o[key], key, o);
		});
		return newObj;
	},
	reduceObj: function(fn, acc, o) {
		// deep clone accumulator if passed by reference -- N.B. DOES NOT CLONE FUNCTIONS (USE forObj with obj in closure instead)
		if (utils.isPassedByRef(acc))
			acc = JSON.parse(JSON.stringify(acc));
		private.iterate(o, function(key) {
			acc = fn(acc, o[key], key, o);
		});
		return acc;
	},
	filterObj: function(fn, o) {
		var newO = {};
		private.iterate(o, function(key) {
			if (fn(o[key], key, o))
				newO[key] = o[key];
		});
		return newO;
	},
	everyObj: function(fn, o) {
		return private.iterate(o, function(key, returnWith) {
			if (!fn(o[key], key, o))
				returnWith(false);
		}, true);
	},
	someObj: function(fn, o) {
		return private.iterate(o, function(key, returnWith) {
			if (fn(o[key], key, o))
				returnWith(true);
		}, false);
	}
};

var curriedObj = curry.curryObject(obj);

utils.extend(curriedObj, {
	// add inverses
	rejectObj: args.applyToArg(bool.not, 1, curriedObj.filterObj)
});

module.exports = curriedObj;
