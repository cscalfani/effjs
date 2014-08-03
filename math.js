var utils = require('./utils');
var id = require('./id');
var reorder = require('./reorder');
var curry = require('./curry');
var bool = require('./bool');

var math = {
	add: function(a, b) {
		return a + b;
	},
	sub: function(a, b) {
		return a - b;
	},
	mult: function(a, b) {
		return a * b;
	},
	div: function(a, b) {
		return a / b;
	},
	mod: function(a, b) {
		return a % b;
	},
	lt: function(a, b) {
		return a < b;
	},
	lte: function(a, b) {
		return a <= b;
	},
	gt: function(a, b) {
		return a > b;
	},
	gte: function(a, b) {
		return a >= b;
	},
	eq: function(a, b) {
		return a == b;
	},
	eqStrict: function(a, b) {
		return a === b;
	},
	sign: function(n) {
		return n && n / Math.abs(n);
	},
	inc: function(n) {
		return ++n;
	},
	dec: function(n) {
		return --n;
	},
	even: function(n) {
		return n % 2 == 0;
	},
	zero: id.constant(0),
	negative: function(x) {
		return -x;
	},
	toCompare: function(pred) {
		return curry.curry(function(a, b) {
			return pred(a, b) ? -1 : (pred(b, a) ? 1 : 0);
		});
	}
};
utils.extend(math, {
	takeAway: reorder.flip(math.sub),
	divBy: reorder.flip(math.div),
	modBy: reorder.flip(math.mod),
	neq: bool.not(math.eq),
	neqStrict: bool.not(math.eqStrict),
	odd: bool.not(math.even)
});

var curriedMath = curry.curryObject(math);

module.exports = curriedMath;
