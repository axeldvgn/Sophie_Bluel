/* travaux : liste partagée + ajout / suppression sur l'API */
import { API } from '../config/config.js';
import { getJson, authFetch } from './http.js';

/* événement envoyé sur document à chaque changement de la liste */
export const WORKS_UPDATED = 'works-updated';

/* chargés une fois au démarrage, puis rechargés par refreshWorks() */
const initialWorks = await getJson(API.works);

/* true si l'API n'a pas répondu au chargement de la page */
export const worksUnavailable = initialWorks === null;
export let works = initialWorks ?? [];

/* recharger les travaux et prévenir les galeries qu'elles doivent se redessiner ;
   si le rechargement échoue, l'ancienne liste est gardée */
export async function refreshWorks() {
    works = await getJson(API.works) ?? works;
    document.dispatchEvent(new CustomEvent(WORKS_UPDATED));
}

/* formData doit contenir : image, title, category */
export function addWork(formData) {
    return authFetch(API.works, { method: 'POST', body: formData });
}

export function deleteWork(id) {
    return authFetch(`${API.works}/${id}`, { method: 'DELETE' });
}
