var curry = require('./curry');
var utils = require('./utils');
var id = require('./id');
var list = require('./list');
var bool = require('./bool');

var private = {
	allAny: function(listF) {
		return function() {
			var preds = [].slice.apply(arguments);
			return function() {
				var args = [].slice.apply(arguments);
				return listF(function(f) {
					return f.apply(null, args);
				}, preds);
			};
		};
	}
}
var boollist = {
	all$: private.allAny(list.every),
	any$: private.allAny(list.some)
};

utils.extend(boollist, {
	all: function() {
		var preds = [].slice.apply(arguments);
		return curry.curry(boollist.all$.apply(null, preds), list.max(preds.map(curry.getArity)));
	},
	any: function() {
		var preds = [].slice.apply(arguments);
		return curry.curry(boollist.any$.apply(null, preds), list.max(preds.map(curry.getArity)));
	}
});

module.exports = boollist;
