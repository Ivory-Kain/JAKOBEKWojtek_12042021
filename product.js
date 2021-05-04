var url = new URL(window.location.href);
var name = url.searchParams.get("id");
console.log(name);

fetch("http://localhost:3000/api/cameras/"+ name)
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {
    var template = document.getElementById("sample").content
    var copyHTML = document.importNode(template,true);
    var a = data.price.toString() 

    copyHTML.querySelector(".name h3").textContent =  data.name;
    copyHTML.querySelector(".imageUrl img").src =  data.imageUrl ;
    
    copyHTML.querySelector(".description span").textContent =  data.description ;
    copyHTML.querySelector(".id span").textContent =  data._id ;
    copyHTML.querySelector(".lenses span").textContent =  data.lenses ;

    copyHTML.querySelector(".price span").textContent =   a.substring(0, a.length-2) + "." + a.substring(a.length-2, a.length) + ' €'

    document.getElementById("contentContainer").appendChild(copyHTML);

    console.log(data.name);
})

