var F = require('../generator');
var utils = require('../utils');

//////////////////////////////////////////////////////
// range tests
var rangeF = F.range(2);
if (!utils.arraysEqual(rangeF(5), [2, 3, 4, 5]))
	console.log('range error');
if (!utils.arraysEqual(rangeF(0), [2, 1, 0]))
	console.log('range error');
var range2F = F.range(-3);
if (!utils.arraysEqual(range2F(1), [-3, -2, -1, 0, 1]))
	console.log('range error');
