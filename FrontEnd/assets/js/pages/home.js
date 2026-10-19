/* interface de la page d'accueil (index.html) */
import { works } from '../common/works.js';
import { categories } from '../common/categories.js';
import { displayWorks } from '../gallery/gallery.js';
import { displayFilters } from '../gallery/filters.js';

displayWorks(works);
displayFilters(categories);
