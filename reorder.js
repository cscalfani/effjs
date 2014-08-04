var curry = require('./curry');
var id = require('./id');

var private = {
	createDefaultOrder: function(fn) {
		return Array.apply(null, Array(curry.getArity(fn))).map(function(item, index) {
			return index + 1;
		});
	}
};

var reorder = {
	reorder: function(fn, order) {
		order = order || [];
		var defaultOrder = private.createDefaultOrder(fn);
		order = defaultOrder.map(function(item, index) {
			return order[index] || item;
		});
		return curry.curryLike(fn, function() {
			var reorderedArgs = [].slice.apply(arguments).map(function(item, index, array) {
				return array[order[index] - 1];
			});
			return fn.apply(null, reorderedArgs);
		});
	},
	nextArg: function(argIndex, fn) {
		var defaultOrder = private.createDefaultOrder(fn);
		var index = defaultOrder.indexOf(argIndex);
		if (index != -1)
			return reorder.reorder(fn, [argIndex].concat(defaultOrder.slice(0, argIndex - 1).concat(defaultOrder.slice(argIndex))));
		else
			return fn;
	},
	flipAll: function(fn) {
		var defaultOrder = private.createDefaultOrder(fn);
		return reorder.reorder(fn, defaultOrder.reverse());
	},
	flip: function(fn) {
		return reorder.reorder(fn, [2, 1]);
	}
};

module.exports = reorder;
