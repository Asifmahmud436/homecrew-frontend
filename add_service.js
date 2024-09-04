const checkAdmin=()=>{
    const user_id = localStorage.getItem('user_id');
    fetch(`https://homecrew-backend.onrender.com/client/list/${user_id}/`)
        .then((res)=>res.json())
        .then(data =>{
            if(data.user.is_staff){
                add_service(data)
            }
        })
}

const add_service=(data)=>{
    const parent = document.getElementById('add-service');

    const anchor = document.createElement('a');
    anchor.href = 'add_service.html';
    anchor.classList.add('add-service-link');

 
    const btn = document.createElement('button');
    btn.classList.add('add-service-btn');
    btn.innerText = 'Add A Service';


    anchor.appendChild(btn);


    parent.appendChild(anchor);
}



checkAdmin()