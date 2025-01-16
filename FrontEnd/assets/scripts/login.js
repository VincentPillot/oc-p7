import { logingIn } from "./api.js";

const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    logIn(e);
});

async function logIn(e) {
    let email = e.target[0].value.trim();
    let password = e.target[1].value.trim();

    // Vérification que les champs ne sont pas vides
    if (!email || !password) return;

    // Vérification du format de l'email avec un regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return;

    let userIds = JSON.stringify({
        email: email,
        password: password,
    });

    let loginInfos = await logingIn(userIds);

    if (loginInfos.success) {
        localStorage.setItem("userId", loginInfos.data.userId);
        localStorage.setItem("token", loginInfos.data.token);
        window.location.replace("../index.html");
    }
    else {
        errorMsg.innerText = "Erreur dans l’identifiant ou le mot de passe";
        errorMsg.style.display = "block";
    }
}
