// récuperer l'id à partir de l'url

var url = new URL(window.location.href);
var productId = url.searchParams.get("id");
console.log(productId);

// Récupération de l'API Méthode Fetch
fetch("http://localhost:3000/api/cameras/"+ productId)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {

  
  // Variale "template = ID sample  "
    var template = document.getElementById("sample").content

    
  // Variable "copyHTML = template"
    var copyHTML = document.importNode(template,true);
  
  // Variable "L'ensemble des caractère de data.price est transformer en string"
    var a = data.price.toString() 

  // querySelector "remplissage de la cible"

    copyHTML.querySelector(".name h3").textContent =  data.name;
    copyHTML.querySelector(".imageUrl img").src =  data.imageUrl ;    
    copyHTML.querySelector(".description span").textContent =  data.description ;
    copyHTML.querySelector(".id span").textContent =  data._id ;
    copyHTML.querySelector(".lenses span").textContent =  data.lenses ;

  // prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
    copyHTML.querySelector(".price span").textContent =   a.substring(0, a.length-2) + "." + a.substring(a.length-2, a.length) + ' €'

  // Injecter les modification dans le HTML
    document.getElementById("contentContainer").appendChild(copyHTML);

   
  // Variable objet contenant les valeurs d'un produit 

    var productObject = {
    name: data.name,
    image: data.imageUrl,
    description: data.description,
    id: data._id,
    lenses: data.lenses,
    price: data.price

  }

  //ecouteur d'evenement(click) sur le bouton 
    document.querySelector("#btn").addEventListener("click", function(){  

  // envoi des infos vers le localStorage de productObject au format "string"(json.stringify())======> localStorage n'accepte que le type "string"
    localStorage.setItem("oricaddy", JSON.stringify(productObject) )
})
})

// en cas d'erreur 
.catch(function(err) {
  
});





