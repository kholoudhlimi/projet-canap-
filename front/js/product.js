
// Récupérer l'ID du produit depuis les paramètres de l'URL
const params = new URLSearchParams(window.location.search);
const ProductId = params.get("id");

// Construire l'URL pour récupérer les détails du produit depuis l'API locale
const url = `http://localhost:3000/api/products/${ProductId}`;

// Effectuer une requête fetch pour récupérer les détails du produit
fetch(url)
  .then(response => response.json())
  .then(product => {
    // Mettre à jour l'image du produit
    let image = document.querySelector(".item__img");
    image.innerHTML = `<img decoding="async" src="${product.imageUrl}" alt="${product.altTxt}">`;

    // Mettre à jour le titre du produit
    let title = document.getElementById("title");
    title.innerHTML = `<h1>${product.name}</h1>`;

    // Mettre à jour le prix du produit
    let price = document.getElementById("price");
    price.innerHTML = `<span>${product.price}</span>`;

    // Mettre à jour la description du produit
    let description = document.getElementById("description");
    description.innerHTML = `<p>${product.description}</p>`;

    // Mettre à jour les options de couleur du produit
    let options = document.querySelector("select#colors");
    options.innerHTML = `<option value="">-- SVP, choisissez une couleur --</option>`;
    for (let color of product.colors) {
      options.innerHTML += `<option value="${color}">${color}</option>`;
    }

    // Définir la classe Product
    class Product {
      constructor(id, name, description, price, colors, imageUrl, altTxt, quantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = +price; // Assurez-vous que price est converti en nombre
        this.colors = colors;
        this.imageUrl = imageUrl;
        this.altTxt = altTxt;
        this.quantity = +quantity; // Assurez-vous que quantity est converti en nombre
      }
    }

    // Ajouter un événement au bouton "Ajouter au panier"
    let btnAddToCart = document.getElementById("addToCart");
    btnAddToCart.addEventListener("click", () => {
      // Récupérer la couleur sélectionnée et la quantité depuis l'input
      let colors = document.getElementById("colors").value;
      let quantity = document.getElementById("quantity").value;

      // Vérifier si les champs couleur et quantité ne sont pas vides
      if (colors !== "" && quantity !== "" && quantity > 0) {
        let objectProduct = new Product(
          ProductId,
          product.name,
          product.description,
          product.price,
          colors,
          product.imageUrl,
          product.altTxt,
          quantity
        );

        // Récupérer les produits dans le panier depuis localStorage ou initialiser un tableau vide
        let cart = JSON.parse(localStorage.getItem("products")) || [];
        cart.push(objectProduct);

        // Mettre à jour les données du panier dans le localStorage
        localStorage.setItem("products", JSON.stringify(cart));

        // Rediriger vers la page du panier après l'ajout du produit
        document.location.href = "../html/cart.html";
      } else {
        // Afficher un message d'erreur si la couleur ou la quantité est vide
        alert("Veuillez sélectionner une couleur et une quantité");
      }
    });
  })
  
  .catch(error => {
    console.error("Erreur", error);
  });
