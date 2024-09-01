const handleLogOut =()=>{
    const user_id = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    fetch(`https://homecrew-backend.onrender.com/client/logout/`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = 'login.html';
    }
)};