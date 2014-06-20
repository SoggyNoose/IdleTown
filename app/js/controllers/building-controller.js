'use strict';

(function() {
	var app = angular.module('idleTown');

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

		this.destroyBuilding = function(building) {
			console.log("Destroying a " + building.name);
			var buildingIndex = buildingService.indexMap[building.name];

			this.productionBuildings[buildingIndex].count--;

			if (this.productionBuildings[buildingIndex].count === 0) {
				this.productionBuildings[buildingIndex].progress = 0;
			}
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
})();