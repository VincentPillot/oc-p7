import { getAllWorks } from "./api.js";
// createProjects(getAllWorks());


const galleryContenair = document.querySelector('.gallery-filters-contenair');
const projectsContenair = document.querySelector('.gallery')


//Récupérer toute les catégories
async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ('Status de la réponse : ' + response.status);
        }

        const json = await response.json();
        createFilters(json);
    } catch (error) {
        console.error("Une erreur es survenue : " + error.message);
    }
}


//Création des boutons de filtre pour chaques catégorie
function createFilters(categories) {
    //Creation du bouton "Tous"
    let button = document.createElement('button');
    button.classList.add('gallery-filter');
    button.classList.add('selected-filter');
    button.innerText = "Tous";
    button.setAttribute("data-categorie-id", "-1")
    galleryContenair.appendChild(button);

    button.addEventListener("click", (event) => filter(event, button.getAttribute("data-categorie-id")));

    for(let i=0; i < categories.length; i++) {
        let button = document.createElement('button');
        button.classList.add('gallery-filter');
        button.innerText = categories[i].name;
        button.setAttribute("data-categorie-id", categories[i].id);

        galleryContenair.appendChild(button);
        button.addEventListener("click", (event) => filter(event, categories[i].id));
    }
}

//Creation et affichage de tous les projets
export async function createProjects() {
    projectsContenair.innerHTML = "";
    let projects = await getAllWorks(); //Récupération des projets depuis le fichier api.js
    
    for(let i=0; i < projects.length; i++) {
        const figure = document.createElement("figure");  
        figure.setAttribute('data-categorie', projects[i].category.name);
        figure.setAttribute('data-categorie-id', projects[i].categoryId)
        figure.classList.add('gallery-project');

        const img = document.createElement('img');
        img.src = projects[i].imageUrl;

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = projects[i].title;

        projectsContenair.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
};

//Filtre les projets de la galerie lors du clic sur un bouton de filtre
function filter(event, filter) {
    let galleryProjects = document.querySelectorAll('.gallery-project');
    document.querySelector('.selected-filter').classList.remove('selected-filter'); //On retire le style de selection du bouton de filtre selectionner actuellement

    if(filter >= 0) { //Si l'id du filtre n'es pas -1 alors on affiche les projets correspondant au filtre, sinon on affiche tous les projets
        event.target.classList.add('selected-filter'); //On ajoute la class selected-filter au bouton ciblé lors du clic afin de lui appliquer le bon style

        for(let i =0; i < galleryProjects.length; i++) { //On désaffiche tous les projets 
            galleryProjects[i].style.display = "none";
        }

        let filtredGalleryProjects = document.querySelectorAll('figure[data-categorie-id="' + filter + '"]'); //On affiche uniquement les projets qui contienne le data id correspondant au filtre
        for(let i =0; i < filtredGalleryProjects.length; i++) {
            filtredGalleryProjects[i].style.display = "block";
        }
    } else {
        document.querySelector('button[data-categorie-id="-1"]').classList.add('selected-filter'); //Affiche tous les projets

        for(let i =0; i < galleryProjects.length; i++) {
            galleryProjects[i].style.display = "block";
        }
    }
}

getCategories();
createProjects();