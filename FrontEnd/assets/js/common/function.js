/* fonctions fetch utilisées par works.js, categories.js et auth/login.js */
import { getToken } from '../auth/token.js';
import { logout } from '../auth/logout.js';

/* GET qui renvoie null en cas d'erreur (serveur éteint ou réponse en erreur) */
export async function getJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        return await response.json();
    } catch (error) {
        console.error('Erreur GET :', error);
        return null;
    }
}

/* POST de données JSON ; renvoie { ok, body }, null si le serveur ne répond pas */
export async function postJson(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const body = await response.json().catch(() => null);
        return { ok: response.ok, body };
    } catch (error) {
        console.error('Erreur POST :', error);
        return null;
    }
}

/* ajoute le token, déconnecte si 401 (token expiré) ; renvoie true si la requête a réussi */
export async function authFetch(url, options = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: { ...options.headers, 'Authorization': `Bearer ${getToken()}` }
        });
        if (response.status === 401) logout();
        return response.ok;
    } catch (error) {
        console.error('Erreur requête :', error);
        return false;
    }
}
