/* connexion : envoi des identifiants, sauvegarde du token, message d'erreur */
import { API } from '../config/config.js';
import { postJson } from '../common/function.js';
import { saveToken } from './token.js';

function showLoginError(message) {
    let errorMessage = document.getElementById('login-error');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.id = 'login-error';
        errorMessage.setAttribute('role', 'alert');
        document.querySelector('#login input[type="submit"]').before(errorMessage);
    }
    errorMessage.textContent = message;
}

async function login(email, password) {
    const result = await postJson(API.login, { email, password });

    if (result === null) {
        showLoginError('Serveur injoignable, réessayez plus tard');
    } else if (result.ok && result.body?.token) {
        saveToken(result.body.token);
        window.location.href = 'index.html';
    } else {
        showLoginError('Erreur dans l’identifiant ou le mot de passe');
    }
}

/* récupère les valeurs du formulaire à l'envoi */
export function initLoginForm() {
    const form = document.getElementById('login');
    const submitButton = form.querySelector('input[type="submit"]');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        await login(form.email.value.trim(), form.password.value);
        submitButton.disabled = false;
    });
}
