/* interface de la page d'accueil (index.html) */
import { works, worksUnavailable, WORKS_UPDATED } from '../common/works.js';
import { categories } from '../common/categories.js';
import { isLoggedIn } from '../auth/token.js';
import { initLogoutLink } from '../auth/logout.js';
import { displayWorks, displayGalleryError } from '../gallery/gallery.js';
import { displayFilters, resetFilters } from '../gallery/filters.js';
import { initModal } from '../modal/modal.js';

/* mode édition : bannière et bouton "modifier" visibles, filtres cachés */
function showEditMode() {
    document.getElementById('edit-banner').hidden = false;
    document.querySelector('.edit-gallery').hidden = false;
    document.querySelector('.filter').hidden = true;
}

/* API éteinte : message à la place de la galerie, pas de filtres */
if (worksUnavailable) {
    displayGalleryError('Impossible de charger les projets, réessayez plus tard.');
} else {
    displayWorks(works);
    displayFilters(categories);
}

/* redessiner après un ajout ou une suppression */
document.addEventListener(WORKS_UPDATED, () => {
    displayWorks(works);
    resetFilters();
});

if (isLoggedIn()) {
    showEditMode();
    initLogoutLink();
    initModal();
}
