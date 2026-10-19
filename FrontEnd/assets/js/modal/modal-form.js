/* formulaire "Ajout photo" de la modale */
import { addWork, refreshWorks } from '../common/works.js';
import { categories } from '../common/categories.js';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4 Mo
let previewUrl = null;

/* tous les éléments du formulaire, récupérés en un seul endroit */
function getFormFields() {
    const form = document.querySelector('[data-js="modal-form"]');
    const imageInput = form.querySelector('input[type="file"]');

    return {
        form,
        imageInput,
        uploadZone: imageInput.closest('.upload-zone'),
        titleInput: form.querySelector('#title'),
        categorySelect: form.querySelector('#category'),
        submitButton: form.querySelector('button[type="submit"]'),
        errorMessage: form.querySelector('[data-js="form-error"]')
    };
}

function showFormError(message) {
    const { errorMessage } = getFormFields();
    errorMessage.textContent = message;
    errorMessage.hidden = !message;
}

/* remplir la liste des catégories */
function fillCategorySelect(categories) {
    const { categorySelect } = getFormFields();

    categorySelect.innerHTML = '';
    categorySelect.appendChild(document.createElement('option'));

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

/* enlever l'aperçu et libérer la mémoire de l'image */
function clearPreview() {
    const { uploadZone } = getFormFields();

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    uploadZone.style.backgroundImage = '';
    uploadZone.classList.remove('image');
}

/* aperçu de la photo choisie + titre pré-rempli si vide */
function showImagePreview() {
    const { imageInput, uploadZone, titleInput } = getFormFields();
    const file = imageInput.files[0];

    clearPreview();
    showFormError('');
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
        imageInput.value = '';
        showFormError('Image trop lourde : 4 Mo maximum');
        return;
    }

    previewUrl = URL.createObjectURL(file);
    uploadZone.style.backgroundImage = `url(${previewUrl})`;
    uploadZone.classList.add('image');
    if (!titleInput.value.trim()) titleInput.value = file.name.replace(/\.[^.]+$/, '');
}

/* bouton "Valider" grisé tant que tout n'est pas rempli */
function updateSubmitButton() {
    const { imageInput, titleInput, categorySelect, submitButton } = getFormFields();

    const isComplete = imageInput.files.length && titleInput.value.trim() && categorySelect.value;
    submitButton.disabled = !isComplete;
}

/* vider le formulaire (appelé à la fermeture de la modale) */
export function resetModalForm() {
    getFormFields().form.reset();
    clearPreview();
    showFormError('');
    updateSubmitButton();
}

/* envoyer le nouveau travail à l'API ; renvoie true si l'ajout a réussi */
function submitWork() {
    const { imageInput, titleInput, categorySelect } = getFormFields();

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value.trim());
    formData.append('category', categorySelect.value);

    return addWork(formData);
}

/* onSuccess : appelé après un ajout réussi (ex. fermer la modale) */
export function initModalForm(onSuccess) {
    const { form, imageInput, submitButton } = getFormFields();

    fillCategorySelect(categories);

    imageInput.addEventListener('change', showImagePreview);
    form.addEventListener('input', updateSubmitButton);
    form.addEventListener('change', updateSubmitButton);

    /* envoyer le formulaire */
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;

        if (await submitWork()) {
            await refreshWorks();
            onSuccess();
        } else {
            showFormError('L’ajout a échoué, réessayez');
            updateSubmitButton();
        }
    });
}
