const showNavItems=()=>{
    const token = localStorage.getItem('token');
    const container = document.querySelector('.login-ul');
    if(token){
        container.innerHTML +=
        `   <li class="login-li"><a href="index.html" class="nav-anchor">Home</a></li>
            <li class="login-li"><a href="serviceDetails.html" class="nav-anchor">Servcies</a></li>
            <div class="dropdown dropdown-reform" >
                <button class="btn btn-secondary dropdown-toggle dropdown-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Profile
                    </button>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="editProfile.html">Edit Profile</a></li>
                    <li><a class="dropdown-item" href="order_history.html">Order History</a></li>
                    <li onclick="handleLogOut()"><a class="dropdown-item" href="#">Logout</a></li>
                </ul>
            </div>
        `;
    }
    else{
        container.innerHTML +=
        `   <li class="login-li"><a href="index.html" class="nav-anchor">Home</a></li>
            <li class="login-li"><a href="serviceDetails.html" class="nav-anchor">Servcies</a></li>
            <li class="login-li"><a href="login.html" class="nav-anchor">Login</a></li>
            <li class="login-li"><a href="register.html" class="nav-anchor">Sign Up</a></li>
        `;
    }
}

showNavItems();