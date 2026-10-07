const token = localStorage.getItem('token');
const editBanner = document.getElementById('edit-banner');
const editButton = document.querySelector('.edit-gallery');
const loginLink = document.getElementById('login-link');
const filter = document.querySelector('.filter');

/* passer en mode édition si l'utilisateur est connecté */
if (token) {
    editBanner.hidden = false;
    editButton.hidden = false;
    filter.hidden = true;

    /* transformer "login" en "logout" */
    loginLink.textContent = 'logout';
    loginLink.href = '#';
    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location.href = 'index.html';
    });

}