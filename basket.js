// Variable afin de récuperer l'objet du localStorage au type "string"
var storageData = localStorage.getItem("oricaddy");
console.log(storageData);

// conversion du type "string" en objet
var myNewObject = JSON.parse(storageData);
console.log(myNewObject)


 // Variale "template = ID sample  "
 var template = document.getElementById("sample").content


// Variable "L'ensemble des caractère de obj.price est transformer en string"    

for (let i = 0; i < myNewObject.length; i++) {
    
    var modifiedPrice = myNewObject[i].price.toString() 

   

    // Variable "copyHTML = template"
    var copyHTML = document.importNode(template,true);

    // querySelector "remplissage de la cible"    
copyHTML.querySelector(".name h5").textContent = myNewObject[i].name;
copyHTML.querySelector(".imageUrl img").src = myNewObject[i].image;
copyHTML.querySelector(".description span").textContent = myNewObject[i].description;
copyHTML.querySelector(".lenses span").textContent = myNewObject[i].lenses;
copyHTML.querySelector(".id span").textContent = myNewObject[i].id;



// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
copyHTML.querySelector(".price span").textContent =   modifiedPrice.substring(0, modifiedPrice.length-2) + "." + modifiedPrice.substring(modifiedPrice.length-2, modifiedPrice.length) + ' €'

// Injecter les modification dans le HTML
document.getElementById("contentContainer").appendChild(copyHTML);
}
   
    





 

