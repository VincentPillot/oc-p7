let token = localStorage.getItem("token");

//Connexion
export async function logingIn(userIds) {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: userIds // Les données doivent être déjà sous forme de JSON.stringify
        });

        // Si la réponse n'est pas ok, on lance une erreur
        if (!response.ok) {
            throw new Error("Erreur dans la réponse");
        }

        // Retourne les données JSON après avoir vérifié la réponse
        const data = await response.json();
        return {success: true, data};
    } catch (error) {
        console.error("Erreur lors de la requête :", error);
        return {success: false, data: null};
    }
}

//Récupére tous les projets
export async function getAllWorks() {
    const url = "http://localhost:5678/api/works";

    try {
        const response = await fetch(url); 

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des projets");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des projets :", error.message);
        throw error;
    }
}


//Permet de supprimer un projet
export async function deleteWork(id) {
    if (token) {
        try {
            const response = await fetch(`http://localhost:5678/api/works/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la suppression");
            }
            return response; // Retourne la réponse si tout s'est bien passé
        } catch (error) {
            console.error("Une erreur est survenue :", error);
            throw error; // Propager l'erreur pour qu'elle soit gérée ailleurs
        }
    }
}

//Créer un projet
export async function createWork(data) {
    if(token) {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: data
        }) 
    } 
}