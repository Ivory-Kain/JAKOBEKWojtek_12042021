fetch("http://localhost:3000/api/cameras")
.then(function(res) {
  if (res.ok) {
    return res.json();
  }
})
.then(function(data) {
  console.log(data);

  var temp1 = document.getElementById("sample").content
  
  for (let i = 0; i < data.length; i++){
    document.getElementById("sample")
    var copyHTML = document.importNode(temp1,true);
    document.getElementById("contentContainer").appendChild(copyHTML);
  
  }
})
.catch(function(err) {
  
});











// async function soldProduct() {

//     let response = await fetch("http://localhost:3000/api/cameras");


//     let cameras = [];
//     cameras = response.json();

    

//     cameras.forEach(camera => {

//       // const formattedPrice = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(camera.price/100);

//       document.querySelector("section").innerHTML +=
//       `  <a href = "product.html">
//       <div class="container">
//         <div class="name">
//           <h3>${camera.name}</h3>
//         </div>
//         <div class="imageUrl">
//         <img src="${camera.imageUrl}" alt="vcam" />
//       </div>
//         <div class="price">
//           <p>Prix : ${camera.price/100} €</p>
//         </div>
//        </div></a> `
      
//     })   


      
//     }    

// soldProduct()

// /<div class="description">
//           <p>${camera.description}</p>
//         </div>
//         <div class="id">
//         <p>Ref : ${camera._id}</p>
//       </div>
//       <div class="lenses">
//       <p>Lentilles : ${camera.lenses}</p>
//     </div> 



