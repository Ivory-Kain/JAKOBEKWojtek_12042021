// Récupération de l'API Méthode Fetch
fetch("http://localhost:3000/api/cameras").then(function(res) {
		if(res.ok) {
			return res.json();
		}
	}).then(function(data) {
		// Variable "template = ID sample  "
		var template = document.getElementById("sample").content
			// Boucle For
		for(let i = 0; i < data.length; i++) {
			// Variable "copyHTML = template"
			var copyHTML = document.importNode(template, true);
			// Variable "L'ensemble des caractère de data[i].price est transformer en string"
			var modifiedPrice = data[i].price.toString()
				// querySelector "remplissage de la cible par le résultat donné data[i]"
			copyHTML.querySelector(".name h2").textContent = data[i].name;
			copyHTML.querySelector(".imageUrl img").src = data[i].imageUrl;
			copyHTML.querySelector(".product").setAttribute("href", "product.html?id=" + data[i]._id);
			// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
			copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'
				// Injecter les modification dans le HTML
			document.getElementById("contentContainer").appendChild(copyHTML);
		}
		console.log("data", data);
	})
	// en cas d'erreur 
	.catch(function(err) {});
if(localStorage.getItem('oricaddy') !== null) {
	document.querySelector("span.badge").textContent = JSON.parse(localStorage.getItem('oricaddy')).length
	console.log("oricaddy", localStorage.getItem('oricaddy'));
} else {
	document.querySelector(".badge").style.display = "none"
}