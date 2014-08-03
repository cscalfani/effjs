var utils = require('./utils');

var curry = {
	getArity: function(fn) {
		return fn.arity || fn.length;
	},
	setArityLike: function(fn, f) {
		f.arity = curry.getArity(fn);
		return f;
	},
	setArityTo: function(arity, f) {
		f.arity = arity;
		return f;
	},
	isCurried: function(fn) {
		return utils.isFunction(fn.preCurry);
	},
	uncurry: function(fn) {
		var ucfn = fn;
		while (ucfn.preCurry)
			ucfn = ucfn.preCurry;
		return ucfn;
	},
	curryLike: function(efn, fn, args) {
		return curry.curry(fn, curry.getArity(efn), args);
	},
	curry: function(fn, arity, args) {
		arity = arity != undefined ? arity : curry.getArity(fn);
		var args = args || [];
		if (arity <= 1 || curry.isCurried(fn))
			return fn;
		if (args.length >= arity)
			throw new Error('Too many arguments');
		var curryFn = function() {
			var cargs = args.concat([].slice.apply(arguments));
			if (cargs.length >= arity)
			{
				if (cargs.length == arity)
					return fn.apply(null, cargs);
				else
				{
					var fnOrRetVal = fn.apply(null, cargs.slice(0, arity));
					if (utils.isFunction(fnOrRetVal))
						return fnOrRetVal.apply(null, cargs.slice(arity));
					else
						return fnOrRetVal;
				}
			}
			else
				return curry.curry(fn, arity, cargs);
		};
		curryFn.preCurry = fn;
		curryFn.arity = arity - args.length;
		return curryFn;
	},
	curryObject: function(o, arities, replace) {
		arities = arities || {};
		replace = replace == undefined ? true : replace;
		var funcs = {};
		Object.keys(o).forEach(function(property) {
			if (utils.isFunction(o[property]))
				funcs[property] = curry.curry(o[property], arities[property]);
		});
		if (replace)
			utils.extend(o, funcs);
		return funcs;
	},
	curryOOMethod: function(method, arity) {
		arity = arity != undefined ? arity : method.length;
		return curry.curry(function() {
			var args = [].slice.apply(arguments);
			var obj = args.pop();
			return method.apply(obj, args);
		}, arity + 1);
	},
	curryClassMethods: function(object, arities) {
		arities = arities || {};
		var funcs = {};
		var proto = object['prototype'];
		Object.getOwnPropertyNames(proto).forEach(function(property) {
			if (utils.isFunction(proto[property]))
				funcs[property] = curry.curryOOMethod(proto[property], arities[property]);
		});
		return funcs;
	}
};

module.exports = curry;
