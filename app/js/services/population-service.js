(function() {
	var app = angular.module("idleTown");

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
				taxRate: 1,
				consumptionRate: {'Fish':1, 'Cider':0.44}
			},
			{
				name: "Citizen",
				count: 0,
				taxRate: 5,
				consumptionRate: {}
			},
			{
				name: "Patrician",
				count: 0,
				taxRate: 20,
				consumptionRate: {}
			},
			{
				name: "Nobleman",
				count: 0,
				taxRate: 50,
				consumptionRate: {}
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