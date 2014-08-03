var curry = require('./curry');

var compose = {
	compose: function() {
		return curry.curryLike(arguments[arguments.length - 1], compose.compose$.apply(null, arguments));
	},
	compose$: function() {
		var compose2 = function(f, g) {
			return function() {
				return f(g.apply(null, arguments));
			};
		};
		var f = arguments[0];
		for (var i = 1; i < arguments.length; ++i)
			f = compose2(f, arguments[i]);
		return f;
	},
	pipe: function() {
		var args = [].slice.apply(arguments);
		return compose.compose.apply(null, args.reverse());
	},
	pipe$: function() {
		var args = [].slice.apply(arguments);
		return compose.compose$.apply(null, args.reverse());
	}
};

module.exports = compose;
