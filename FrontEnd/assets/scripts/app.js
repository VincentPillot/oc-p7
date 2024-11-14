const navBarLogBtn = document.querySelector('.navbar-log-btn > a');


if(sessionStorage.getItem("token")) { 
    navBarLogBtn.innerText = "logout";
    navBarLogBtn.href = "#";

    navBarLogBtn.addEventListener('click', (e) => {
        if(sessionStorage.getItem("token")) {
            e.preventDefault();
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("userId");

            navBarLogBtn.innerText = "login"; 
            navBarLogBtn.setAttribute("href", "./pages/login.html");
        }
    })
} else {
    navBarLogBtn.innerText = "login"; 
    navBarLogBtn.href = "./pages/login.html";
}
