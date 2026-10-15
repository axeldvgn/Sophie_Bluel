import { deleteWork, works, categories, refreshWorks, addWork } from "./config.js";
/* éléments de la modale */
const modal = document.getElementById('modal');

/* ouvrir la modale au clic sur "modifier" */
const openButton = document.querySelector('[rel="open-modal"]');
openButton.addEventListener('click', (event) => {
    event.preventDefault();
    modal.showModal();
});

/* fermer : la croix ou le clic sur l'overlay */
modal.addEventListener('click', (event) => {
    if (event.target === modal || 
        event.target.closest('[rel="modal-close"]')) 
        modal.close();
});

/* afficher la galerie */

const modalGallery = document.querySelector('[rel="modal-gallery"]');

function displayModalWorks(works) {
    modalGallery.innerHTML = '';
    works.forEach(work => displayModalWork(work));
}

function displayModalWork(work) {
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;

    const trash = document.createElement('button');
    trash.type = 'button';
    trash.classList.add('modal-delete');
    trash.setAttribute('aria-label', `Supprimer ${work.title}`);
    trash.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    figure.appendChild(img);
    figure.appendChild(trash);
    modalGallery.appendChild(figure);

    trash.addEventListener('click', async () => {
        if (confirm(`Voulez-vous vraiment supprimer "${work.title}" ?`)) {
            if (await deleteWork(work.id)) figure.remove();
        }
    });
}
displayModalWorks(works);


/* ajouter un formulaire pour ajouter une photo */
const addButton = document.querySelector('[rel="modal-add"]');
addButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('[rel="modal-view"]').hidden = true;
    document.querySelector('[rel="modal-form"]').hidden = false;
});

/* flèche retour : revenir à la galerie */
const backButton = document.querySelector('[rel="modal-back"]');
backButton.addEventListener('click', () => {
    document.querySelector('[rel="modal-form"]').hidden = true;
    document.querySelector('[rel="modal-view"]').hidden = false;
});

/* aperçu de la photo choisie */
const imageInput = document.querySelector('#modal-form input[type="file"]');
const uploadZone = imageInput.closest('.upload-zone');

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;
    uploadZone.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    uploadZone.classList.add('image');
    titleInput.value = file.name.replace(/\.[^.]+$/, '');
});

/* remplir la liste des catégories */
const titleInput = document.getElementById('title');
const categorySelect = document.getElementById('category');

function fillCategories(categories) {
    categorySelect.innerHTML = '';
    categorySelect.appendChild(document.createElement('option'));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

fillCategories(categories);

/* bouton "Valider" grisé tant que tout n'est pas rempli */
const modalForm = document.querySelector('[rel="modal-form"]');
const submitButton = modalForm.querySelector('button[type="submit"]');

function checkForm() {
    submitButton.disabled = !(imageInput.files.length && titleInput.value.trim() && categorySelect.value);
}

modalForm.addEventListener('input', checkForm);
modalForm.addEventListener('change', checkForm);

/* soumettre le formulaire */
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const newWork = new FormData();
    newWork.append('image', imageInput.files[0]);
    newWork.append('title', titleInput.value.trim());
    newWork.append('category', categorySelect.value);
    if (addWork(newWork)) {
        refreshWorks();
        modal.close();
    }
});

