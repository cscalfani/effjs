var curry = require('./curry');
var reorder = require('./reorder');
var utils = require('./utils');

var private = {
	applyTo: function(getArgApplies, fn) {
		return curry.curry(function() {
			var args = [].slice.apply(arguments);
			var argApplies = getArgApplies(args);
			for (var i = 0; i < args.length; ++i)
			{
				if (argApplies[i + 1])
					args[i] = argApplies[i + 1](args[i]);
			}
			return fn.apply(null, args);
		}, curry.getArity(fn));
	},
	argIndexesToArgApplies: function(argIndexes, apply) {
		return argIndexes.reduce(function(acc, argIndex) {
			acc[argIndex] = apply;
			return acc;
		}, {});
	}
};

var args = {
	applyToArg: function(apply, argIndexes, fn) {
		return private.applyTo(function(args) {
			return private.argIndexesToArgApplies(utils.normalizeToArray(argIndexes), apply);
		}, fn);
	},
	applyToArgsFrom: function(apply, argIndex, fn) {
		return private.applyTo(function(args) {
			var generator = require('./generator');
			return private.argIndexesToArgApplies(generator.range(argIndex, args.length), apply);
		}, fn);
	},
	applyToArgs: function(argApplies, fn) {
		return private.applyTo(function(args) {
			return argApplies;
		}, fn);
	}
};

var curriedArgs = curry.curryObject(args);

utils.extend(curriedArgs, {
	// add specialized functions
	applyToAllArgs: reorder.flip(curriedArgs.applyToArgsFrom)(1)
});

module.exports = curriedArgs;
