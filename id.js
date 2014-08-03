var id = {
	id: function(value) {
		return value;
	},
	constant: function(value) {
		return function() {
			return value;
		};
	}
};

module.exports = id;
