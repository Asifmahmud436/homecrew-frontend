const loadUser = () => {
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        document.getElementById('user-photo').src = data.image || 'default-photo.png'; // Fallback to a default image if none is provided
        document.getElementById('first-name').value = data.user.first_name || '';
        document.getElementById('last-name').value = data.user.last_name || '';
        document.getElementById('phone-no').value = data.phone_no || '';
        document.getElementById('facebook-id-link').value = data.facebook_Id_link || '';
    })
    .catch(error => {
        console.error('Error loading user data:', error);
    });
};



document.getElementById('save-button').addEventListener('click', function() {
    const user_id = localStorage.getItem('user_id'); // Make sure this calculation is correct
    const token = localStorage.getItem('token');
    
    const formData = new FormData();
    // formData.append('user.username', document.getElementById('username').value);
    formData.append('user.first_name', document.getElementById('first-name').value);
    formData.append('user.last_name', document.getElementById('last-name').value);
    formData.append('phone_no', document.getElementById('phone-no').value);
    formData.append('facebook_Id_link', document.getElementById('facebook-id-link').value);
    
    const imageFile = document.getElementById('user-image').files[0];
    if (imageFile) {
        formData.append('image', imageFile);
    }

    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('User updated successfully', data);
        loadUser();  // Reload user details
    })
    .catch(error => {
        console.error('Error updating user:', error);
    });
});

const AllUser = () =>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`)
        .then((res) => res.json())
        .then((data) => loadAllUser(data));
}
const loadAllUser = (val) =>{
    if(val.user.is_staff == true){
        fetch(`https://homecrew-backend.onrender.com/client/list/`)
        .then((res) => res.json())
        .then((items) => {
            const header_parent = document.getElementById('make-admin-table');
            const h1 = document.createElement('h1');
            h1.classList.add('admin-table-name');
            h1.innerText = 'Make Admin Changes';
            header_parent.appendChild(h1);
            items.forEach((item) => {
                const parent = document.getElementById('make-admin-table');
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    
                    <td class='admin-items'>${item.user.username}</td>
                    ${
                        item.user.is_staff?
                        `<td><button class='btn btn-secondary'>Is An Admin</button></td>` 
                        :`<td><button class='btn btn-success' onclick='makeAdmin(${item.user.id})'>Make Admin</button></td>`
                    }
                `;
                parent.appendChild(tr);
            });
        });
    }
}



const makeAdmin=(id)=>{
    const token = localStorage.getItem('token');
    fetch(`https://homecrew-backend.onrender.com/client/list/${id}/`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user: {
                is_staff: true
            }
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log('User is now an admin:', data);
        location.reload();
        // You can reload the list or update the UI as needed
    })
    .catch(error => {
        console.error('Error making user admin:', error);
    });
};

loadUser();
AllUser();