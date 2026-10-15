import { works, categories } from "./config.js";

const filterList = document.querySelector('[rel="filter"]');
const gallery = document.querySelector('[rel="gallery"]');

function displayWorks(works) {
    gallery.innerHTML = '';
    works.forEach(work => displayWork(work));
}

function displayWork(work) {

    const title = work.title;
    const imageUrl = work.imageUrl;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = title;

    const caption = document.createElement('figcaption');
    caption.textContent = title;

    const figure = document.createElement('figure');
    figure.title = title;
    figure.appendChild(img);
    figure.appendChild(caption);
    gallery.appendChild(figure);
}

/* créer un bouton de filtre */
function createFilterButton(name, categoryId, works) {
    const li = document.createElement('li');
    const button = document.createElement('a');

    button.href = '#';
    button.textContent = name;

    button.addEventListener('click', (event) => {
        event.preventDefault();

        document.querySelectorAll('.filter a').forEach(a => a.classList.remove('active'));
        button.classList.add('active');

        if (categoryId === 'all') {
            displayWorks(works);
        } else {
            const filtered = works.filter(work => work.categoryId === categoryId);
            displayWorks(filtered);
        }
    });

    li.appendChild(button);
    filterList.appendChild(li);
    return button;
}

/* afficher tous les filtres */
function displayFilters(categories, works) {
    const allButton = createFilterButton('Tous', 'all', works);
    allButton.classList.add('active');

    categories.forEach(category => {
        createFilterButton(category.name, category.id, works);
    });
}

displayWorks(works);
displayFilters(categories, works);