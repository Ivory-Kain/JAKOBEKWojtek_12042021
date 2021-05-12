// récuperer l'id à partir de l'url

var url = new URL(window.location.href);
var productId = url.searchParams.get("id");
console.log(productId);

// Récupération de l'API Méthode Fetch
fetch("http://localhost:3000/api/cameras/" + productId)
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    console.log(data);

    // Variale "template = ID sample  "
    var template = document.getElementById("sample").content


    // Variable "copyHTML = template"
    var copyHTML = document.importNode(template, true);


    // Variable "L'ensemble des caractère de data.price est transformer en string"
    var modifiedPrice = data.price.toString()

    // querySelector "remplissage de la cible"

    copyHTML.querySelector(".name h5").textContent = data.name;
    copyHTML.querySelector(".imageUrl img").src = data.imageUrl;
    copyHTML.querySelector(".description span").textContent = data.description;
    copyHTML.querySelector(".id span").textContent = data._id;
    copyHTML.querySelector(".lenses span").textContent = data.lenses;







    // prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
    copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

    // Injecter les modification dans le HTML
    document.getElementById("contentContainer").appendChild(copyHTML);

    // remplissage des choix de lentilles
    
    var tempLenses = document.getElementById("lenses").content

    for (let i = 0; i < data.lenses.length; i++) {
      var copyLenses = document.importNode(tempLenses, true);
      copyLenses.querySelector("option").textContent = data.lenses[i];
      copyLenses.querySelector("option").value = data.lenses[i];
      document.querySelector("#optionProduct").appendChild(copyLenses);
    }

    var select = document.querySelector("select")

    console.log(select);

    // up add 12/05
    var quantity = document.querySelector("input") 

    console.log(quantity);
    // down add 12/05

   

    select.addEventListener("change", function () {

      if (select.selectedIndex > 0) {


        document.querySelector("#btn").removeAttribute("disabled");

      }
      // // up add 12/05
      // if (quantity.selectedIndex > 0){
      //   document.querySelector("#btn").removeAttribute("disabled")
      // }
      // down add 12/05



    })

    

    // Variable objet contenant les valeurs d'un produit 

    var productObject = {
      name: data.name,
      image: data.imageUrl,
      description: data.description,
      id: data._id,
      lenses: data.lenses,
      price: data.price,
      // up add 12/05
      // quantity:""
       // down add 12/05

    }

    //ecouteur d'evenement(click) sur le bouton 
    document.querySelector("#btn").addEventListener("click", function () {

      productObject.lenses = select.value
      // up add 12/05
      // productObject.quantity = input.value
       // down add 12/05

      var pickArray = []

      // verifie s'il y a un element ("oricaddy") dans localStorage
      if (localStorage.getItem("oricaddy") !== null) {

        // Remplace le tableau [pickArray] par l'element ("oricaddy") modifié en tableau via JSON.parse
        pickArray = JSON.parse(localStorage.getItem("oricaddy"));

        // Ajouter productObject dans le tableau [pickArray]
        pickArray.push(productObject)
        console.log(pickArray.lenses);
      } else {
        // si la condition de if n'est pas remplis alors on ajoute un produit au tableau vide [pickArray] 
        pickArray.push(productObject)
      }

      // envoi des infos vers le localStorage de productObject au format "string"(json.stringify())======> localStorage n'accepte que le type "string"
      localStorage.setItem("oricaddy", JSON.stringify(pickArray))

      document.location.reload()
    })
  })

  // en cas d'erreur 
  .catch(function (err) {

  });