var F = require('../obj');
var curry = require('../curry');
var utils = require('../utils');
var bool = require('../bool');

var o = {
	a: 'a',
	b: 'b',
	c: 'c',
	x: 1,
	y: 2,
	z: 3
};

var o2 = {
	xx: 10,
	yy: 20,
	zz: 30
};

//////////////////////////////////////////////////////
// propEq test
if (F.propEq('a')('a')(o) !== true)
	console.error('propEq error');
//////////////////////////////////////////////////////
// prop test
if (F.prop('a')(o) !== 'a')
	console.error('prop error');
//////////////////////////////////////////////////////
// forObj test
var k = [];
var v = [];
var forF = F.forObj(function(value, key, obj) {
	if (o !== obj)
		throw new Error('bug');
	k.push(key);
	v.push(value);
});
forF(o);
if (v.length != 6 || k.length != 6)
	console.error('forF error');
//////////////////////////////////////////////////////
// mapObj test
var mapF = F.mapObj(function(value, key, obj) {
	if (o !== obj)
		throw new Error('bug');
	return utils.isString(value) ? value.toUpperCase() : value;
});
if (F.propEq('a')('A')(mapF(o)) !== true)
	console.error('mapObj error');
//////////////////////////////////////////////////////
// reduceObj test
var reduceF = F.reduceObj(function(acc, value, key, obj) {
	if (o !== obj && o2 !== obj)
		throw new Error('bug');
	if (utils.isNumber(value))
		acc[key] = value;
	return acc;
}, {});
if (F.prop('x')(reduceF(o)) == undefined)
	console.error('reduceObj error 1');
// do it again to test the cloning inside reduceObj()
if (F.prop('x')(reduceF(o2)) != undefined)
	console.error('reduceObj error 2');
//////////////////////////////////////////////////////
// filterObj test
var filter = function(value, key, obj) {
	if (o !== obj)
		throw new Error('bug');
	return (utils.isNumber(value) && value >= 2) || (utils.isString(value) && value >= 'b');
};
var testFilter = function(type) {
	if (F.prop('a')(filterF(o)) != undefined)
		console.error(type + ' error 1');
	if (F.prop('b')(filterF(o)) == undefined)
		console.error(type + ' error 2');
	if (F.prop('c')(filterF(o)) == undefined)
		console.error(type + ' error 3');
	if (F.prop('x')(filterF(o)) != undefined)
		console.error(type + ' error 4');
	if (F.prop('y')(filterF(o)) == undefined)
		console.error(type + ' error 5');
	if (F.prop('z')(filterF(o)) == undefined)
		console.error(type + ' error 6');
};
var filterF = F.filterObj(filter);
testFilter('filterObj');
//////////////////////////////////////////////////////
// rejectObj test
var rejectF = F.rejectObj(bool.not(filter));
testFilter('rejectObj');
//////////////////////////////////////////////////////
// everyObj test
var everyF = F.everyObj(function(value, key, obj) {
	if (o !== obj && o2 !== obj)
		throw new Error('bug');
	return (utils.isNumber(value) && value <= 3) || (utils.isString(value) && value <= 'c');
});
if (everyF(o) !== true)
	console.log('everyF error 1');
if (everyF(o2) !== false)
	console.log('everyF error 2');
//////////////////////////////////////////////////////
// someObj test
var someF = F.everyObj(function(value, key, obj) {
	if (o !== obj && o2 !== obj)
		throw new Error('bug');
	return (utils.isNumber(value) && value > 3) || (utils.isString(value) && value > 'c');
});
if (someF(o) !== false)
	console.log('someF error 1');
if (someF(o2) !== true)
	console.log('someF error 2');
//////////////////////////////////////////////////////
// keys test
if (!utils.arraysEqual(F.keys(o), ['a', 'b', 'c', 'x', 'y', 'z']))
	console.log('keys error');
//////////////////////////////////////////////////////
// values test
if (!utils.arraysEqual(F.values(o), ['a', 'b', 'c', 1, 2, 3]))
	console.log('keys error');
