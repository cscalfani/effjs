var curry = require('./curry');
var utils = require('./utils');

var funcs = {
	callFuncs: function() {
		var funcs = [].slice.apply(arguments);
		return curry.curryLike(funcs[0], function() {
			var args = [].slice.apply(arguments);
			return funcs.map(function(f) {
				return f.apply(null, args);
			});
		});
	},
	call: function(f) {
		return function() {
			var args = [].slice.apply(arguments);
			return funcs.apply(f)(args);
		};
	},
	apply: function(f) {
		return function(args) {
			return curry.curryLike(f, function() {
				return f.apply(null, arguments);
			}).apply(null, args);
		};
	}
};

module.exports = funcs;
