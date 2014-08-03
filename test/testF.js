var F = require('../eff');
var math = require('../math');
var utils = require('../utils');

//console.log(F);

var eq = function(a,b) {
	return a == b;
};
// uncurried tests
if (F.flip(F.flip(eq))(3, 9) !== false)
	console.log('eq error 1');
if (F.flip(eq)(3, 9) !== false)
	console.log('eq error 2');
if (F.curry(F.flip(F.flip(eq)))(3)(9) !== false)
	console.log('eq error 3');
if (F.curry(F.flip(F.flip(F.uncurry(F.eq))))(3)(9) !== false)
	console.log('eq error 4');
if (F.curry(F.flip(F.flip(F.uncurry(F.eq))))(3, 9) !== false)
	console.log('eq error 5');
// curried tests
if (F.flip(F.flip(F.eq))(3)(9) !== false)
	console.log('eq error 6');
if (F.flip(F.flip(F.eq))(3, 9) !== false)
	console.log('eq error 7');
if (F.curry(F.flip(F.flip(F.eq)))(3)(9) !== false)
	console.log('eq error 8');
if (F.curry(F.flip(F.flip(F.eq)))(3, 9) !== false)
	console.log('eq error 9');
// object search test
var os = [{a: 1}, {a: 2}, {a: 3}];
var find3 = F.find(F.propEq('a', 3));
if (find3(os).a != 3)
	console.log('find or propEq error');
// sort test
var a = [3, 2, 9, -1];
if (!utils.arraysEqual(F.sort(math.toCompare(F.lt))(a), [-1, 2, 3, 9]))
	console.log('toCompare error');
// sum evens
var sumEvens = F.pipe(F.filter(F.even), F.sum);
if (sumEvens([1,2,3,4,5,6]) != 12)
	console.log('sumEvens error');
var sumEvens2 = F.compose(F.foldl(math.add, 0), F.filter(F.even));
if (sumEvens2([-1,-2,-3,-4,-5,-6]) != -12)
	console.log('sumEvens2 error');
var list = [8, 39, 17, 3, 0, -7, -12, 8, 3];
var process = F.pipe(
	F.map(F.mult(10)),				// * 10
	F.filter(F.flip(F.gte)(0)),		// filter < 0
	F.map(F.add(10)),				// + 10
	F.callFuncs(F.sum, F.size),		// [sum, size]
	F.apply(F.div),					// sum / size
	F.id							// nop
);
if (process(list) != 121.42857142857143)
	console.log('process error');

