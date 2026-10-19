# Portfolio de Sophie Bluel, architecte d'intérieur

Site vitrine avec une galerie de projets. Projet 6 du parcours Intégrateur web
d'OpenClassrooms.

## Fonctionnalités

- Galerie des projets chargée depuis l'API
- Filtres par catégorie
- Page de connexion
- Mode édition et déconnexion

## Lancer le projet

Prérequis : Node.js.

1. Backend, dans un terminal :

   ```bash
   cd Backend
   npm install
   npm start
   ```

   L'API répond sur `http://localhost:5678/api` (documentation Swagger sur
   `http://localhost:5678/api-docs`).

2. Front : servir le dossier `FrontEnd` avec un serveur local (par exemple
   l'extension Live Server de VS Code), puis ouvrir `index.html`.

Compte de test : `sophie.bluel@test.tld` / `S0phie`.

## Organisation du JavaScript

Modules ES rangés par rôle, dans `FrontEnd/assets/js/` :

| Dossier | Rôle |
|---|---|
| `pages/` | point d'entrée de chaque page : `home.js` (index.html), `login.js` (login.html) |
| `config/` | adresses de l'API |
| `common/` | appels à l'API (`http.js`) et données partagées (`works.js`, `categories.js`) |
| `gallery/` | galerie des projets et filtres par catégorie |
| `auth/` | connexion, token et déconnexion |
