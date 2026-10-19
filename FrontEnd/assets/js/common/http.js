/* fonctions fetch utilisées par works.js et categories.js */

/* GET qui renvoie [] en cas d'erreur */
export async function getJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) return [];
        return await response.json();
    } catch (error) {
        console.error('Erreur GET :', error);
        return [];
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
