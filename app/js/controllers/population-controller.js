'use strict';

(function(){
	var app = angular.module("idleTown");

	app.controller('PopulationController', ['populationService', 'resourceService', function(populationService, resourceService) {
		this.houses = populationService.houses;
		this.population = populationService.population;

		this.canAfford = function() {
			var house = this.houses[0];
			for (var resource in house.cost) {
				var index = resourceService.indexMap[resource];
				if (house.cost[resource] > resourceService.resources[index].count) {
					return false;
				}
			}
			return true;
		}

		this.buyHouse = function() {
			console.log("Purchasing a house");
			var house = this.houses[0];

			for (var resource in house.cost) {
				var resourceIndex = resourceService.indexMap[resource];
				resourceService.removeResource(resourceIndex, house.cost[resource]);
			}

			this.houses[0].count++;
		}

		this.getTotalCapacity = function(popName) {
			return populationService.getTotalCapacity(popName);
		}
	}]);

})();