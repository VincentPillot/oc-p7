const galleryContenair = document.querySelector('.gallery-filters-contenair');


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

getCategories();