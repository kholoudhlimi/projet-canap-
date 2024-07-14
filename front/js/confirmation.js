const orderId = JSON.parse(localStorage.getItem("order")) || {};
const params = new URLSearchParams(window.location.search);
const Id = params.get("id");
const url = `http://localhost:3000/api/products/order/${Id}`;

let informations = document.querySelector('#orderId');
    informations.innerHTML += `${orderId.orderId}`;
