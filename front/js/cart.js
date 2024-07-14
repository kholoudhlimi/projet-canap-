// Charger le panier depuis le localStorage
let cart = JSON.parse(localStorage.getItem("products")) || [];

// Afficher les articles du panier
if (cart.length > 0) {
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const productList = document.getElementById("cart__items");
// Ajouter le HTML pour chaque produit dans le panier
        productList.innerHTML += `
            <article class="cart__item" data-id="${product.id}">
                <div class="cart__item__img">
                    <img decoding="async" src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__titlePrice">
                        <h2>${product.name}</h2>
                        <p>${product.price * product.quantity} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div><p>Couleur : ${product.colors}</p></div>
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}" data-index="${i}">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem" data-index="${i}">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}

// Calculer et afficher la quantité totale

let productNumbers = document.getElementById("totalQuantity");
let productInCart = cart.reduce((sum, product) => sum + product.quantity, 0);
productNumbers.innerHTML = `${productInCart}`;
// Calculer et afficher le prix total
let totalPrice = document.getElementById("totalPrice");
let priceInCart = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
totalPrice.innerHTML = `${priceInCart} €`;

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
    cart.splice(index, 1);  // Supprimer l'élément du tableau 'cart'
    localStorage.setItem("products", JSON.stringify(cart));  // Mettre à jour le localStorage
    location.reload();  // Recharger la page pour refléter les modifications
}

// Événement pour supprimer un article lors du clic sur "Supprimer"
document.addEventListener("click", (event) => {
    if (event.target.classList.contains("deleteItem")) {
        let index = event.target.getAttribute("data-index");
        removeFromCart(index);  // Appeler la fonction removeFromCart avec l'index récupéré
    }
});

// Regex pour la validation des données du formulaire
const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

// Soumission du formulaire
const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
// Récupérer les données du formulaire
    const formData = new FormData(form);
    // Convertir les données en objet
    const contact = Object.fromEntries(formData);

    // Extraire les identifiants des produits dans le panier
    let products = cart.map(product => product.id);
    console.log(products);

    // Envoyer les données à l'API
    fetch('http://localhost:3000/api/products/order/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ contact, products })
    })
        .then((response) => response.json())
        .then((data) => {
            localStorage.setItem("order", JSON.stringify(data));
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            localStorage.removeItem("products");
        })
        .catch((error) => console.log("Erreur" + error));
});

