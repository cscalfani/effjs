var curry = require('./curry');
var utils = require('./utils');
var id = require('./id');
var reorder = require('./reorder');

var bool = {
	not: function(fn) {
		return curry.setArityLike(fn, function() {
			return !fn.apply(null, arguments);
		});
	},
	and: function(f, g) {
		return function() {
			return !!(f.apply(null, arguments) && g.apply(null, arguments));
		};
	},
	or: function(f, g) {
		return function() {
			return !!(f.apply(null, arguments) || g.apply(null, arguments));
		};
	},
	retTrue: id.constant(true),
	retFalse: id.constant(false),
	ltToCompare: function(pred) {
		return function(a, b) {
			return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
		}
	},
	gtToCompare: function(pred) {
		return reorder.flip(curriedBool.ltToCompare(pred));
	}
};

var curriedBool = curry.curryObject(bool);

module.exports = curriedBool;
