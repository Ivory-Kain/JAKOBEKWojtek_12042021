// Récupération de l'id d'un produit 
var url = new URL(window.location.href)
console.log("url", url);
var id = url.searchParams.get("id")
console.log("id : ", id);

// Récupération de l'API Méthode Fetch pour un produit demandé
fetch("http://localhost:3000/api/cameras/" + id).then(function (res) {
		if (res.ok) {
			return res.json();
		}
	}).then(function (data) {

		// Variable "template = ID sample  "
		var template = document.getElementById("sample").content

		// Variable "copyHTML = template"
		var copyHTML = document.importNode(template, true);

		// Variable "L'ensemble des caractère de data.price est transformer en string"
		var modifiedPrice = data.price.toString()

		// querySelector "remplissage de la cible par le résultat donné data"
		copyHTML.querySelector(".name h2").textContent = data.name;
		copyHTML.querySelector(".imageUrl img").src = data.imageUrl;
		copyHTML.querySelector(".description span").textContent = data.description;
		copyHTML.querySelector(".id span").textContent = data._id;
		copyHTML.querySelector(".lenses span").textContent = data.lenses;

		// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
		copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

		// Injecter les modification dans le HTML
		document.getElementById("contentContainer").appendChild(copyHTML);

		// Gestion des options proposé pour les articles
		var tempLenses = document.getElementById("lenses").content
		console.log("lenses", tempLenses);
		for (let i = 0; i < data.lenses.length; i++) {
			var copyLenses = document.importNode(tempLenses, true);
			copyLenses.querySelector("option").textContent = data.lenses[i];
			copyLenses.querySelector("option").value = data.lenses[i];
			document.querySelector("#optionProduct").appendChild(copyLenses);
		}

		// Activation du bouton ajouter au panier si une option est selectionnée
		var select = document.querySelector("select")
		select.addEventListener("change", function () {
			if (select.selectedIndex > 0) document.querySelector("#btn").removeAttribute("disabled");
		})

		// Stockage de l'objet issu de data
		var itemDetails = {
			name: data.name,
			image: data.imageUrl,
			description: data.description,
			id: data._id,
			lenses: data.lenses,
			price: data.price
		}

		var button = document.querySelector("#btn")
		var pickArray = []

		// Au click sur "ajouter au panier" récupération des données du itemDetails et envoi des ces données vers le localStorage et rechargement de la page 
		button.addEventListener("click", function () {
			itemDetails.lenses = select.value
			if (localStorage.getItem('oricaddy') !== null) {
				pickArray = JSON.parse(localStorage.getItem('oricaddy'));

				var elementName = function (element) {
					element.name === data.name
				}
				var thisId = pickArray.findIndex(elementName);

				var elementLenses = function (element) {
					element.lenses === data.lenses
				}
				var thisLenses = pickArray.findIndex(elementLenses);

				if (thisId < 0 || thisLenses < 0) {
					pickArray.push(itemDetails)
				}
			} else {
				pickArray.push(itemDetails)
			}
			localStorage.setItem("oricaddy", JSON.stringify(pickArray));
			document.location.reload();
		})
		console.log("dataId", data);
	})
	// en cas d'erreur 
	.catch(function (err) {});

// Remplissage et affichage du compteur de produit sur le bouton panier
if (localStorage.getItem('oricaddy') !== null) {
	document.querySelector("span.badge").textContent = JSON.parse(localStorage.getItem('oricaddy')).length
	console.log("oricaddy", localStorage.getItem('oricaddy'));
} else {
	document.querySelector(".badge").style.display = "none"
}