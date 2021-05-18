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
    var copyHTML = document.importNode(template, true);

    // querySelector "remplissage de la cible"    
    copyHTML.querySelector(".name h5").textContent = myNewObject[i].name;
    copyHTML.querySelector(".imageUrl img").src = myNewObject[i].image;
    copyHTML.querySelector(".description span").textContent = myNewObject[i].description;
    copyHTML.querySelector(".lenses span").textContent = myNewObject[i].lenses;
    copyHTML.querySelector(".id span").textContent = myNewObject[i].id;
    copyHTML.querySelector(".quantity span").textContent = myNewObject[i].quantity;



    // prix formater " prix en centimes moins 2 caractères, plus "." plus 2 caractères"
    copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

    // Injecter les modification dans le HTML
    document.getElementById("contentContainer").appendChild(copyHTML);
}

var quantity = document.querySelectorAll(".userChoice")
var validate = document.querySelectorAll(".userModifiedChoice")

console.log(quantity);


for (let i = 0; i < validate.length; i++) {



    validate[i].addEventListener("click", function () {
        if (quantity[i].value > 0) {
            document.querySelectorAll(".quantity span")[i].textContent = quantity[i].value


        }

    })

    function subtotalCalc(a) {

        var articlePrice = myNewObject[i].price

        var subtotal = articlePrice * a
        var modifiedSubtotal = subtotal.toString()


        document.querySelectorAll(".subtotal p")[i].textContent = modifiedSubtotal.substring(0, modifiedSubtotal.length - 2) + "." + modifiedSubtotal.substring(modifiedSubtotal.length - 2, modifiedSubtotal.length) + ' €'
        console.log(modifiedSubtotal);

    }

    document.querySelectorAll(".userModifiedChoice")[i].addEventListener("click", function () {

        subtotalCalc(quantity[i].value)

        const found = myNewObject.find(element => element.name == myNewObject[i].name)

        found.quantity = quantity[i].value

        console.log(quantity[i].value);

    })
    subtotalCalc(myNewObject[i].quantity)

    
    

}










// localStorage.setItem("oricaddy", JSON.stringify(myNewObject))






// Update cart item by its quantity

	// update(id, quantity){
	// 	var cartObj = JSON.parse(localStorage.getItem('cart'));

	// 	var oldItem = this.find(id, cartObj)
	// 	var itemIndex = cartObj.findIndex(x => x.id === id);
	// 	var updatedItem = Object.assign({}, oldItem, {quantity: quantity})
	// 	cartObj[itemIndex] = updatedItem;

	// 	//Save back to storage
	// 	localStorage.setItem('cart', JSON.stringify(cartObj))
	// }







