var F = require('../funcs');
var utils = require('../utils');
var math = require('../math');

var funcGroup = F.callFuncs(math.mult, math.add);
if (!utils.arraysEqual(funcGroup(10)(10), [100, 20]))
	console.log('callFuncs error 1');

var funcGroup2 = F.apply(F.callFuncs)([math.mult, math.add]);
if (!utils.arraysEqual(funcGroup2(10)(10), [100, 20]))
	console.log('callFuncs error 2');

if (F.apply(math.add)(funcGroup(10)(10)) != 120)
	console.log('apply error');

if (F.call(math.add)(1, 2) != 3)
	console.log('call error');
