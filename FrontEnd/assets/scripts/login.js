import { logingIn } from "./api.js";
const loginForm = document.querySelector("form");
const errorMsg = document.querySelector('.form-error-msg ');

loginForm.addEventListener("submit", (e) => {e.preventDefault(); logIn(e)})



async function logIn(e) {
    let userIds = JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value
    })

    let loginInfos = await logingIn(userIds);

    if(loginInfos.success) {
        localStorage.setItem("userId", loginInfos.data.userId);
        localStorage.setItem("token", loginInfos.data.token);
        window.location.replace("../index.html");
    }
    else {
        errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
        errorMsg.style.display = "block";
    }
    console.log(loginInfos.data)
}