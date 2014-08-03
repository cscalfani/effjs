var F = require('../math');
var utils = require('../utils');

//////////////////////////////////////////////////////
// arithmetic tests
if (F.add(1)(2) != 3)
	console.log('add error');
if (F.sub(1)(2) != -1)
	console.log('sub error');
if (F.takeAway(1)(2) != 1)
	console.log('takeAway error');
if (F.mult(5)(2) != 10)
	console.log('mult error');
if (F.div(5)(2) != 2.5)
	console.log('div error');
if (F.divBy(2)(5) != 2.5)
	console.log('divBy error');
if (F.mod(5)(2) != 1)
	console.log('mod error');
if (F.modBy(2)(5) != 1)
	console.log('modBy error');
if (F.inc(5) != 6)
	console.log('inc error');
if (F.dec(6) != 5)
	console.log('dec error');
if (F.even(5) !== false)
	console.log('even error');
if (F.odd(6) !== false)
	console.log('odd error');
//////////////////////////////////////////////////////
// comparison tests
if (!F.lt(2)(5))
	console.log('lt error');
if (!F.lte(2)(3))
	console.log('lte error');
if (!F.lte(3)(3))
	console.log('lte error');
if (!F.gt(5)(2))
	console.log('gt error');
if (!F.gte(3)(2))
	console.log('gte error');
if (!F.gte(3)(3))
	console.log('gte error');
if (!F.eq(3)(3))
	console.log('eq error');
if (F.eq(3)(9))
	console.log('eq error');
if (!F.neq(3)(9))
	console.log('neq error');
if (F.neq(9)(9))
	console.log('neq error');
if (F.eqStrict('9')(9))
	console.log('eqStrict error');
if (!F.neqStrict('9')(9))
	console.log('neqStrict error');
