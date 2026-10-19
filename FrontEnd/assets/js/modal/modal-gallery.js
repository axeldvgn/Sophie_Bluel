/* miniatures dans la modale */
import { works, WORKS_UPDATED } from '../common/works.js';
import { createWorkImage } from '../gallery/gallery.js';
import { createDeleteButton } from './modal-delete.js';

function displayModalWorks(works) {
    const modalGallery = document.querySelector('[data-js="modal-gallery"]');

    modalGallery.innerHTML = '';
    works.forEach(work => modalGallery.appendChild(createModalFigure(work)));
}

/* créer une miniature (image + bouton corbeille) */
function createModalFigure(work) {
    const figure = document.createElement('figure');
    figure.appendChild(createWorkImage(work));
    figure.appendChild(createDeleteButton(work));
    return figure;
}

export function initModalGallery() {
    displayModalWorks(works);

    document.addEventListener(WORKS_UPDATED, () => displayModalWorks(works));
}
