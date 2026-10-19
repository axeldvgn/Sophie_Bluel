/* adresses de l'API : un seul endroit à modifier si le serveur change */
const BASE_URL = 'http://localhost:5678/api';

export const API = {
    login: `${BASE_URL}/users/login`,
    works: `${BASE_URL}/works`,
    categories: `${BASE_URL}/categories`
};
