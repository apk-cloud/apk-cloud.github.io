const categories = {
    action: 'Action',
    adventure: 'Adventure',
    board: 'Board',
    card: 'Card',
    educational: 'Educational',
    family: 'Family',
    racing: 'Racing',
    simulation: 'Simulation',
    sports: 'Sports'
};

const category = new URLSearchParams(window.location.search).get('category');
const categoryName = Object.prototype.hasOwnProperty.call(categories, category) ? categories[category] : null;
const heading = document.getElementById('category-heading');
const gameContainer = document.getElementById('game-list-container');

if (!categoryName) {
    heading.textContent = 'Category not found';
    document.title = 'Category not found - APKCloud';
    gameContainer.innerHTML = '<p class="text-muted">The requested game category does not exist.</p>';
} else {
    heading.textContent = `Latest ${categoryName} Games`;
    document.title = `${categoryName} Games - APKCloud`;
    window.renderCardSkeletons(gameContainer);

    fetch(`/json/games/${category}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load category data.');
            }
            return response.json();
        })
        .then(games => {
            if (!Array.isArray(games) || games.length === 0) {
                gameContainer.innerHTML = '<p class="text-muted">No games found in this category.</p>';
                return;
            }

            gameContainer.innerHTML = games.map((game, index) => `
                <div class="col-lg-4 col-md-6 col-12">
                    <a href="/details.html?id=${encodeURIComponent(game.id)}" class="app-card">
                        <img src="${game.logo_url || ''}" alt="${game.app_name || ''}" class="app-icon" loading="${index < 6 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'auto'}" decoding="async">
                        <div class="app-info">
                            <h3 class="app-name">${game.app_name || ''}</h3>
                            <p class="app-subtext text-uppercase">${game.company_name || ''}</p>
                            <p class="app-rating"><i class="fa-solid fa-star"></i> ${game.rating || ''}</p>
                        </div>
                        <span class="btn-download-mobile d-lg-none">Download</span>
                    </a>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading game category:', error);
            gameContainer.innerHTML = '<p class="text-danger">Failed to load games data.</p>';
        });
}