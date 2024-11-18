const editorModeBanner = document.querySelector('.editor-mode-banner');
const navBarLogBtn = document.querySelector('.navbar-log-btn > a');
const portflioEditBtn = document.querySelector('.edit-portfolio-btn');
const galleryFilter = document.querySelector('.gallery-filters-contenair')

function isUserLoggedHandler() {
    if(sessionStorage.getItem("token")) { 
        //Si l'user es connecter :

        //Ajout du listener pour la déconnexion
        navBarLogBtn.addEventListener('click', (e) => {
            if(sessionStorage.getItem("token")) {
                e.preventDefault();
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userId");

                isUserLoggedHandler();
            }
        })    

        //Affichage de la bannière d'édition
        editorModeBanner.style.display = "flex";

        //Affichage & gestion du bouton de déconnexion
        navBarLogBtn.innerText = "logout";
        navBarLogBtn.href = "#";

        //Affichage du bouton d'edition du portfolio
        portflioEditBtn.style.display = "block";
            
        //Display none des filtres du portfolio
        galleryFilter.style.display = "none"  
    } else {
        //Si l'user n'es pas connecter :

        //On cache la banniere d'edition
        editorModeBanner.style.display = "none";

        //Bouton de login
        navBarLogBtn.innerText = "login"; 
        navBarLogBtn.href = "./pages/login.html";

        //On cache le bouton d'edition du portfolio
        portflioEditBtn.style.display = "none";

        //On affiche les filtres du portfolio
        galleryFilter.style.display = "flex" 
    } 
}

isUserLoggedHandler()
