var F = require('../reorder');
var utils = require('../utils');

var f = function(a, b, c, d, e, f) {
	return [a, b, c, d, e, f];
};

var order = [6, 5, 4, 3, 2, 1];
if (!utils.arraysEqual(F.reorder(f, order).apply(null, order), order.reverse()))
	console.log('reorder error');
if (!utils.arraysEqual(F.flip(f).apply(null, order), [2, 1, 3, 4, 5, 6]))
	console.log('flip error');
if (!utils.arraysEqual(F.flipAll(f).apply(null, order), order.reverse()))
	console.log('flipAll error');
