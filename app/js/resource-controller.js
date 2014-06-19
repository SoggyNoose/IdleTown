'use strict';

(function() {
	var app = angular.module('idleTown');

	app.controller('ResourceController', ['resourceService', function(resourceService) {
		this.resources = resourceService.resources;
	}]);
})();