/* galerie principale de la page d'accueil */

export function displayWorks(works) {
    const gallery = document.querySelector('[data-js="gallery"]');

    gallery.innerHTML = '';
    works.forEach(work => gallery.appendChild(createWorkFigure(work)));
}

/* message à la place de la galerie (ex. API éteinte) */
export function displayGalleryError(message) {
    const gallery = document.querySelector('[data-js="gallery"]');
    const error = document.createElement('p');

    error.className = 'gallery-error';
    error.setAttribute('role', 'alert');
    error.textContent = message;
    gallery.replaceChildren(error);
}

/* image d'un travail (utilisée aussi par la galerie de la modale) */
export function createWorkImage(work) {
    const img = document.createElement('img');
    img.src = work.imageUrl;
    img.alt = work.title;
    return img;
}

/* créer la figure d'un travail (image + titre) */
function createWorkFigure(work) {
    const caption = document.createElement('figcaption');
    caption.textContent = work.title;

    const figure = document.createElement('figure');
    figure.title = work.title;
    figure.appendChild(createWorkImage(work));
    figure.appendChild(caption);
    return figure;
}
