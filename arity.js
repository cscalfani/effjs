var utils = require('./utils');
var curry = require('./curry');

var arity = {
	nAry: function(arity, fn) {
		return curry.curry(function() {
			return fn.apply(null, [].slice.call(arguments, 0, arity));
		}, arity);
	}
};

var curriedArity = curry.curryObject(arity);

utils.extend(arity, {
	binary: curriedArity.nAry(2)
});

module.exports = arity;
