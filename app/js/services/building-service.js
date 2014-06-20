(function(){
	var app = angular.module("idleTown");

	app.service('buildingService', function() {
		this.productionBuildings = [
			{
				name: 'Fisherman\'s Hut',
				description: 'Produces fish',
				count: 0,
				cost: { 'Gold':100, 'Wood':3, 'Tools':2 },
				maintenance: 15,
				produces: 'Fish',
				outputTime: 30,
				progress: 0
			},
			{
				name: 'Lumberjack\'s Hut',
				description: 'Produces trees',
				count: 0,
				cost: { 'Gold':50, 'Tools':2 },
				maintenance: 5,
				produces: 'Wood',
				outputTime: 40,
				progress: 0
			},
			{
				name: 'Cider Farm',
				description: 'Produces cider',
				count: 0,
				cost: { 'Gold':100, 'Wood':5, 'Tools':1 },
				maintenance: 15,
				produces: 'Cider',
				outputTime: 40,
				progress: 0
			}
		];

		this.indexMap = null;

		this.createIndexMap = function() {
			if (this.indexMap) {
				return;
			}

			this.indexMap = {};

			for (var index = 0; index < this.productionBuildings.length; index++) {
				this.indexMap[this.productionBuildings[index].name] = index;
			}
		}

		this.getBuilding = function(buildingName) {
			return this.productionBuildings[this.indexMap[buildingName]];
		}

		this.createIndexMap();
	});

})();