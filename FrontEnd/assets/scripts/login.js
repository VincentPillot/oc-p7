const loginForm = document.querySelector("form");
const errorMsg = document.querySelector('.form-error-msg ');

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
        })
    }).then(response => {
        if(!response.ok) {
            errorMsg.style.display = "block";
            errorMsg.innerText = "Erreur dans l'indentifiant ou le mot de passe.";
            console.log(response);
            throw new Error("Erreur dans la réponse");
        }
        return response.json();
    }).then(data => {
        console.log("data :", data);
        logIn(200, data);
    }).catch(error => {
        console.error("Erreur lors de la requête :", error);
    });
});


function logIn(status, data) {
    if(status != 200) {
        console.error(status + " : " + data);
    } else {
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("token", data.token);
        window.location.replace("../index.html");
    }
}