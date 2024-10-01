const token = localStorage.getItem('token');
const loadService = () =>{
    fetch("https://homecrew-backend.onrender.com/service/service/")
        .then((res) => res.json())
        .then((data) => displayService(data));
    fetch("https://homecrew-backend.onrender.com/service/review/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
};

const displayService = (services) =>{
    services.forEach(service => {
        let stars = '';
        for (let i = 0; i < service.average_rating; i++) {
            stars += '⭐';
        }
        const parent = document.getElementById('doctors');
        const div = document.createElement('div');
        div.classList.add('doc-card');
        div.innerHTML = `
                <img class="doc-img" src="${service.image}" alt="">
                <div class='card-content'>
                    <h4>${service.name}</h4>
                    <p>${service.average_rating !== null ? stars:'No one reviewed it yet'}</p>
                    <p>${service.description.slice(0,80)}</p>
                    ${
                        token?
                        `<button type="submit" class='service-btn' onclick='addToCart("${service.id}")'>Add To Cart</button>`
                        :`<p></p>`
                    }
                    
                
                </div>
        `;
        parent.appendChild(div);
    });
};

loadService();



const displayReview = (services) =>{
    services.forEach(item => {
        let stars = '';
        for (let i = 0; i < item.rating; i++) {
            stars += '⭐';
        }
        const parent = document.getElementById('slider-container');
        const li = document.createElement('li');
        li.classList.add('li');
        li.innerHTML = `
                <div class="card shadow h-100">
                        <div class="card-body p-3 p-xl-5">
                            <h3 class="card-title h3 ">${item.service_name}</h3>
                            <h3 class="card-title h5">Client: ${item.client_name}</h3>
                            <h3 class="card-title h6">Date:    ${item.created_on.slice(0,10)}</h3>
                            <p class="card-text h3 ps-0 pb-2">${stars}</p>
                            <p class="card-text h3 ps-0 pb-2 review-body">${item.body}</p>
                            
                        </div>
                    </div>
        `;
        parent.appendChild(li);
    });
};

const addToCart=(param)=>{
    // console.log('Hello world.')
    fetch(`https://homecrew-backend.onrender.com/service/service/${param}`)
        .then((res) =>res.json())
        .then((data) =>{
            const parent = document.getElementById('cart-content');
            const div = document.createElement('div');
            div.id = `service-${data.id}`;
            div.dataset.serviceId = data.id;  
            // div.dataset.serviceId = data.id;
            div.innerHTML = `
                <div class='display-cart mb-2'>
                    <p class="fw-bold text-black" >${data.name}</p>
                    
                    <button class="btn btn-danger" type="submit" onclick='removeFromCart(${data.id})'>Delete</button>
                </div>
            `;  
            parent.appendChild(div);
            // console.log(data);
        });
}

const removeFromCart=(serviceID)=>{
    const cartElement = document.getElementById(`service-${serviceID}`);
    if(cartElement){
        cartElement.remove();
    }
}
const removeFromCartAll=()=>{
    const cartElement = document.getElementById(`cart-content`).children;

    Array.from(cartElement).forEach(item =>{
        item.remove();
    });
    
}
orderAllItems = () =>{
    if(token){
        const items = document.getElementById('cart-content').children;
        for(let item of items){
            // const itemName  = item.querySelector('h4').innerText;
            const serviceId = item.dataset.serviceId;
            // const serviceId = item.dataset.serviceId;
            const user_id = localStorage.getItem('user_id');
            const info = {
                "client": user_id,
                "service": serviceId,
                "order_status": "Ordered",
                "cancel": false
            };
            fetch(`https://homecrew-backend.onrender.com/cart/`,{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify(info),
            })
                .then((res)=>(res.json()))
                .then((data)=>console.log(data))
                window.location.href = 'order_history.html';
            // console.log(itemName,serviceId);
        };
        removeFromCartAll();
    }
}




// getparams();