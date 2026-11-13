const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.candidate-card');
const search = document.querySelector('#candidateSearch');
const empty = document.querySelector('#emptyState');
let activeFilter = 'all';

function updateCards() {
  const term = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach((card) => {
    const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
    const searchMatch = !term || card.dataset.search.includes(term);
    card.hidden = !(categoryMatch && searchMatch);
    if (!card.hidden) visible += 1;
  });
  empty.hidden = visible !== 0;
}

filters.forEach((button) => button.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  updateCards();
}));

search.addEventListener('input', updateCards);
