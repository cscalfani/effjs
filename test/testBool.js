var F = require('../bool');
var curry = require('../curry');

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
var lt = function(a, b) {
	return a < b;
};
var ceq = curry.curry(eq);
var cneq = curry.curry(neq);
var cgt = curry.curry(gt);
var cgte = curry.curry(gte);
//////////////////////////////////////////////////////
// and test
if (F.and(eq)(gte)(1, 1) !== true)
	console.log('and error');
//////////////////////////////////////////////////////
// or test
var orF = F.or(eq);
if (orF(neq)(2, 3) !== true)
	console.log('or error');
//////////////////////////////////////////////////////
// retTrue test
if (F.retTrue() !== true || F.and(F.retTrue)(F.retTrue)() !== true)
	console.log('retTrue error');
//////////////////////////////////////////////////////
// retFalse test
if (F.retFalse() !== false || F.and(F.retFalse, F.retTrue)() !== false)
	console.log('retFalse error');
//////////////////////////////////////////////////////
// ltToCompare test
var compareF = F.ltToCompare(lt);
if (compareF('a', 'z') !== -1)
	console.log('ltToCompare error 1');
if (compareF('z', 'a') !== 1)
	console.log('ltToCompare error 2');
if (compareF('x', 'x') !== 0)
	console.log('ltToCompare error 3');
//////////////////////////////////////////////////////
// gtToCompare test
var compareF2 = F.gtToCompare(gt);
if (compareF2('a', 'z') !== -1)
	console.log('gtToCompare error 1');
if (compareF2('z', 'a') !== 1)
	console.log('gtToCompare error 2');
if (compareF2('x', 'x') !== 0)
	console.log('gtToCompare error 3');
