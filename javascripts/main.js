// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all! 
	// - NO MORE "VAR"! ---> "let" or "const"
	// 

$(document).ready(function() {

	const outputContainer = $("#output");

	const writeToDOM = function (humanArray) {
	  let domString = "";
	  for (let i = 0; i < humanArray.length; i++) {
	    domString += `<div class="human row">`;
	    domString += `<div class="col-sm-4">`;
	    domString += `<img src="${humanArray[i].image}">`;
	    domString += `<p>${humanArray[i].name}</p>`;
	    domString += `</div>`;
	    domString += `<div class="col-sm-8 overflow-row">`;
		    for (let j = 0; j < humanArray[i].matches.length; j++) {
		      domString += `<div class="animal">`;
		      domString += `<img src="${humanArray[i].matches[j].image}">`;
		      domString += `<p>${humanArray[i].matches[j].name}</p>`;
		      domString += `<p>${humanArray[i].matches[j].description}</p>`;
		      domString += `</div>`;
		    }
	    domString += `</div>`;
	    domString += `</div>`;
	  }
	  outputContainer.append(domString);
	};

	// const loadHumans = function () {
	// 	return new Promise(function(resolve, reject) {
	// 		$.ajax("./database/humans.json")
	// 		.done(function(data1) {
	// 			resolve(data1.humans);
	// 		})
	// 		.fail(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// };

	// const loadCats = function () {
	// 	return new Promise(function(resolve, reject) {
	// 		$.ajax("./database/cats.json")
	// 		.done(function(data2) {
	// 			resolve(data2.cats);
	// 		})
	// 		.fail(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// };

	// const loadDinos = function () {
	// 	return new Promise(function(resolve, reject) {
	// 		$.ajax("./database/dinos.json")
	// 		.done(function(data3) {
	// 			resolve(data3.dinos);
	// 		})
	// 		.fail(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// };

	// const loadDogs = function () {
	// 	return new Promise(function(resolve, reject) {
	// 		$.ajax("./database/dogs.json")
	// 		.done(function(data4) {
	// 			resolve(data4.dogs);
	// 		})
	// 		.fail(function(error) {
	// 			reject(error);
	// 		});
	// 	});
	// };

	const loadHumans = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./database/humans.json")
			.done((data) => resolve(data.humans))
			.fail((error) => reject(error));
		});
	};

	const loadCats = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./database/cats.json")
			.done((data2) => resolve(data2.cats))
			.fail((error) => reject(error));
		});
	};

	const loadDinos = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./database/dinos.json")
			.done((data3) => resolve(data3.dinos))
			.fail((error) => reject(error));
		});
	};

	const loadDogs = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./database/dogs.json")
			.done((data4) => resolve(data4.dogs))
			.fail((error) => reject(error));
		});
	};


	const myHumans = [];
	const myAnimals = [];

	const checkForTypeMatch = function(human, pet) {
		const interestedInArray = human["interested-in"];
		const isMatchNumber = interestedInArray.indexOf(pet.type);

		if (isMatchNumber === -1) {
			return false;
		} else {
			return true;
		}
	};

	const checkForKidFriendly = function(human, pet) {
		const hasKids = human["has-kids"];
		const isKidFriendly = pet["kid-friendly"];
		let isMatched = true;

		if (hasKids && !isKidFriendly) {
			isMatched = false;
		}
		return isMatched;
	};


	loadHumans().then(function(humans) {
		humans.forEach(function(human) {
			human.matches = [];
			myHumans.push(human);
		});

		Promise.all([loadCats(), loadDinos(), loadDogs()])
		.then(function(result){
			result.forEach(function(xhrCall) {
				xhrCall.forEach(function(animal) {
					myAnimals.push(animal);
				});
			});
			
			for (let i=0; i < myHumans.length; i++) {
				for (let j=0; j < myAnimals.length; j++) {
					if (checkForTypeMatch(myHumans[i], myAnimals[j]) && checkForKidFriendly(myHumans[i], myAnimals[j])) {
						myHumans[i].matches.push(myAnimals[j]);
					}
				}
			}
			writeToDOM(myHumans);
		})
		.catch(function(animalError){
			console.log(animalError);
		});

	})
	.catch(function(humanError) {
		console.log(humanError);
	});
















});