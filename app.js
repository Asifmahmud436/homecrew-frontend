const token = localStorage.getItem('token');
const loadService = () =>{
    fetch("https://homecrew-backend.vercel.app/service/service/")
        .then((res) => res.json())
        .then((data) => displayService(data));
    fetch("https://homecrew-backend.vercel.app/service/service/")
        .then((res) => res.json())
        .then((data) => displayIndexService(data));
    fetch("https://homecrew-backend.vercel.app/service/review/")
        .then((res) => res.json())
        .then((data) => displayReview(data));
};

const displayIndexService = (services) =>{
    services.forEach(service => {
        const parent = document.getElementById('index-service-section');
        const div = document.createElement('div');
        div.classList.add('index-service-card');
        div.innerHTML = `
                <div>
                    <img src="${service.image}" alt="service-image" srcset="">
                </div>
                <div class='index-card-content'>
                    <h2>${service.name}</h2>
                    <p>${service.description.slice(0,80)}...</p>
                    <button type="button"><a href="serviceDetails.html">See More</a></button>
                </div>
        `;
        parent.appendChild(div);
    });
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
                    <p>${service.description.slice(0,80)}...</p>
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
const saveClientId = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://homecrew-backend.vercel.app/client/list/?user_id=${user_id}`)
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem('client_id',data[0].id);
        });
}
saveClientId();
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
    fetch(`https://homecrew-backend.vercel.app/service/service/${param}`)
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

const orderAllItems = () => {
    const token = localStorage.getItem('token'); // Ensure token is retrieved
    if (token) {
        const items = document.getElementById('cart-content').children;
        const client_id = localStorage.getItem('client_id');

        // Create an array to hold promises for all fetch requests
        const orderPromises = [];

        for (let item of items) {
            const serviceId = item.dataset.serviceId;
            const info = {
                "client": client_id,
                "service": serviceId,
                "order_status": "Ordered",
                "cancel": false
            };

            // Push each fetch request promise into the array
            const orderPromise = fetch(`https://homecrew-backend.vercel.app/cart/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add authorization token here
                },
                body: JSON.stringify(info),
            })
            .then(res => res.json())
            .then(data => console.log("Order Response:", data))
            .catch(error => console.error("Order Error:", error));

            orderPromises.push(orderPromise);
        }

        // Wait for all fetch requests to complete before redirecting
        Promise.all(orderPromises)
            .then(() => {
                removeFromCartAll();  // Clear the cart after all requests succeed
                window.location.href = 'order_history.html'; // Redirect after orders are completed
            })
            .catch((error) => {
                console.error("Error processing orders:", error);
            });
    }
};
