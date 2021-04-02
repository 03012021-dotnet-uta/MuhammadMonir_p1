function onPageLoad() {
    fetch('api/stores', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }
            else       // When the page is loaded convert it to text
                return response.json();
        })
        .then(result => {
            console.log(result);
            sessionStorage.setItem('stores', JSON.stringify(result));
            displayStores();
        });
    
}


function displayStores() {
    let stores = sessionStorage.getItem('stores');
    stores = JSON.parse(stores);
    //console.log(stores);
    let storeContainer = document.querySelector('#div2');
    if (stores != null) {
        Object.values(stores).map(item => {
            // console.log(item.sName);
            storeContainer.innerHTML += `
        <div class="image">
            <img src="${item.imageUrl}" alt="Product2">
            <h3>${item.sName}</h3>
            <h3>${item.address1}</h3>
            <a  href="#" class="add-cart cart1">Select this Store ${item.id}</a>
        </div>
    </div>
    </div>
     `
        })
    }
    var stores2 = document.querySelectorAll('.add-cart');
    if (stores2 != null) {
        for (let i = 0; i < stores2.length; i++) {

            stores2[i].addEventListener('click', (e) => {
                e.preventDefault();
                let storeid = stores2[i].innerText;
                storeid = storeid.slice(18);
                sessionStorage.setItem("storeid", storeid);
                location.replace("./Shop.html");
            })
        }

    }
    onLoadCartNumbers();
}

function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}







onPageLoad();