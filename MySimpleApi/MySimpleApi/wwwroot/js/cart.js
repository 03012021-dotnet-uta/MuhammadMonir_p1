
const submitOrder = document.querySelector('.submitorder');
function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    console.log("Product clicked is ", product);
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {

    let cartItems = sessionStorage.getItem('productsInCart');

    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[product.productName] == undefined) {
            cartItems = {
                ...cartItems,
                [product.productName]: product
            };
            cartItems[product.productName].inCart = 0;
        }
        cartItems[product.productName].inCart += 1;

    } else {
        product.inCart = 1;

        cartItems = {
            [product.productName]: product
        }

    }

    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = sessionStorage.getItem('totalCost');

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        sessionStorage.setItem("totalCost", cartCost + product.listPrice);
    } else {
       sessionStorage.setItem("totalCost", product.listPrice);
    }

}

function displayCart() {

    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("Cart Items " + cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = sessionStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            console.log("item " + item);
            productContainer.innerHTML += `
            <div class="product"><spam class="removeItem">X</span>
                <img src="${item.imageUrl}.jpg">
                <span>${item.productName}</span>
            </div>
            <div class="price">$${item.listPrice},00</div>
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>
            <div class="total">
                $${item.inCart * item.listPrice}.00
            </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">
                Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost}.00
            </h4>
        `
    }

    let remov = document.querySelectorAll('.removeItem');

    for (let i = 0; i < remov.length; i++) {

        remov[i].addEventListener('click', () => {
            let pname = remov[i].innerText;
            onRemoveItem(pname)
        });

    }

}


function onRemoveItem(i) {
    let deleteitem = i.slice(3);
    console.log("Remove clicked *" + deleteitem + "*");
    var myCartArray = sessionStorage.getItem("productsInCart");
    myCartArray = JSON.parse(myCartArray);
    console.log("My Cart Array " + JSON.stringify(myCartArray));
    let deletedItemPrice = myCartArray[deleteitem].listPrice;
    let deletedItemNumbers = myCartArray[deleteitem].inCart;
    console.log("Deleted Price " + deletedItemPrice + " Deleted qty " + deletedItemNumbers);
    resetCartNumber(deletedItemNumbers);
    resetTotalCost(deletedItemPrice, deletedItemNumbers);
    delete myCartArray[deleteitem];
    console.log("After delete " + JSON.stringify(myCartArray));
    sessionStorage.setItem("productsInCart", JSON.stringify(myCartArray));
    displayCart();


}

function resetCartNumber(numberd) {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        sessionStorage.setItem('cartNumbers', productNumbers - parseInt(numberd));
        document.querySelector('.cart span').textContent = productNumbers - parseInt(numberd);
    } else {
        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
}

function resetTotalCost(priced, qty) {
    let cartCost = sessionStorage.getItem('totalCost');
    console.log("priced " + priced + " and qty " + qty)
    let deletedCost = parseFloat(priced) * parseInt(qty);
    console.log("deleted cost is " + deletedCost);
    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        sessionStorage.setItem("totalCost", cartCost - deletedCost);
    } else {
        sessionStorage.setItem("totalCost", parseFloat(priced));
    }
}
onLoadCartNumbers();
displayCart();

function onsubmitorders() {
    const userId = JSON.parse(sessionStorage.getItem('user')).id;
    const storeId = sessionStorage.getItem('storeid');
    let productsincart = JSON.parse(sessionStorage.getItem('productsInCart'));
    let cartCost = sessionStorage.getItem('totalCost');

    var orderDetails = [];
    Object.values(productsincart).map(prod => {
      
        orderDetails.push({

            "productId": prod.id,
            "quantity": prod.inCart,
            "price": parseFloat(prod.listPrice) * parseFloat(prod.inCart)
        })
    })

    const order = {
        "userId": userId,
        "storeId": storeId,
        "storeAmount": cartCost,
        "orderDetails": orderDetails
    }

    fetch('api/orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(order)
    })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            else
                return response.json();
        })
        .then((jsonresponse) => {
           
            console.log(jsonresponse);
            return jsonresponse;
        })
        .then(res => {
            alert(`Your order is received, the ID is ${res.id}`);
            sessionStorage.removeItem('productsInCart');
            sessionStorage.removeItem('cartNumbers');
            sessionStorage.removeItem('totalCost');

           // sessionStorage.setItem('username', res.email);
            location = "myorders.html";
        })
        .catch(() => {
            console.log('failed to fetch the page: ', err);
        });

}



