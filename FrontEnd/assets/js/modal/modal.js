/* affichage de la modale : ouvrir et fermer */
import { initModalGallery } from './modal-gallery.js';

export function initModal() {
    const modal = document.getElementById('modal');

    /* ouvrir au clic sur "modifier" */
    document.querySelector('[data-js="open-modal"]').addEventListener('click', () => modal.showModal());

    /* fermer : la croix ou le clic sur l'overlay */
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.closest('[data-js="modal-close"]')) {
            modal.close();
        }
    });

    initModalGallery();
}
