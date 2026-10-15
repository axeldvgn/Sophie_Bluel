const api = 'http://localhost:5678/api';

/* déconnexion */
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

/* vérification erreur get */
async function get(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Erreur GET :', error);
        return [];
    }
}

/* ajoute le token, déconnecte si 401 */
async function authFetch(url, options = {}) {
    const response = await fetch(url, {
        ...options,
        headers: { ...options.headers, 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (response.status === 401) logout();
    return response.ok;
}

/* connexion */

async function postLogin(email, password) {
    try {
        const response = await fetch(`${api}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.error('Erreur connexion :', error);
        return null;
    }
}

/* récupérer/modifier les travaux */

function getWorks() {
    return get(`${api}/works`);
}

function getCategories() {
    return get(`${api}/categories`);
}

function addWork(formData) {
    return authFetch(`${api}/works`, { method: 'POST', body: formData });
}

function deleteWork(id) {
    return authFetch(`${api}/works/${id}`, { method: 'DELETE' });
}

/* chargées une seule fois pour tout le site */
let [works, categories] = await Promise.all([getWorks(), getCategories()]);

/* recharger les travaux après un ajout ou une suppression */
async function refreshWorks() {
    works = await getWorks();
    return works;
}

export { logout, postLogin, addWork, deleteWork, works, categories, refreshWorks };