/* gestion du token de connexion stocké dans le navigateur */

export function getToken() {
    return localStorage.getItem('token');
}

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function removeToken() {
    localStorage.removeItem('token');
}

/* lit la date d'expiration (exp, en secondes) dans la 2e partie du JWT */
function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
}

/* connecté si un token existe et n'a pas expiré ; un token expiré est supprimé */
export function isLoggedIn() {
    const token = getToken();
    if (!token) return false;

    if (isTokenExpired(token)) {
        removeToken();
        return false;
    }
    return true;
}