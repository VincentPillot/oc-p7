import {getAllWorks, deleteWork, createWork} from "./api.js";
import { createProjects } from "./gallery.js";

const closeBtn = document.querySelector(".modal-close-btn")
const openModalBtn = document.querySelector(".edit-portfolio-btn");
const modalContenair = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const modalGallery = document.querySelector(".modal-gallery");
const modalGalleryScreen = document.querySelector(".modal-gallery-screen");
const modalAddImgBtn = document.querySelector(".modal-add-img-btn");

const form = document.querySelector(".modal-create-project-form");
const formImg = document.querySelector("#image")
const formTitle = document.querySelector("#title");
const selectCategories = document.querySelector("#category");
const formSubmitBtn = document.querySelector(".submit-btn");


//Create project variable
const modalCreateProjectScreen = document.querySelector(".modal-upload-project-screen");

//Modal open listener
openModalBtn.addEventListener("click", openModal);

//Modal closer listeners
closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

selectCategories.addEventListener("change", checkIfFormIsComplete)
formTitle.addEventListener("input", checkIfFormIsComplete);
formImg.addEventListener("change", checkIfFormIsComplete);

//Call l'api pour créer un projet avec les data du formulaire
form.addEventListener("submit", async function(e){
    e.preventDefault();
    if(checkIfFormIsComplete()) {

        const formData = new FormData(form);
        await createWork(formData);
        form.reset();
        createModalProjects();
        createProjects();
    }
})

modalAddImgBtn.addEventListener("click", nextScreen);

function closeModal() {
    modalContenair.style.display = "none";
    overlay.style.display = "none";
}

function openModal() {
    modalContenair.style.display = "flex";
    overlay.style.display = "block";
}

function checkIfFormIsComplete() {
    if(selectCategories.value !== "-1") {
        if(true) {
            if(formTitle.value.length > 0) {
                formSubmitBtn.classList.add("submit-btn-ready");
                return true;
            }
        }
    }
    formSubmitBtn.classList.remove("submit-btn-ready");
    return false;
}

function nextScreen() {
    if(modalContenair.getAttribute("data-screen") == "gallery") {
        modalGalleryScreen.style.display = "none";
        modalCreateProjectScreen.style.display = "flex";

        modalContenair.setAttribute("data-screen", "form");
    }
}

async function createModalProjects() {
    modalGallery.innerHTML = "";
    let projects = await getAllWorks();
    for(let i =0; i < projects.length; i++) {
        let div = document.createElement("div");
        div.classList.add("modal-gallery-img-contenair");

        let delIcon = document.createElement("i");
        delIcon.classList.add("fa-solid");
        delIcon.classList.add("fa-trash");
        delIcon.setAttribute("aria-hidden", "true");
        delIcon.setAttribute("data-work-id", projects[i].id)
        delIcon.addEventListener("click", () => deleteProject(projects[i].id))

        let img = document.createElement("img");
        img.setAttribute("src", projects[i].imageUrl);
        img.setAttribute("alt", projects[i].title);

        modalGallery.appendChild(div);
        div.appendChild(delIcon);
        div.appendChild(img);  
    }
}
createModalProjects();

async function deleteProject(id) {
    await deleteWork(id);
    await alert("Projet supprimé avec succès");
    createModalProjects();
    createProjects();
}

async function getCategories() {
    const url = "http://localhost:5678/api/categories";
    try {
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error ('Status de la réponse : ' + response.status);
        }

        const json = await response.json();
        createCategoriesOptions(json);
    } catch (error) {
        console.error("Une erreur es survenue : " + error.message);
    }
}

function createCategoriesOptions(data) {
    console.log(data);
    for(let i=0; i < data.length; i++) {
        let option = document.createElement("option");
        option.value = data[i].id;
        option.innerText = data[i].name;

        selectCategories.appendChild(option);
    }
}

getCategories()