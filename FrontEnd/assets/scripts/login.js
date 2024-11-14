const loginForm = document.querySelector("form");

loginForm.addEventListener("submit", (e) => {
    console.log(e.target[0].value)
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json" // Indique que le corps de la requête est en JSON
        },
        body: JSON.stringify({
            email: e.target[0].value,
            password: e.target[1].value
        })
    })
    e.preventDefault();
});