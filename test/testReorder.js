var F = require('../reorder');
var utils = require('../utils');
var list = require('../list');
var generator = require('../generator');
var compose = require('../compose');

var f = function(a, b, c, d, e, f) {
	return [a, b, c, d, e, f];
};

var order = [6, 5, 4, 3, 2, 1];
var rorder = list.reverse(order);
if (!utils.arraysEqual(F.reorder(f, order).apply(null, order), rorder))
	console.log('reorder error 1');
var forder = (compose.compose(list.concat, list.reverse, generator.range)(1, 3))([4, 5, 6]);
if (!utils.arraysEqual(F.reorder(f, forder).apply(null, rorder), [3, 2, 1, 4, 5, 6]))
	console.log('reorder error 2');
if (!utils.arraysEqual(F.flipAll(f).apply(null, order), rorder))
	console.log('flipAll error');
if (!utils.arraysEqual(F.flip(f).apply(null, rorder), [2, 1, 3, 4, 5, 6]))
	console.log('flip error');
if (!utils.arraysEqual(F.nextArg(2, f).apply(null, rorder), [2, 1, 3, 4, 5, 6]))
	console.log('nextArg error 1');
if (!utils.arraysEqual(F.nextArg(3, f).apply(null, rorder), [3, 1, 2, 4, 5, 6]))
	console.log('nextArg error 2');
if (!utils.arraysEqual(F.nextArg(99, f).apply(null, rorder), rorder))
	console.log('nextArg error 3');
