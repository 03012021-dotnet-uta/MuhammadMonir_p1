const userid = JSON.parse(sessionStorage.getItem('user')).id;


fetch(`api/orders/byuser/${userid}`)
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
        }
        else
            return response.json();
    })
    
    .then(res => displayOrders(res));




function displayOrders(myorders) {
   
    let oc = document.querySelector('.myorders');
    let odc = document.querySelector('.orderdetails');
    if (myorders) {
        oc.innerHTML = '';
        Object.values(myorders).map(item => {
            console.log("item " + item);
            oc.innerHTML += `
            <div class="myorders-body">
               <span class="myorders-id">${item.id}</span>
               <span class="myorders-store">${item.store.sName}</span>
               <span class="myorders-date">${item.orderDate}</span>
               <span class="myorders-total">${item.storeAmount}.00</span>
               <span class="myorders-status">${item.orderStatus}</span>
               <Span class="detailbutton"><a href="orderdetail.html?orderId=${item.id}">Details</a></span>
               <br>
            </div>
            `;
          
            })
          
            
           
        }
       
    }

displayOrders();

