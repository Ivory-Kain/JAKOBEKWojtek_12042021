async function soldProduct() {

    let response = await fetch("http://localhost:3000/api/cameras");
    let cameras = await response.json();

    for (let i = 0; i < cameras.length; i++) {

        document.querySelector("section").innerHTML +=
            `  <div class="container">
        <div class="name">
        <h3>${cameras[i].name}</h3>
      </div>
      <div class="lenses">
        <p>${cameras[i].lenses}</p>
      </div>
      <div class="id">
        <p>${cameras[i]._id}</p>
      </div>
    
      <div class="price">
        <p>${cameras[i].price}</p>
      </div>
      <div class="description">
        <p>${cameras[i].description}</p>
      </div>
      <div class="imageUrl">
        <img src="${cameras[i].imageUrl}" alt="vcamOne" />
      </div> 
      </div>      `;
}}

soldProduct()