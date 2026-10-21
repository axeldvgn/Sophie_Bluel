/* boutons de filtre par catégorie au-dessus de la galerie */
import { works } from '../common/works.js';
import { displayWorks } from './gallery.js';

function getFilterList() {
    return document.querySelector('[data-js="filter"]');
}

function setActiveButton(button) {
    getFilterList().querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

/* créer un bouton de filtre ; categoryId null = "Tous" */
function createFilterButton(name, categoryId) {
    const listItem = document.createElement('li');
    const button = document.createElement('button');

    button.type = 'button';
    button.textContent = name;

    button.addEventListener('click', () => {
        setActiveButton(button);

        if (categoryId === null) {
            displayWorks(works);
        } else {
            displayWorks(works.filter(work => work.categoryId === categoryId));
        }
    });

    listItem.appendChild(button);
    getFilterList().appendChild(listItem);
    return button;
}

/* afficher tous les filtres */
export function displayFilters(categories) {
    const allButton = createFilterButton('Tous', null);
    allButton.classList.add('active');

    categories.forEach(category => {
        createFilterButton(category.name, category.id);
    });
}

/* remettre le filtre "Tous" actif (après un ajout ou une suppression) */
export function resetFilters() {
    setActiveButton(getFilterList().querySelector('button'));
}