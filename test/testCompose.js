var F = require('../compose');
var math = require('../math');

var f = function(a) {
	return a * 10;
};
var g = function(b) {
	return b - 10;
};
var h = function(x, y) {
	return x * y;
};
//////////////////////////////////////////////////////
// compose test
var cfg = F.compose$(f, g);
if (cfg(20) != 100)
	console.error('compose$ error');
//////////////////////////////////////////////////////
// compose test
var cnh = F.compose(math.negative, h);
if (cnh(5)(2) != -10)
	console.error('compose error 1');
var cnh2 = F.compose(math.neq, h);
if (cnh2(5)(2)(-10) === false)
	console.error('compose error 2');
//////////////////////////////////////////////////////
// pipe test
var pfg = F.pipe(f, g);
if (pfg(20) != 190)
	console.error('pipe error');
//////////////////////////////////////////////////////
// pipe test
var pnh = F.pipe(h, math.negative);
if (pnh(5)(2) != -10)
	console.error('pipe error 1');
var pnh2 = F.pipe(h, math.neq);
if (pnh2(5)(2)(-10) === false)
	console.error('pipe error 2');
