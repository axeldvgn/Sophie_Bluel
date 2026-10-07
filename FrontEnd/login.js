/*prend les valeurs du formulaire */
const form = document.getElementById('login');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

/* Fonction de connexion */
import { api } from "./config.js";
async function login(email, password) {
    const connect = await fetch(`${api}/users/login`, { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email, password}) });

    /*gerer les erreurs de connexion */
    if (connect.ok) {
    const data = await connect.json();
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
    } else {
        let errorParagraph = document.getElementById('login-error');
        if (!errorParagraph) {
            errorParagraph = document.createElement('p');
            errorParagraph.id = 'login-error';
            const submitButton = document.querySelector('#login input[type="submit"]');
            submitButton.before(errorParagraph);
        }
        errorParagraph.textContent = 'Erreur dans l’identifiant ou le mot de passe';
    }
}

/* Afficher / cacher le mot de passe */
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('toggle-password');

togglePasswordButton.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordButton.textContent = 'Cacher';
    } else {
        passwordInput.type = 'password';
        togglePasswordButton.textContent = 'Afficher';
    }
});