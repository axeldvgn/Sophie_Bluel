/* API éteinte : message d'erreur à la place de la galerie */
import { works, worksUnavailable } from './works.js';
import { categories } from './categories.js';
import { displayWorks } from '../gallery/gallery.js';
import { displayFilters } from '../gallery/filters.js';

/* remplacer le contenu de la galerie par un message */
function displayGalleryError(message) {
    const gallery = document.querySelector('[data-js="gallery"]');
    const error = document.createElement('p');

    error.className = 'gallery-error';
    error.setAttribute('role', 'alert');
    error.textContent = message;
    gallery.replaceChildren(error);
}

/* API éteinte : message à la place de la galerie, pas de filtres */
export function displayGalleryOrError() {
    if (worksUnavailable) {
        displayGalleryError('Impossible de charger les projets, réessayez plus tard.');
    } else {
        displayWorks(works);
        displayFilters(categories);
    }
}
