/* interface de la page de connexion (login.html) */
import { initLoginForm } from '../auth/login.js';
import { isLoggedIn } from '../auth/token.js';
import { initLogoutLink } from '../auth/logout.js';

/* bouton "Afficher / Cacher" du mot de passe */
function initPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const toggleButton = document.getElementById('toggle-password');

    toggleButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleButton.textContent = 'Cacher';
        } else {
            passwordInput.type = 'password';
            toggleButton.textContent = 'Afficher';
        }
    });
}

initLoginForm();
initPasswordToggle();
if (isLoggedIn()) initLogoutLink();
