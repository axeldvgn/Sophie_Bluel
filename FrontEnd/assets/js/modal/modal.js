/* affichage de la modale : ouvrir, fermer, passer de la galerie au formulaire */
import { initModalGallery } from './modal-gallery.js';
import { initModalForm, resetModalForm } from './modal-form.js';

export function initModal() {
    const modal = document.getElementById('modal');
    const galleryView = document.querySelector('[data-js="modal-view"]');
    const formView = document.querySelector('[data-js="modal-form"]');

    /* afficher une vue de la modale et cacher l'autre */
    function showView(viewToShow) {
        [galleryView, formView].forEach(view => view.hidden = view !== viewToShow);
    }

    /* ouvrir au clic sur "modifier", toujours sur la galerie */
    document.querySelector('[data-js="open-modal"]').addEventListener('click', () => {
        showView(galleryView);
        modal.showModal();
    });

    /* fermer : la croix ou le clic sur l'overlay */
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.closest('[data-js="modal-close"]')) {
            modal.close();
        }
    });

    /* à chaque fermeture (croix, overlay, Échap, ajout réussi) : formulaire vidé */
    modal.addEventListener('close', resetModalForm);

    /* bouton "Ajouter une photo" */
    document.querySelector('[data-js="modal-add"]').addEventListener('click', () => showView(formView));

    /* flèche retour : revenir à la galerie */
    document.querySelector('[data-js="modal-back"]').addEventListener('click', () => showView(galleryView));

    initModalGallery();
    initModalForm(() => modal.close());
}
