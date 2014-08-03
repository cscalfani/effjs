var curry = require('./curry');
var math = require('./math');

var generator = {
	range: function(from, to) {
		var diff = to - from;
		var range = Array.apply(null, Array(Math.abs(diff) + 1));
		var next = diff < 0 ? math.dec : math.inc;
		var compare = diff < 0 ? math.gte : math.lte;
		for (var i = 0, j = from; compare(j, to); j = next(j), ++i)
			range[i] = j;
		return range;
	}
};

var curriedGenerator = curry.curryObject(generator);

module.exports = curriedGenerator;
