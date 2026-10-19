/* suppression d'un travail depuis la modale */
import { deleteWork, refreshWorks } from '../common/works.js';

/* bouton corbeille : demande confirmation, supprime puis recharge les galeries */
export function createDeleteButton(work) {
    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.classList.add('modal-delete');
    deleteButton.setAttribute('aria-label', `Supprimer ${work.title}`);
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can" aria-hidden="true"></i>';

    deleteButton.addEventListener('click', async () => {
        if (!confirm(`Voulez-vous vraiment supprimer "${work.title}" ?`)) return;
        deleteButton.disabled = true;
        if (await deleteWork(work.id)) {
            await refreshWorks();
        } else {
            alert('La suppression a échoué, réessayez');
            deleteButton.disabled = false;
        }
    });

    return deleteButton;
}
