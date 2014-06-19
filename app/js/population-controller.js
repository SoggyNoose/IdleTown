'use strict';

(function(){
	var app = angular.module("idleTown");

	app.controller('PopulationController', ['populationService', function(populationService) {
		this.houses = populationService.houses;

	}]);

})();