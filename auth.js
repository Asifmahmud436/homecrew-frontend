const handleReg=(event)=>{
    event.preventDefault();
    const username = getVal('username');
    const first_name = getVal('firstName');
    const last_name = getVal('lastName');
    const email = getVal('email');
    const password = getVal('password');
    const confirm_password = getVal('confirm-password');
    const info = {
            username,
            first_name,
            last_name,
            email,
            password,
            confirm_password,
        };     
    if(password===confirm_password){
        fetch(`https://homecrew-backend.vercel.app/client/register/`,{
            method:'POST',
            headers:{'content-type':'application/json'},
            body:JSON.stringify(info),
        })
            .then((res)=>(res.json()))
            .then((data)=>console.log(data))
        // console.log(itemName,serviceId);
        window.location.href = 'login.html';

    }   
    else{
        document.getElementById('error').innerText = 'Passwords Do Not Match 😢';
    }
};

const getVal=(id)=>{
    const val =  document.getElementById(id).value;
    return val;
};

const handleLogin = (event) => {
    event.preventDefault();
    const username = getVal('username');
    const password = getVal('password');
    const info = {
        username,
        password,
    }
    const errorMessageDiv = document.getElementById('error-message');
    if (errorMessageDiv) {
        errorMessageDiv.textContent = '';
    }
    if (username && password) {
        fetch(`https://homecrew-backend.vercel.app/client/login/`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(info),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.token && data.user_id) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('user_id', data.user_id);
                    window.location.href = 'index.html';
                } else if (data.error) {
                    showErrorMessage(data.error); 
                }
            })
            .catch(error => {
                console.log('Error', error);
                showErrorMessage("An error occurred. Please try again later.");
            });
    }
};


const showErrorMessage =(message)=>{
    const errorMessageDiv = document.getElementById('error-message');
    if(errorMessageDiv){
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.color = 'red';
    }
};