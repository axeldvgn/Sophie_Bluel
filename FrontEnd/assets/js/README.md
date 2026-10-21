# JavaScript du front

Modules ES (`<script type="module">`), sans framework ni dépendance. Chaque page
HTML charge un seul fichier d'entrée dans `pages/`, qui importe le reste.

## Dossiers

| Dossier | Fichier | Rôle |
|---|---|---|
| `pages/` | `home.js` | point d'entrée de `index.html` : galerie, filtres, mode édition, message si l'API ne répond pas |
| | `login.js` | point d'entrée de `login.html` : formulaire de connexion, bouton Afficher / Cacher du mot de passe |
| `config/` | `config.js` | adresses de l'API (un seul endroit à modifier si le serveur change) |
| `common/` | `http.js` | fonctions `fetch` : `getJson`, `postJson`, `authFetch` (ajoute le token, déconnecte sur 401) |
| | `works.js` | liste des travaux partagée, ajout et suppression, événement `works-updated` |
| | `categories.js` | liste des catégories, chargée une seule fois |
| `gallery/` | `gallery.js` | affichage de la galerie principale (et image réutilisée par la modale) |
| | `filters.js` | boutons de filtre par catégorie |
| `auth/` | `token.js` | lecture, sauvegarde et suppression du token ; vérifie son expiration |
| | `login.js` | envoi des identifiants et message d'erreur |
| | `logout.js` | déconnexion et lien « logout » du menu |
| `modal/` | `modal.js` | ouverture, fermeture et changement de vue de la modale |
| | `modal-gallery.js` | miniatures de la modale |
| | `modal-delete.js` | bouton corbeille et suppression |
| | `modal-form.js` | formulaire « Ajout photo » : aperçu, validation, envoi |

## Fonctionnement

- **Chargement des données** : `works.js` et `categories.js` appellent l'API
  au chargement du module (`await` au premier niveau). Les pages qui les
  importent attendent donc que les données soient là.
- **API éteinte** : `getJson` renvoie `null` si la requête échoue.
  `works.js` expose alors `worksUnavailable = true` et la page d'accueil
  affiche un message à la place de la galerie et des filtres.
- **Mise à jour des galeries** : après un ajout ou une suppression,
  `refreshWorks()` recharge la liste puis envoie l'événement `works-updated`
  sur `document`. La galerie principale et celle de la modale l'écoutent
  pour se redessiner.
- **Connexion** : le token renvoyé par l'API est stocké dans `localStorage`.
  `isLoggedIn()` vérifie qu'il existe et qu'il n'a pas expiré (champ `exp`
  du JWT, 24 h) ; un token expiré est supprimé.
- **Sélection des éléments** : le JavaScript cible le HTML par des attributs
  `data-js="..."`, séparés des classes utilisées par le CSS.
