// URL de l'API des produits
const url = 'http://localhost:3000/api/products';
// Faire une requête GET à l'API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Stocker les produits reçus dans une variable
    let products = data;
    // Parcourir la liste des produits
    for (let Kanap of products) {
      let myHtml = `
        <a href="./product.html?id=${Kanap._id}">
          <article>
            <img src="${Kanap.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name">
            <h3 class="productName">${Kanap.name}</h3>
            <p class="productDescription">${Kanap.description}</p>
          </article>
        </a>`;
      document.getElementById("items").innerHTML += myHtml;
    }
  })
  .catch(error => console.error("Error:", error));
