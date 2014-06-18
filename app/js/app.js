'use strict';

(function(){

	var app = angular.module("clickTrade", ['ui.bootstrap']);

	app.controller('ResourceController', ['resourceService', function(resourceService) {
		this.resources = resourceService.resources;
	}]);

	app.controller('BuildingController', ['buildingService', 'resourceService', function(buildingService, resourceService) {
		this.buildings = buildingService.buildings;

		this.canAfford = function(building) {
			for (var resource in building.cost) {
				var index = resourceService.indexMap[resource];
				if (building.cost[resource] > resourceService.resources[index].count) {
					return false;
				}
			}
			return true;
		}

		this.buyBuilding = function(building) {
			console.log("Purchasing a " + building.name);
			var buildingIndex = buildingService.indexMap[building.name];

			for (var resource in building.cost) {
				var resourceIndex = resourceService.indexMap[resource];
				resourceService.removeResource(resourceIndex, building.cost[resource]);
			}

			this.buildings[buildingIndex].count++;
		}

		
	}]);

	app.controller('GameLoopController', ['$scope', '$timeout', 'resourceService', 'buildingService', function($scope, $timeout, resourceService, buildingService) {
		
		$scope.produceResources = function() {
			for (var index = 0; index < buildingService.buildings.length; index++) {
				var building = buildingService.buildings[index];
				if (building.count === 0) {
					continue;
				}

				if (++building.progress >= building.outputTime) {
					building.progress = 0;

					var resourceIndex = resourceService.indexMap[building.produces];

					console.log(building.name + " producing " + building.count + " of " + building.produces);

					resourceService.addResource(resourceIndex, building.count);
				}
				
			}
		}

		$scope.update = function() {
			$scope.produceResources();

			$timeout($scope.update, 1000);
		}

		$scope.update();
	}]);

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

		this.createIndexMap();

		this.addResource = function(idx, amt) {
			this.resources[idx].count += amt;
		}

		this.removeResource = function(idx, amt) {
			this.resources[idx].count -= amt;
		}
	});
	
	app.service('buildingService', function() {
		this.buildings = [
			{
				name: 'Fisherman\'s Hut',
				description: 'Produces fish',
				count: 0,
				cost: { 'Gold':100, 'Wood':3, 'Tools':2 },
				produces: 'Fish',
				outputTime: 30,
				progress: 0
			},
			{
				name: 'Lumberjack\'s Hut',
				description: 'Produces trees',
				count: 0,
				cost: { 'Gold':50, 'Tools':2 },
				produces: 'Wood',
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

			for (var index = 0; index < this.buildings.length; index++) {
				this.indexMap[this.buildings[index].name] = index;
			}
		}

		this.createIndexMap();
	});

})();