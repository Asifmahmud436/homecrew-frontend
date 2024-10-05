const handleService = (event) => {
    event.preventDefault();

    const service_title = document.getElementById('service-title').value;
    const service_body = document.getElementById('service-body').value;
    const service_image = document.getElementById('service-image').files[0];

    const token = localStorage.getItem('token');

    // Use FormData to handle the file upload
    const formData = new FormData();
    formData.append('name', service_title);
    formData.append('description', service_body);
    formData.append('image', service_image);

    console.log(service_title);
    console.log(service_body);
    console.log(service_image);
    fetch('https://homecrew-backend.vercel.app/service/service/', {
        method: 'POST',
        headers: {
            // No need to set 'Content-Type', it will be set automatically when using FormData
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(data => {
        console.log('Service submitted:', data);
        alert('Service submitted successfully!');
        // Optionally redirect to another page
        // window.location.href = 'index.html'; 
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error adding your service.');
    });
};