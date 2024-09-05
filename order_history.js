const loadAllOrders = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`)
        .then((res) => res.json())
        .then((data) => {
            if(data.user.is_staff){
                fetch(`https://homecrew-backend.onrender.com/cart/`)
                    .then((res) => res.json())
                    .then((data) => displayAllOrders(data));
            }
            else{
                fetch(`https://homecrew-backend.onrender.com/cart/?client_id=${user_id}`)
                    .then((res) => res.json())
                    .then((data) => displayAllOrders(data));
            }
        });
    
};



const displayAllOrders =(items)=>{
    const user_id = localStorage.getItem('user_id') ;
    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`)
        .then((res) => res.json())
        .then((data) => {
            const admin = data.user.is_staff;
            if(admin){
                items.forEach((item) => {
                    const parent = document.getElementById('table-body');
                    const tr = document.createElement('tr');
                    if(item.cancel == false){
                        tr.innerHTML=`
                            
                            <td class='special-td'>${item.client_name}</td>
                            <td>${item.service_name}</td>
                            <td>${item.order_status}</td>
                            ${
                                item.order_status=='Bought'?
                                `<td><button class='btn btn-outline-warning''>No Refund</button></td>` 
                                :`<td><button class='btn btn-outline-danger' onclick='deleteOrder(${item.id})'>Cancel Order</button></td>`
                            }
                            
                            ${
                                item.order_status=='Bought'?
                                `<td><p class='btn btn-outline-secondary'>Delivered</p ></td>` 
                                :`<td><button class='btn btn-outline-primary' onclick='deliverOrder(${item.id})'>Deliver</button></td>`
                            }
                        `;
                        parent.appendChild(tr);
                    }       
                    else{
                        tr.innerHTML=`
                            
                            <td class='special-td'>${item.client_name}</td>
                            <td>${item.service_name}</td>
                            <td>${item.order_status}</td>
                            <td class='text-danger'>Order Cancelled</td>
                            <td class='text-danger'>Customer Cancelled</td>
                        `;
                        parent.appendChild(tr);
                    }       
                });
            }
            else{
                items.forEach((item) => {
                    const parent = document.getElementById('table-body');
                    const tr = document.createElement('tr');
                    if(item.cancel == false){
                        tr.innerHTML=`
                            
                            <td>${item.client_name}</td>
                            <td>${item.service_name}</td>
                            <td>${item.order_status}</td>
                            ${
                                item.order_status=='Bought'?
                                `<td><button class='btn btn-outline-warning'>No Refund</button></td>` 
                                :`<td><button class='btn btn-outline-danger' onclick='deleteOrder(${item.id})'>Cancel Order</button></td>`
                            }
                            
                            ${
                                item.order_status=='Bought'?
                                `<td>Enjoy Your Service!</td>` 
                                :`<td>Your order is bring processed</td>`
                            }
                            
                        `;
                        parent.appendChild(tr);
                    }       
                    else{
                        tr.innerHTML=`
                            
                            <td>${item.client_name}</td>
                            <td>${item.service_name}</td>
                            <td>${item.order_status}</td>
                            <td class='text-danger'>Order Cancelled</td>
                            <td class='text-danger'>You cancelled the order</td>
                            
                        `;
                        parent.appendChild(tr);
                    }       
                });
            }
        });
    
    
}


const deleteOrder=(id)=>{
    const token = localStorage.getItem('token');
    fetch(`https://homecrew-backend.onrender.com/cart/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cancel:true
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Order Canceled:', data);
        location.reload();
        // You can reload the list or update the UI as needed
    })
    .catch(error => {
        console.error('Error in canceling order:', error);
    });
}
const deliverOrder=(id)=>{
    const token = localStorage.getItem('token');
    fetch(`https://homecrew-backend.onrender.com/cart/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            order_status:'Bought'
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('Order Deliverd:', data);
        location.reload();
        // You can reload the list or update the UI as needed
    })
    .catch(error => {
        console.error('Error in delivering order:', error);
    });
}


loadAllOrders();