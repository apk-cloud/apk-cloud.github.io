const categories = {
    'art-and-design': 'Art & Design',
    'auto-and-vehicles': 'Auto & Vehicles',
    business: 'Business',
    communication: 'Communication',
    dating: 'Dating',
    entertainment: 'Entertainment',
    finance: 'Finance',
    'food-and-drink': 'Food & Drink',
    medical: 'Medical',
    photography: 'Photography',
    shopping: 'Shopping',
    social: 'Social',
    'travel-and-local': 'Travel & Local',
    'video-players-and-editors': 'Video Players & Editors',
    weather: 'Weather'
};

const category = new URLSearchParams(window.location.search).get('category');
const categoryName = Object.prototype.hasOwnProperty.call(categories, category) ? categories[category] : null;
const heading = document.getElementById('category-heading');
const appContainer = document.getElementById('app-list-container');

if (!categoryName) {
    heading.textContent = 'Category not found';
    document.title = 'Category not found - APKCloud';
    appContainer.innerHTML = '<p class="text-muted">The requested app category does not exist.</p>';
} else {
    heading.textContent = `Latest ${categoryName} Apps`;
    document.title = `${categoryName} Apps - APKCloud`;
    window.renderCardSkeletons(appContainer);

    fetch(`/json/apps/${category}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load category data.');
            }
            return response.json();
        })
        .then(apps => {
            if (!Array.isArray(apps) || apps.length === 0) {
                appContainer.innerHTML = '<p class="text-muted">No apps found in this category.</p>';
                return;
            }

            appContainer.innerHTML = apps.map((app, index) => `
                <div class="col-lg-4 col-md-6 col-12">
                    <a href="/details.html?id=${encodeURIComponent(app.id)}" class="app-card">
                        <img src="${app.logo_url || ''}" alt="${app.app_name || ''}" class="app-icon" loading="${index < 6 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'auto'}" decoding="async">
                        <div class="app-info">
                            <h3 class="app-name">${app.app_name || ''}</h3>
                            <p class="app-subtext text-uppercase">${app.company_name || ''}</p>
                            <p class="app-rating"><i class="fa-solid fa-star"></i> ${app.rating || ''}</p>
                        </div>
                        <span class="btn-download-mobile d-lg-none">Download</span>
                    </a>
                </div>
            `).join('');
        })
        .catch(error => {
            console.error('Error loading app category:', error);
            appContainer.innerHTML = '<p class="text-danger">Failed to load apps data.</p>';
        });
}