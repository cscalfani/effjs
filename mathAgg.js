var math = require('./math');
var list = require('./list');

var mathAgg = {
	sum: list.foldl(math.add, 0),
	product: list.foldl(math.mult, 1)
};

module.exports = mathAgg;
