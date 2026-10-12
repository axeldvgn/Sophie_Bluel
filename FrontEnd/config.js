const api = 'http://localhost:5678/api';

/* raccourcis pour appeler l'API */
async function get(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error posting data:', error);
        return null;
    });
}

/* récupérer les données de l'API */
async function getWorks() {
    return await get(`${api}/works`);
}

async function getCategories() {
    return await get(`${api}/categories`);
}

/* connexion */
async function postLogin(email, password) {
    return await post(`${api}/users/login`, { email, password });
}

export { api, get, post, getWorks, getCategories, postLogin };
