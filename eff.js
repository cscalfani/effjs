var utils = require('./utils');

var F = {};

[
	'args',
	'arity',
	'bool',
	'boollist',
	'compose',
	'curry',
	'funcs',
	'generator',
	'id',
	'list',
	'math',
	'mathAgg',
	'obj',
	'reorder'
].forEach(function(FModule) {
	var module = require('./' + FModule);
	Object.keys(module).forEach(function(f) {
		// make sure it doesn't already exist in F
		if (F[f])
			throw new Error(f + ' already exists in F');
		// add the module's function to F
		F[f] = module[f];
	});
});

// add utils
F.utils = require('./utils');

// add undefined
F._ = undefined;

module.exports = F;
