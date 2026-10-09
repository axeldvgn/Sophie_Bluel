import { api } from "./config.js";

/* créer les balises filtre et galerie */
const portfolio = document.getElementById('portfolio');

const filterList = document.createElement('ul');
filterList.classList.add('filter');

const gallery = document.createElement('div');
gallery.classList.add('gallery');

portfolio.appendChild(filterList);
portfolio.appendChild(gallery);


/* récupérer les données de l'API */
async function getWorks() {
    const response = await fetch(`${api}/works`);
    return response.json();
}

async function getCategories() {
    const response = await fetch(`${api}/categories`);
    return response.json();
}

/* afficher la galerie */
function displayWorks(works) {
    gallery.innerHTML = '';

    works.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const titleimg = document.createElement('figcaption');

        img.src = work.imageUrl;
        img.alt = work.title;
        titleimg.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(titleimg);
        gallery.appendChild(figure);
    });
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

/* lancement */
async function init() {
    const works = await getWorks();
    const categories = await getCategories();

    displayWorks(works);
    displayFilters(categories, works);
}

init();