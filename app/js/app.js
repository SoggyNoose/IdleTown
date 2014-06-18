'use strict';

(function(){

	var app = angular.module("clickTrade", ['ui.bootstrap']);

	app.controller('ResourceController', ['resourceService', function(resourceService) {
		this.resources = resourceService.resources;
	}]);

	app.controller('BuildingController', ['buildingService', 'resourceService', function(buildingService, resourceService) {
		this.productionBuildings = buildingService.productionBuildings;

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

			this.productionBuildings[buildingIndex].count++;
		}

		this.costAsString = function(building) {
			var result = "";
			for (var type in building.cost) {
				result += building.cost[type] + " " + type + ", ";
			}
			result = result.slice(0, -2);

			return result;
		};

		
	}]);

	app.controller('GameLoopController', ['$scope', '$timeout', 'resourceService', 'buildingService', function($scope, $timeout, resourceService, buildingService) {
		
		$scope.produceResources = function() {
			for (var index = 0; index < buildingService.productionBuildings.length; index++) {
				var building = buildingService.productionBuildings[index];
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

		$scope.buildingMaintenance = function() {
			for (var index = 0; index < buildingService.productionBuildings.length; index++) {
				var building = buildingService.productionBuildings[index];
				if (building.count === 0) {
					continue;
				}

				var costThisTick = (building.maintenance * building.count) / 60;

				resourceService.removeResource(0, costThisTick);
			}
		}

		$scope.update = function() {
			$scope.produceResources();
			$scope.buildingMaintenance();

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

		this.createIndexMap();
	});

	app.service('populationService', function() {
		this.houses = [
			{
				name: "Peasant Home",
				count: 0,
				cost: { 'Wood':2 },
				capacity: 8
			},
			{
				name: "Citizen Home",
				count: 0,
				cost: { 'Wood':1, 'Tools':1 },
				capacity: 15
			},
			{
				name: "Patrician Home",
				count: 0,
				cost: { 'Stone':4, 'Wood':1, 'Tools':1 },
				capacity: 25
			},
			{
				name: "Nobleman Home",
				count: 0,
				cost: { 'Glass':3, 'Stone':3, 'Wood':1, 'Tools':1 },
				capacity: 40
			}
		];

		this.population = [
			{
				name: "Peasant",
				count: 0,
				taxRate: 1
			},
			{
				name: "Citizen",
				count: 0,
				taxRate: 5
			},
			{
				name: "Patrician",
				count: 0,
				taxRate: 20
			},
			{
				name: "Nobleman",
				count: 0,
				taxRate: 50
			}
		];
	})

})();