'use strict';

(function() {
	var app = angular.module('idleTown');

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
			var totalMaintenance = 0;
			for (var index = 0; index < buildingService.productionBuildings.length; index++) {
				var building = buildingService.productionBuildings[index];
				totalMaintenance += building.maintenance * building.count;
			}

			var costThisTick = (totalMaintenance) / 60;

			resourceService.removeResource(0, costThisTick);
		}

		$scope.update = function() {
			$scope.produceResources();
			$scope.buildingMaintenance();

			$timeout($scope.update, 1000);
		}

		$scope.update();
	}]);
})()