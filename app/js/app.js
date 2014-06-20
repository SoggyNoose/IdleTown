'use strict';

(function(){

	var app = angular.module("idleTown", ['ui.bootstrap']);

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

		this.getResource = function(resourceName) {
			return this.resources[this.indexMap[resourceName]];
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

		this.getBuilding = function(buildingName) {
			return this.productionBuildings[this.indexMap[buildingName]];
		}

		this.createIndexMap();
	});

	app.service('populationService', function() {
		this.houses = [
			{
				name: "Peasant Home",
				count: 1,
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
				count: 1,
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

		this.baseRepopulationRate = .05;

		this.indexMap = null;

		this.createIndexMap = function() {
			if (this.indexMap) {
				return;
			}

			this.indexMap = {};

			for (var index = 0; index < this.population.length; index++) {
				this.indexMap[this.population[index].name] = index;
			}
		}

		this.createIndexMap();

		this.getHouse = function(peopleName) {
			return this.houses[this.indexMap[peopleName]];
		}

		this.getPeople = function(peopleName) {
			return this.population[this.indexMap[peopleName]];
		}

		this.getTotalCapacity = function(populationType) {
			var house = this.getHouse(populationType);
			return house.capacity * house.count;
		}

		this.adjustPopulation = function() {
			for (var index=0; index<this.population.length; index++) {
				var people = this.population[index];
				if (people.count >= this.getTotalCapacity(people.name)) {
					continue;
				}

				var roll = Math.random();
				if (roll < this.baseRepopulationRate) {
					console.log("A " + people.name + " has moved in");
					people.count++;
				} else {
					// console.debug("Attempted to move in " + people.name + " got: " + roll)
				}
			}
		}
	})

})();