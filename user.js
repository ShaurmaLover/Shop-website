const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id')

$(document).ready(function(){
    $.ajax(`https://my-json-server.typicode.com/Salamandra19977/marketplace/users/${id}`, {
        dataType: 'json',
        data: {limit: 100},
        success: function(result) {
            console.log(result)
            FillProfile(result)
        },
        error: function(xhr) {
            console.log(xhr.statusText)
        }
    })

    $.ajax(`https://my-json-server.typicode.com/Salamandra19977/marketplace/products?author_id=${id}`, {
        dataType: 'json',
        data: {limit: 100},
        success: function(result) {
            console.log(result)
            FillProducts(result)
        },
        error: function(xhr) {
            console.log(xhr.statusText)
        }
    })
})

function FillProfile(result) {
    
    $(".profile").prepend(`
        <div class="element"
            <h2 class="user_name">${result.name + surnameCheck(result.surname)}</h2>
            <img class="user-image" src="${result.photo_url}" alt="Image">
            <p class="user_id">author id: ${result.id}</p>
            <p class="balance">${result.balance + '$'}</p>
        <div>
    `)
}

function FillProducts(result) {
    result.forEach(i => {
        let price = null;
        if(i.price) {
            price = i.price + "$"
        }
        else {
            price = "N/A"
        }
        $(".gridContainerP").append(`
            <div class="grid-elementP"
                <h2 class="product_name">${i.product_name}</h2>
                <img class="grid-image" src="${i.photo_url}" alt="Image">
                <p class="description">${i.product_description || i.description}</p>
                <p class="author_id">author id: ${i.author_id}</p>
                <p class="price">${price}</p>
                <p class="id">id: ${i.id}</p>
                <button class="buy">Buy Now!</button>
            <div>
        `)
    });
}

function surnameCheck(surname) {
    if(!surname) return "";
    return " " + surname;
}