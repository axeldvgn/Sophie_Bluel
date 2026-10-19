/* déconnexion */
import { removeToken } from './token.js';

/* supprimer le token et quitter la page */
export function logout(redirectUrl = 'login.html') {
    removeToken();
    window.location.href = redirectUrl;
}

/* transformer le lien "login" du menu en "logout" */
export function initLogoutLink() {
    const loginLink = document.getElementById('login-link');

    loginLink.textContent = 'logout';
    loginLink.href = '#';
    loginLink.addEventListener('click', (event) => {
        event.preventDefault();
        logout('index.html');
    });
}
