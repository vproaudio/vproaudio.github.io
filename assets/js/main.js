// Custom JS can go here
console.log("Bootstrap + Jekyll loaded!");

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('setupGuidesSearch');
  const cards = Array.from(document.querySelectorAll('.guide-card-item'));
  const noResults = document.getElementById('setupGuidesNoResults');

  if (!searchInput || cards.length === 0 || !noResults) {
    return;
  }

  const filterGuides = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const haystack = card.dataset.search || '';
      const isVisible = !query || haystack.includes(query);
      card.classList.toggle('d-none', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    noResults.classList.toggle('d-none', visibleCount > 0);
  };

  searchInput.addEventListener('input', filterGuides);
});
