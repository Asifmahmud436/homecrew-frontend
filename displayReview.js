document.addEventListener('DOMContentLoaded', () => {
    const serviceId = new URLSearchParams(window.location.search).get('service_id');
    document.getElementById('service_id').value = serviceId;
});

function handleReviewSubmit(event) {
    event.preventDefault();
    
    const serviceId = document.getElementById('service_id').value;
    const rating = document.getElementById('rating').value;
    const reviewBody = document.getElementById('reviewBody').value;
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('user_id');
    const clientName = localStorage.getItem('client_name'); // Assuming clientName is stored in local storage
    const serviceName = localStorage.getItem('service_name'); // Assuming serviceName is stored in local storage

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