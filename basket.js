// Variable afin de récuperer l'objet du localStorage au type "string"
var storageData = localStorage.getItem("oricaddy");
console.log(storageData);

// conversion du type "string" en objet
var obj = JSON.parse(storageData);
console.log(obj)


 // Variale "template = ID sample  "
 var template = document.getElementById("sample").content


// Variable "L'ensemble des caractère de obj.price est transformer en string"    

for (let i = 0; i < obj.length; i++) {
    
    var a = obj[i].price.toString() 

   

    // Variable "copyHTML = template"
    var copyHTML = document.importNode(template,true);

    // querySelector "remplissage de la cible"    
copyHTML.querySelector(".name h3").textContent = obj[i].name;
copyHTML.querySelector(".imageUrl img").src = obj[i].image;
copyHTML.querySelector(".description span").textContent = obj[i].description;
copyHTML.querySelector(".lenses span").textContent = obj[i].lenses;
copyHTML.querySelector(".id span").textContent = obj[i].id;



// prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
copyHTML.querySelector(".price span").textContent =  a.substring(0, a.length-2) + "." + a.substring(a.length-2, a.length) + ' €';

// Injecter les modification dans le HTML
document.getElementById("contentContainer").appendChild(copyHTML);
}
   
    





 

