/* interface de la page d'accueil (index.html) */
import { works } from '../common/works.js';
import { categories } from '../common/categories.js';
import { isLoggedIn } from '../auth/token.js';
import { initLogoutLink } from '../auth/logout.js';
import { displayWorks } from '../gallery/gallery.js';
import { displayFilters } from '../gallery/filters.js';

/* mode édition : bannière et bouton "modifier" visibles, filtres cachés */
function showEditMode() {
    document.getElementById('edit-banner').hidden = false;
    document.querySelector('.edit-gallery').hidden = false;
    document.querySelector('.filter').hidden = true;
}

displayWorks(works);
displayFilters(categories);

if (isLoggedIn()) {
    showEditMode();
    initLogoutLink();
}
