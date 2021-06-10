// récupération des information du localStorage au format tableau
var storageData = JSON.parse(localStorage.getItem("oricaddy"));


// Variable "template = ID sample  "
var template = document.getElementById("sample").content

var priceTotal = []

// si il y a du contenu dans storageData
if (storageData !== null && storageData.length) {

	for (let i = 0; i < storageData.length; i++) {

		// Variable "copyHTML = template"
		var copyHTML = document.importNode(template, true);

		// querySelector "remplissage de la cible par le résultat donné storageData[i]"
		copyHTML.querySelector(".name h2").textContent = storageData[i].name;
		copyHTML.querySelector(".imageUrl img").src = storageData[i].image;
		copyHTML.querySelector(".description span").textContent = storageData[i].description;
		copyHTML.querySelector(".id span").textContent = storageData[i].id;
		copyHTML.querySelector(".lenses span").textContent = storageData[i].lenses;

		// Variable "L'ensemble des caractère de storageData[i].price est transformer en string"
		var modifiedPrice = storageData[i].price.toString()

		// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
		copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

		// Injecter les modification dans le HTML
		document.getElementById("contentContainer").appendChild(copyHTML);

		// remplissage du tableau priceTotal[] avec chaque prix des articles séléctionnés contenu dans la tableau storageData[i]
		priceTotal.push(storageData[i].price)
		console.log(priceTotal);

		// Somme des prix des articles dans priceTotal[]
		var reducer = function (accumulator, currentValue) {
			return accumulator + currentValue
		}
		var reduc = priceTotal.reduce(reducer).toString()
		console.log(reduc);

		// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
		document.querySelector('.total span').textContent = reduc.substring(0, reduc.length - 2) + "." + reduc.substring(reduc.length - 2, reduc.length) + ' €'

		// Bouton "supprimer l'article" et rechargement de la page 
		var buttonDeletItem = document.querySelectorAll(".remove")
		buttonDeletItem[i].addEventListener("click", function () {
			storageData.splice(i, 1);
			localStorage.setItem("oricaddy", JSON.stringify(storageData));
			document.location.reload();
		})
		console.log("logAfterDeletOneItem", storageData);

		// bouton "vider votre panier" et rechargement de la page
		var buttonDeletAllItem = document.querySelector(".removeAll")
		buttonDeletAllItem.addEventListener("click", function () {
			localStorage.removeItem("oricaddy")
			document.location.reload();
		})
		console.log("logAfterDeletAllItems", storageData);
	}
}

// si il n'y a pas de contenu dans storageData[i], non affichage du bouton "vider votre panier" et du formulaire + affichage "Votre panier est vide pour le moment."
else {
	document.querySelector(".formContainer").style.display = "none"
	document.querySelector(".recap").innerHTML = "Votre panier est vide pour le moment."
	localStorage.removeItem("oricaddy")
}

// Validation et envoi du formulaire 
document.querySelector('form').addEventListener("submit", function (e) {
	e.preventDefault()
	var products = [];
	for (let i = 0; i < storageData.length; i++) {
		products.push(storageData[i].id);
		var userData = {
			"contact": {
				"firstName": document.querySelector("#firstName").value,
				"lastName": document.querySelector("#lastName").value,
				"address": document.querySelector("#address").value,
				"city": document.querySelector("#city").value,
				"email": document.querySelector("#email").value,
				"zip": document.querySelector("#zip").value,
				"total": reduc
			},
			"products": products,
		};

	}


	// Envoi de la commande au serveur 
	fetch('http://localhost:3000/api/cameras/order', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(userData)
		})
		// Récupération de la réponse de l'API
		.then(function (response) {
			return response.json();
		})
		// Stockage de la réponse dans le localStorage
		.then(function (json) {
			localStorage.setItem("orderId", JSON.stringify(json))
			document.location.href = "validation.html"
			localStorage.removeItem("oricaddy")
		}).catch(function (err) {
			console.log(err);
		});
});