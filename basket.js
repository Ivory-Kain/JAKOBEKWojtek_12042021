// Variable afin de récuperer l'objet du localStorage au type "string"
var storageData = localStorage.getItem("oricaddy");
console.log(storageData);

// conversion du type "string" en objet
var obj = JSON.parse(storageData);
console.log(obj)

// Variale "template = ID sample  "
var template = document.getElementById("sample").content

// Variable "copyHTML = template"
    var copyHTML = document.importNode(template,true);

// Variable "L'ensemble des caractère de obj.price est transformer en string"    
    var a = obj.price.toString() 

// querySelector "remplissage de la cible"    
copyHTML.querySelector(".name h3").textContent = obj.name;
copyHTML.querySelector(".imageUrl img").src = obj.image;
copyHTML.querySelector(".description span").textContent = obj.description;
copyHTML.querySelector(".lenses span").textContent = obj.lenses;
copyHTML.querySelector(".id span").textContent = obj.id;



// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
copyHTML.querySelector(".price span").textContent =  a.substring(0, a.length-2) + "." + a.substring(a.length-2, a.length) + ' €';

// Injecter les modification dans le HTML
document.getElementById("contentContainer").appendChild(copyHTML);