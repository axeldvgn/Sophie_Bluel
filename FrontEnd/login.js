/*prend les valeurs du formulaire */
const form = document.getElementById('login');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

/* Fonction de connexion */
async function login(email, password) {
    const response = await fetch('http://localhost:5678/api/users/login', { 
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email, password}) });

    /*gerer les erreurs de connexion */
    if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
    } else {
    alert('Erreur de connexion : ' + response.status);
    }};

