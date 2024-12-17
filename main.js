let productArray = []
let productGrid = document.getElementById("products-grid")

let cartProd = document.getElementById("cart-products")
let cart = [];

let sum = 0;

if(localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"))
    drawCartProducts();
}

$(document).ready(function(){
    $.ajax('https://my-json-server.typicode.com/Salamandra19977/marketplace/products', {
        dataType: 'json',
        data: {limit: 100},
        success: function(result) {
            console.log(result)
            Fill(result)
        },
        error: function(xhr) {
            console.log(xhr.statusText)
        }
    })
})

function Fill(result) {
    result.forEach(i => {
        productArray.push(i);
        let price = null;
        if(i.price) {
            price = i.price + "$"
        }
        else {
            price = "N/A"
        }
        $(".gridContainer").append(`
            <div class="grid-element"
                <h2 class="product_name">${i.product_name}</h2>
                <img class="grid-image" src="${i.photo_url}" alt="Image">
                <p class="description">${i.product_description || i.description}</p>
                <p class="author_id">author id: ${i.author_id}</p>
                <a class="link" href="profile.html?id=${i.author_id}">Profile</a>
                <p class="price">${price}</p>
                <p class="id">id: ${i.id}</p>
                <button class="buy" onclick="addToCart(${i.id})">Buy Now!</button>
            <div>
        `)
    });
}

function openCart() {
    $(".cart-products").toggleClass("hide")
}

function addToCart(id) {
    let product = productArray.find(function(p){
        return p.id == id
    })
    console.log(id);
    cart.push(product)
    localStorage.setItem("cart", JSON.stringify(cart))
    drawCartProducts()
}

function drawCartProducts() {
    cart = cart.filter(p => p);
    cartProd.innerHTML = null;
    sum = 0;

    cart.forEach(function(p) {
        cartProd.innerHTML += `
            <p>
                <img class="cart-photo" src="${p.photo_url}">
                | ${p.product_name} | ${p.price}
            </p>
            <hr>
        `;
        if (!isNaN(p.price)) {
            sum += +p.price;
        }
    });

    cartProd.innerHTML += `
        <button class="clear" onclick="clearCart()">Clear</button>
        <button class="buyAll" onclick="clearCart()">Buy All</button>
        <p class="sumPrice">${sum}$</p>
    `;
    localStorage.setItem("cart", JSON.stringify(cart));
}


function clearCart() {
    cartProd.innerHTML = "Cart is Empty";
    sum = 0;
    localStorage.setItem("cart", "[]");
    cart = [];
}