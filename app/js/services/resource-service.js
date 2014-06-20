(function(){
	var app = angular.module("idleTown");

	app.service('resourceService', function() {
		this.resources = [
			{
				name: 'Gold',
				count: 10000
			},
			{
				name: 'Fish',
				count: 15
			},
			{
				name: 'Wood',
				count: 0
			},
			{
				name: 'Tools',
				count: 12
			},
			{
				name: 'Cider',
				count: 0
			}
		];

		this.indexMap = null;

		this.createIndexMap = function() {
			if (this.indexMap) {
				return;
			}

			this.indexMap = {};

			for (var index = 0; index < this.resources.length; index++) {
				this.indexMap[this.resources[index].name] = index;
			}
		}

		this.getResource = function(resourceName) {
			return this.resources[this.indexMap[resourceName]];
		}

		this.createIndexMap();

		this.addResource = function(idx, amt) {
			this.resources[idx].count += amt;
		}

		this.removeResource = function(idx, amt) {
			this.resources[idx].count -= amt;

			if (this.resources[idx].count < 0) {
				this.resources[idx].count = 0;
			}
		}
	});

})();