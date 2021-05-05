// Récupération de l'API Méthode Fetch
fetch("http://localhost:3000/api/cameras")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {
  

  // Variale "template = ID sample  "
  var template = document.getElementById("sample").content
  
  // Boucle For
  for (let i = 0; i < data.length; i++){
 

    // Variable "copyHTML = template"
    var copyHTML = document.importNode(template,true);

    // Variable "L'ensemble des caractère de data[i].price est transformer en string"
    var a = data[i].price.toString()  

    
    // querySelector "remplissage de la cible par le résultat donné data[i]"
    copyHTML.querySelector(".name h3").textContent =  data[i].name;
    copyHTML.querySelector(".imageUrl img").src =  data[i].imageUrl ;
    copyHTML.querySelector(".product").setAttribute("href","product.html?id="+ data[i]._id );
    
    

    // prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
    copyHTML.querySelector(".price span").textContent =   a.substring(0, a.length-2) + "." + a.substring(a.length-2, a.length) + ' €'
    
    
    // Injecter les modification dans le HTML
    document.getElementById("contentContainer").appendChild(copyHTML);

   
  
    
  }
 
})

// en cas d'erreur 
.catch(function(err) {
  
});



















