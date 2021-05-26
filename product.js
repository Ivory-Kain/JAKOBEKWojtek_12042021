var url = new URL(window.location.href)
console.log("url", url);

var id = url.searchParams.get("id")
console.log("id : ", id);

fetch("http://localhost:3000/api/cameras/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();

        }

    })
    .then(function (data) {
        console.log("data : ", data);
        var template = document.getElementById("sample").content
        var copyHTML = document.importNode(template, true);
        var modifiedPrice = data.price.toString()

        copyHTML.querySelector(".name h2").textContent = data.name;
        copyHTML.querySelector(".imageUrl img").src = data.imageUrl;
        copyHTML.querySelector(".description span").textContent = data.description;
        copyHTML.querySelector(".id span").textContent = data._id;
        copyHTML.querySelector(".lenses span").textContent = data.lenses;

        copyHTML.querySelector(".price span").textContent = modifiedPrice.substring(0, modifiedPrice.length - 2) + "." + modifiedPrice.substring(modifiedPrice.length - 2, modifiedPrice.length) + ' €'

        document.getElementById("contentContainer").appendChild(copyHTML);

        var tempLenses = document.getElementById("lenses").content
        console.log(tempLenses);

        for (let i = 0; i < data.lenses.length; i++) {
            var copyLenses = document.importNode(tempLenses, true);

            copyLenses.querySelector("option").textContent = data.lenses[i];
            copyLenses.querySelector("option").value = data.lenses[i];
            document.querySelector("#optionProduct").appendChild(copyLenses);
        }

        var select = document.querySelector("select")


        select.addEventListener("change", function () {
            if (select.selectedIndex > 0)
                document.querySelector("#btn").removeAttribute("disabled");
        })
        var itemDetails = {
            name: data.name,
            image: data.imageUrl,
            description: data.description,
            id: data._id,
            lenses: data.lenses,
            price: data.price
        }
        var button = document.querySelector("#btn")

        var pickArray = []

        button.addEventListener("click", function () {
            itemDetails.lenses = select.value

            if (localStorage.getItem('oricaddy') !== null) {
                pickArray = JSON.parse(localStorage.getItem('oricaddy'));

                const thisId = pickArray.findIndex(element => element.name === data.name);
                const thisLenses = pickArray.findIndex(element => element.lenses === data.lenses);

                if (thisId < 0 || thisLenses < 0) {
                    pickArray.push(itemDetails)
                }
            } else {
                pickArray.push(itemDetails)
            }
            localStorage.setItem("oricaddy", JSON.stringify(pickArray));

            document.location.reload();
        })
    })
    .catch(function (err) {});

if (localStorage.getItem('oricaddy') !== null) {
    document.querySelector("span.badge").textContent = JSON.parse(localStorage.getItem('oricaddy')).length
} else {
    document.querySelector(".badge").style.display = "none"
}