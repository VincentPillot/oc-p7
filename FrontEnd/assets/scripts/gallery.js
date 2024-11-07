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
        console.log(json)
        createFilters(json);
    } catch (error) {
        console.error("Une erreur es survenue : " + error.message);
    }
}


//Création des boutons de filtre pour chaques catégorie
function createFilters(categories) {
    for(let i=0; i < categories.length; i++) {
        let button = document.createElement('button');
        button.classList.add('gallery-filter');
        button.innerText = categories[i].name;
        button.setAttribute("data-id", categories[i].id);

        galleryContenair.appendChild(button);
    }
}

//Récupérer tous les projets
async function getProjects() {
    const url = "http://localhost:5678/api/works";
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ('Status de la réponse : ' + response.status);
        }

        const json = await response.json();
        createProjects(json);
        console.log(json);
    } catch (error) {
        console.error("Une erreur es survenue lors de la récupération des projets : " + error.message);
    }
}

//Creation et affichage de tous les projets
function createProjects(projects) {
    for(let i=0; i < projects.length; i++) {
        const figure = document.createElement("figure");  
        figure.setAttribute('data-categorie', projects[i].category.name);

        const img = document.createElement('img');
        img.src = projects[i].imageUrl;

        const figcaption = document.createElement('figcaption');
        figcaption.innerText = projects[i].title;

        projectsContenair.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figcaption);
    }
}

getCategories();
getProjects();