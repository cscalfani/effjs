var F = require('../curry');

var testSideEffect = 0;
var test = function(a, b) {
	testSideEffect = 1;
};
var testCurried = F.curry(test);
//////////////////////////////////////////////////////
// isCurried test
if (!F.isCurried(testCurried))
	console.error('isCurried error');
//////////////////////////////////////////////////////
// uncurry test
if (F.isCurried(F.uncurry(testCurried)))
	console.error('uncurry error 1');
if (F.isCurried(F.uncurry(F.curry(testCurried))))
	console.error('uncurry error 2');
if (F.uncurry(testCurried) != test)
	console.error('uncurry error 3');
if (F.uncurry(F.curry(testCurried)) != test)
	console.error('uncurry error 4');
//////////////////////////////////////////////////////
// curry test
testSideEffect = 0;
var calledOnce = testCurried(1);
if (testSideEffect)
	console.error('curry fired too soon');
testSideEffect = 0;
calledOnce(2);
if (!testSideEffect)
	console.error('curry didn\'t fire');
//////////////////////////////////////////////////////
// nested curry test
var testCurried2 = F.curry(testCurried);
testSideEffect = 0;
var calledOnce = testCurried2(1);
if (testSideEffect)
	console.error('nested curry fired too soon');
testSideEffect = 0;
calledOnce(2);
if (!testSideEffect)
	console.error('nested curry didn\'t fire');
//////////////////////////////////////////////////////
// call curried function with too many arguments test
var negFirst = function(fn) {
	return F.curry(function() {
		var args = [].slice.apply(arguments);
		args[0] = -args[0];
		return fn.apply(null, args);
	}, 1);
};
var testNegFirst = negFirst(testCurried);
testSideEffect = 0;
testNegFirst(1, 2);
if (!testSideEffect)
	console.error('nested curry didn\'t fire');
testSideEffect = 0;
testNegFirst(1, 2, 3);
if (!testSideEffect)
	console.error('nested curry didn\'t fire');
//////////////////////////////////////////////////////
// make sure currying works with arity
var testCurriedArity = F.curry(test, 1);
testSideEffect = 0;
var shouldFire = testCurriedArity(1);
if (!testSideEffect)
	console.error('curry didn\'t fire');
//////////////////////////////////////////////////////
// currying works with too many INITIAL arguments
try {
	var testCurriedArgs = F.curry(test, undefined, [1, 2]);
	console.error('exception not thrown when curry called with too many INITIAL arguments');
}
catch (err) {
	if (!err.message.match(/too many/i))
		throw err;
}
//////////////////////////////////////////////////////
// method to function test
var OO = function() {
	OO.prototype.test = function(a, b) {
		testSideEffect = 1;
	};
};
var oo = new OO();
var curriedMethod = F.curryOOMethod(oo.test);
testSideEffect = 0;
var calledOnce = testCurried(1);
if (testSideEffect)
	console.error('curry fired too soon');
testSideEffect = 0;
calledOnce(2);
if (!testSideEffect)
	console.error('curry didn\'t fire');
//////////////////////////////////////////////////////
// class methods to functions test
var oo = new OO();
var _oo = F.curryClassMethods(OO);
testSideEffect = 0;
var calledOnce = _oo.test(1);
if (testSideEffect)
	console.error('curry fired too soon');
testSideEffect = 0;
calledOnce(2)(oo);
if (!testSideEffect)
	console.error('curry didn\'t fire');
