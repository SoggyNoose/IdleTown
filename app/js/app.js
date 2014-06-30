'use strict';

(function(){

	var app = angular.module("idleTown", ['ui.bootstrap']);
	
	app.controller("TabController", function() {
		this.tab = 1;

		this.setTab = function(index) {
			this.tab = index;
		}

		this.isSet = function(index) {
			return this.tab === index;
		}
	});

	app.directive("overview", function() {
		return {
			restrict: "E",
			templateUrl: "templates/overview.html"
		};
	});

	app.directive("islandView", function() {
		return {
			restrict: "E",
			templateUrl: "templates/island.html"
		};
	});
})();