const getServices = ()=>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://homecrew-backend.onrender.com/cart/?client_id=${user_id}`)
            .then((res) => res.json())
            .then((data) => displayServices(data));
}

const displayServices = (services) =>{
    services.forEach(service => {
        const container = document.getElementById('ownedSerivceBody');
        container.innerHTML += 
        `
            <option value="${service.id}">${service.service_name}</option>;
        `;
    });
}

function handleReviewSubmit(event) {
    event.preventDefault();
    
    const serviceId = document.getElementById('ownedSerivceBody').value;
    const rating = document.getElementById('rating').value;
    const reviewBody = document.getElementById('reviewBody').value;
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user_id');

    if (token) {
        const review = {
            body: reviewBody,
            rating: rating,
            client: userID,
            service: serviceId,
        };

        fetch('https://homecrew-backend.onrender.com/service/review/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(review)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Review submitted:', data);
            alert('Review submitted successfully!');
            // Optionally redirect to another page
            window.location.href = 'index.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your review.');
        });
    } else {
        alert('You must be logged in to submit a review.');
    }
}

getServices();