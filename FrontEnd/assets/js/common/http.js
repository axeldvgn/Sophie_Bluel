/* fonctions fetch utilisées par works.js */

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
