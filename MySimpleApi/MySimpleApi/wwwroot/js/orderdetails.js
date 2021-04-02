const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

fetch(`api/orders/${orderId}`)
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
        displayOrder(res);
    })
    .catch(() => {
        console.log('failed to fetch the page: ', err);
    });

function displayOrder(item) {
    console.log("kkkk");
    let oc = document.querySelector('.myorders');
    let odc = document.querySelector('.orderdetails');
    if (item) {
        oc.innerHTML = '';

        console.log("item " + item);
        oc.innerHTML += `
            <div class="myorders-body">
               <span class="myorders-id">${item.id}</span>
               <span class="myorders-store">${item.store.sName}</span>
               <span class="myorders-date">${item.orderDate}</span>
               <span class="myorders-total">${item.storeAmount}.00</span>
               <span class="myorders-status">${item.orderStatus}</span>
               <br>
               <br>
            </div>
            <h3>Details .....</h3>
            `;
        
        Object.values(item.orderDetails).map(od => {
            odc.innerHTML += `
             <div class="myorders-body">
                <span class="myorders-id">${od.id}</span>
               <span class="myorders-store">${od.product.productName}</span>
               <span class="myorders-date">${od.quantity}  X </span>
               <span class="myorders-total">${od.product.listPrice}.00</span>
              
               </div>
                `
        });

    }
}