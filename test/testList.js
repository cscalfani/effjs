var F = require('../list');
var obj = require('../obj');
var math = require('../math');
var bool = require('../bool');
var utils = require('../utils');

var nList = [1, 2, 3, 4, 5];
var nnList = [-1, -2, -3, -4, -5];
var aList = ['a', 'b', 'c', 'd'];
var rnList = [3, 1, 2, 5, 4];
var raList = ['c', 'b', 'd', 'a'];
//////////////////////////////////////////////////////
// find test
var findF = F.find(function(item) {
	return item > 3;
});
if (findF(nList) !== 4)
	console.log('find error');
//////////////////////////////////////////////////////
// findLast test
var findLastF = F.findLast(function(item) {
	return item > 3;
});
if (findLastF(nList) !== 5)
	console.log('findLast error');
//////////////////////////////////////////////////////
// findIndex test
var findIndexF = F.findIndex(function(item) {
	return item > 3;
});
if (findIndexF(nList) !== 3)
	console.log('findIndex error 1');
if (findIndexF(nnList) != -1)
	console.log('findIndex error 2');
//////////////////////////////////////////////////////
// findLastIndex test
var findLastIndexF = F.findLastIndex(function(item) {
	return item > 3;
});
if (findLastIndexF(nList) !== 4)
	console.log('findLastIndex error 1');
if (findLastIndexF(nnList) !== -1)
	console.log('findLastIndex error 2');
//////////////////////////////////////////////////////
// take test
var takeF = F.take(2);
if (takeF(nList).length != 2)
	console.log('take error 1');
if (!utils.arraysEqual(takeF(nList), [1, 2]))
	console.log('take error 2');
//////////////////////////////////////////////////////
// takeWhile test
var takeWhileF = F.takeWhile(function(item) {
	return item < 4;
});
if (takeWhileF(nList).length != 3)
	console.log('takeWhile error 1');
if (!utils.arraysEqual(takeWhileF(nList), [1, 2, 3]))
	console.log('takeWhile error 2');
//////////////////////////////////////////////////////
// skip test
var skipF = F.skip(2);
if (skipF(nList).length != 3)
	console.log('skip error 1');
if (!utils.arraysEqual(skipF(nList), [3, 4, 5]))
	console.log('skip error 2');
//////////////////////////////////////////////////////
// skipWhile test
var skipWhileF = F.skipWhile(function(item) {
	return item < 4;
});
if (skipWhileF(nList).length != 2)
	console.log('skipWhile error 1');
if (!utils.arraysEqual(skipWhileF(nList), [4, 5]))
	console.log('skipWhile error 2');
//////////////////////////////////////////////////////
// reduce test
var reduceF = F.reduce(function(acc, item, index, list) {
	acc[item] = index;
	return acc;
}, {});
if (reduceF(aList).a == undefined)
	console.error('reduce error 1');
// do it again to test the cloning inside reduce()
if (reduceF(nList).a != undefined)
	console.error('reduce error 2');
//////////////////////////////////////////////////////
// map test
var mapF = F.map(function(item, index, list) {
	return 10 * item;
});
if (!utils.arraysEqual(mapF(nList), [10, 20, 30, 40, 50]))
	console.log('map error');
//////////////////////////////////////////////////////
// filter test
var filterFunc = function(item, index, list) {
	return item % 2 == 0;
};
var filterF = F.filter(filterFunc);
if (!utils.arraysEqual(filterF(nList), [2, 4]))
	console.log('filter error');
//////////////////////////////////////////////////////
// reject test
var rejectF = F.reject(filterFunc);
if (!utils.arraysEqual(rejectF(nList), [1, 3, 5]))
	console.log('reject error');
//////////////////////////////////////////////////////
// every test
var everyF = F.every(function(item, index, list) {
	return item < 10;
});
if (everyF(nList) !== true)
	console.log('every error');
//////////////////////////////////////////////////////
// some test
var someF = F.some(function(item, index, list) {
	return item > 4;
});
if (someF(nList) !== true)
	console.log('some error');
//////////////////////////////////////////////////////
// indexOf test
var indexOfF = F.indexOf(3);
if (indexOfF(nList) !== 2)
	console.log('indexOf error');
//////////////////////////////////////////////////////
// lastIndexOf test
var lastIndexOfF = F.lastIndexOf(3);
if (lastIndexOfF(nList.concat(nList)) !== 7)
	console.log('lastIndexOf error');
//////////////////////////////////////////////////////
// sort test
var sortF = F.sort(bool.ltToCompare(math.lt));
if (!utils.arraysEqual(sortF(rnList), nList))
	console.log('sort error 1');
if (!utils.arraysEqual(sortF(raList), aList))
	console.log('sort error 2');
//////////////////////////////////////////////////////
// cloneList test
if (!utils.arraysEqual(F.cloneList(raList), raList))
	console.log('cloneList error');
//////////////////////////////////////////////////////
// contains test
if (F.contains(1)(nList) !== true)
	console.log('contains error 1');
if (F.contains(99)(nList) !== false)
	console.log('contains error 2');
//////////////////////////////////////////////////////
// foldr test
var foldrF = F.foldr(function(acc, item, index, list) {
	acc.push(item);
	return acc;
}, []);
if (!utils.arraysEqual(foldrF(aList), ['d', 'c', 'b', 'a']))
	console.error('foldr error 1');
// do it again to test the cloning inside foldr()
if (!utils.arraysEqual(foldrF(aList), ['d', 'c', 'b', 'a']))
	console.error('foldr error 2');
//////////////////////////////////////////////////////
// min test
if(F.min(nnList) != -5)
	console.log('min error');
//////////////////////////////////////////////////////
// max test
if(F.max(nnList) != -1)
	console.log('max error');
//////////////////////////////////////////////////////
// concat test
var concatF = F.concat([10, 11, 12]);
if (!utils.arraysEqual(concatF([13, 14]), [10, 11, 12, 13, 14]))
	console.log('concat error');
//////////////////////////////////////////////////////
// uniq test
var uniqF = F.uniq(F._);
var dupList = [1, 2, 7, 3, 4, 10, 2, 3, 4, 5];
if (!utils.arraysEqual(uniqF(dupList), [1, 2, 7, 3, 4, 10, 5]))
	console.log('uniq error');
//////////////////////////////////////////////////////
// size test
if (F.size(nList) != 5)
	console.log('size error');
//////////////////////////////////////////////////////
// head test
if (F.head(nList) != 1)
	console.log('head error');
//////////////////////////////////////////////////////
// size test
if (!utils.arraysEqual(F.tail(nList), [2, 3, 4, 5]))
	console.log('tail error');
