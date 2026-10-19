/* travaux : liste partagée + ajout / suppression sur l'API */
import { API } from '../config/config.js';
import { getJson, authFetch } from './http.js';

/* événement envoyé sur document à chaque changement de la liste */
export const WORKS_UPDATED = 'works-updated';

/* chargés une fois au démarrage, puis rechargés par refreshWorks() */
export let works = await getJson(API.works);

/* recharger les travaux et prévenir les galeries qu'elles doivent se redessiner */
export async function refreshWorks() {
    works = await getJson(API.works);
    document.dispatchEvent(new CustomEvent(WORKS_UPDATED));
}

/* formData doit contenir : image, title, category */
export function addWork(formData) {
    return authFetch(API.works, { method: 'POST', body: formData });
}

export function deleteWork(id) {
    return authFetch(`${API.works}/${id}`, { method: 'DELETE' });
}
