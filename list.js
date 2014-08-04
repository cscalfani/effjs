var curry = require('./curry');
var args = require('./args');
var math = require('./math');
var compose = require('./compose');
var utils = require('./utils');
var arity = require('./arity');
var bool = require('./bool');
var id = require('./id');
var reorder = require('./reorder');

var private = {
	iterate: function(list, fn, defaultValue) {
		var abort = false;
		var ret = defaultValue;
		for (var i = 0; i < list.length; ++i)
		{
			fn(list[i], i, list, function(returnValue) {
				abort = true;
				ret = returnValue;
			});
			if (abort)
				return ret;
		}
		return ret;
	},
	find: function(fn, list) {
		return private.iterate(list, function(item, index, list, returnWith) {
			if (fn(item, index, list))
				returnWith({item: item, index: index});
		}, {index: -1});
	}
};
var listModule = {
	take: function(count, list) {
		return list.slice(0, Math.min(count, list.length));
	},
	takeWhile: function(fn, list) {
		var index = listModule.find(bool.not(fn), list) - 1;
		return index == -1 ? [] : list.slice(0, index);
	},
	skip: function(count, list) {
		return list.slice(count);
	},
	skipWhile: function(fn, list) {
		var index = listModule.find(bool.not(fn), list) - 1;
		return index == -1 ? [] : list.slice(index);
	},
	find: function(fn, list) {
		return private.find(fn, list).item;
	},
	findIndex: function(fn, list) {
		return private.find(fn, list).index;
	},
	findLastIndex: function(fn, list) {
		var index = private.find(fn, list.slice().reverse()).index;
		return index == -1 ? -1 : list.length - 1 - index;
	},
	reduce: function(fn, acc, list) {
		// deep clone accumulator if passed by reference -- N.B. DOES NOT CLONE FUNCTIONS (USE for with obj in closure instead)
		if (utils.isPassedByRef(acc))
			acc = JSON.parse(JSON.stringify(acc));
		return list.reduce(fn, acc);
	},
	reduceRight: function(fn, acc, list) {
		// deep clone accumulator if passed by reference -- N.B. DOES NOT CLONE FUNCTIONS (USE for with obj in closure instead)
		if (utils.isPassedByRef(acc))
			acc = JSON.parse(JSON.stringify(acc));
		for (var i = list.length - 1; i >= 0 ; --i)
			acc = fn(acc, list[i], i, list);
		return acc;
	},
	size: function(list) {
		return list.length;
	},
	head: function(list) {
		return list[0];
	},
	tail: function(list) {
		return list.slice(1);
	}
};

var curriedList = curry.curryObject(listModule);

// add a selection of curried native Array functions
var _a = curry.curryClassMethods(Array);
utils.extend(curriedList, ['map', 'filter', 'every', 'some', 'indexOf','lastIndexOf', 'sort'].map(function(funcName) {
	curriedList[funcName] = _a[funcName];
}));

utils.extend(curriedList, {
	concat: reorder.flip(_a.concat),
	cloneList: curry.curryOOMethod(Array.prototype.slice, 0),
	// add minor variations on natives
	contains: compose.compose(math.neq(-1), curriedList.indexOf),
	// add aliases
	foldl: curriedList.reduce,
	foldr: curriedList.reduceRight,
	// add inverses
	reject: args.applyToArg(bool.not, 1, curriedList.filter),
	// add min & max
	min: curriedList.reduce(arity.binary(Math.min), Infinity),
	max: curriedList.reduce(arity.binary(Math.max), -Infinity)
});

utils.extend(curriedList, {
	reverse: compose.compose(_a.reverse, curriedList.cloneList),
	findLast: args.applyToArg(compose.compose(_a.reverse, curriedList.cloneList), 2, curriedList.find)
});

utils.extend(curriedList, curry.curryObject({
	uniq: function(compare, list) {
		compare = compare || math.eqStrict;
		return list.reduce(function(acc, item) {
			if (!curriedList.contains(item, acc))
				acc.push(item);
			return acc;
		}, []);
	}
}));

module.exports = curriedList;
