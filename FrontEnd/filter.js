const filters = document.querySelectorAll('.filter a');
const figures = document.querySelectorAll('.gallery figure');

filters.forEach(button => {
    button.addEventListener('click', (click) => {
        click.preventDefault();

        filters.forEach(button => button.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;

        figures.forEach(figure => {
            if (filter === 'all' || figure.dataset.category === filter) {
                figure.classList.remove('hidden');
            } else {
                figure.classList.add('hidden');
            }
        });
    });
});
