var F = require('../boollist');
var curry = require('../curry');
var arity = require('../arity');

var eq = function(a, b) {
	return a == b;
};
var neq = function(a, b) {
	return a != b;
};
var gt = function(a, b) {
	return a > b;
};
var gte = function(a, b) {
	return a >= b;
};
var ceq = curry.curry(eq);
var cneq = curry.curry(neq);
var cgt = curry.curry(gt);
var cgte = curry.curry(gte);
//////////////////////////////////////////////////////
// all test
var allF = F.all$(ceq(1), cneq(2));
if (allF(1) !== true)
	console.log('all$ error');
var allF2 = F.all(cneq, cgt);
if (allF2(1)(0) !== true)
	console.log('all error 1');
var allF3 = F.all(cneq, cgt, arity.nAry(3, console.error)('Short circuit error'));
if (allF3(0)(1) !== false)
	console.log('all error 2');
//////////////////////////////////////////////////////
// any test
var anyF = F.any$(cneq(1), ceq(1));
if (anyF(1) !== true)
	console.log('any$ error');
var anyF2 = F.any(ceq, cneq, cgt, arity.nAry(3, console.error)('Short circuit error'));
if (anyF2(1)(0) !== true)
	console.log('any error');
