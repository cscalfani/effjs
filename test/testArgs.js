var F = require('../args');
var curry = require('../curry');

var f = function(a, b, c, d) {
	return String(a) + b + c + d;
};

//////////////////////////////////////////////////////
// applyToArg test
var toUpper = curry.curryOOMethod(String.prototype.toUpperCase);
var upperSecond = F.applyToArg(toUpper, 2, f);
if (upperSecond('a', 'b', 'c', 'd') != 'aBcd')
	console.error('applyToArg error 1');
var upperFirstAndLast = F.applyToArg(toUpper, [1, 4], f);
if (upperFirstAndLast('a', 'b', 'c', 'd') != 'AbcD')
	console.error('applyToArg error 2');
//////////////////////////////////////////////////////
// applyToArgFrom test
var upperAfterSecond = F.applyToArgsFrom(toUpper, 3, f);
if (upperAfterSecond('a', 'b', 'c', 'd') != 'abCD')
	console.error('applyToArgsFrom error 1');
var upperAll = F.applyToAllArgs(toUpper, f);
if (upperAll('a', 'b', 'c', 'd') != 'ABCD')
	console.error('applyToArgsFrom error 2');
//////////////////////////////////////////////////////
// applyToArgs test
var toLower = curry.curryOOMethod(String.prototype.toLowerCase);
var firstSecondAndLast = F.applyToArgs({
	1: toUpper,
	2: toLower,
	4: toUpper
}, f);
if (firstSecondAndLast('a', 'B', 'c', 'd') != 'AbcD')
	console.error('applyToArgs error');
