var storageData = JSON.parse(localStorage.getItem("oricaddy"));

var template = document.getElementById("sample").content

var priceTotal = []

if (storageData !== null && storageData.length) {

    for (let i = 0; i < storageData.length; i++) {

        var copyHTML = document.importNode(template, true);
        copyHTML.querySelector(".name h2").textContent = storageData[i].name;
        copyHTML.querySelector(".imageUrl img").src = storageData[i].image;
        copyHTML.querySelector(".description span").textContent = storageData[i].description;
        copyHTML.querySelector(".id span").textContent = storageData[i].id;
        copyHTML.querySelector(".lenses span").textContent = storageData[i].lenses;

        var modifiedPrice = storageData[i].price.toString()
        copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

        document.getElementById("contentContainer").appendChild(copyHTML);

        priceTotal.push(storageData[i].price)
        console.log(priceTotal);

        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        var reduc = priceTotal.reduce(reducer).toString()
        document.querySelector('.total span').textContent = reduc.substring(0, reduc.length - 2) + "." + reduc.substring(reduc.length - 2, reduc.length) + ' €'

        var buttonDeletItem = document.querySelectorAll(".remove")

        buttonDeletItem[i].addEventListener("click", function () {
            storageData.splice(i, 1);

            localStorage.setItem("oricaddy", JSON.stringify(storageData));

            document.location.reload();
        })
        var buttonDeletAllItem = document.querySelector(".removeAll")

        buttonDeletAllItem.addEventListener("click", function () {
            localStorage.removeItem("oricaddy")

            document.location.reload();
        })
    }
} else {
    document.querySelector(".removeAll").style.display = "none"
    document.querySelector(".form").style.display = "none"
    document.querySelector(".total").innerHTML = "Votre panier est vide"
    localStorage.removeItem("oricaddy")
}
document.querySelector('form').addEventListener("submit", function (e) {
    e.preventDefault()
    var products = [];

    for (let i = 0; i < storageData.length; i++) {
        products.push(storageData[i].id);

        var userData = {
            "contact": {
                "firstName": document.querySelector("#firstName").value,
                "lastName": document.querySelector("#lastName").value,
                "address": document.querySelector("#address").value,
                "city": document.querySelector("#city").value,
                "email": document.querySelector("#email").value
            },
            "products": products
        };

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('http://localhost:3000/api/cameras/order', {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(userData)
        }).then(function (response) {
            return response.json();
        }).catch(function (err) {
            console.log(err);
        });
        
    }
});