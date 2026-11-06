document.addEventListener('DOMContentLoaded', () => {
    const searchInputs = document.querySelectorAll('.searchInput');
    
    if (searchInputs.length === 0) return;

    const appCategoriesNames = [
        'art-and-design', 'auto-and-vehicles', 'business', 'communication', 
        'dating', 'entertainment', 'finance', 'food-and-drink', 'medical', 
        'photography', 'shopping', 'social', 'travel-and-local', 
        'video-players-and-editors', 'weather'
    ];

    const gameCategoriesNames = [
        'action', 'adventure', 'board', 'card', 'educational', 
        'family', 'racing', 'simulation', 'sports'
    ];

    let allAppsData = [];
    let isDataReady = false;

    async function loadAllData() {
        try {
            const fetchPromises = [];

            appCategoriesNames.forEach(cat => {
                fetchPromises.push(
                    fetch(`/json/apps/${cat}.json`)
                        .then(res => res.ok ? res.json() : [])
                        .catch(() => [])
                );
            });

            gameCategoriesNames.forEach(cat => {
                fetchPromises.push(
                    fetch(`/json/games/${cat}.json`)
                        .then(res => res.ok ? res.json() : [])
                        .catch(() => [])
                );
            });

            const results = await Promise.all(fetchPromises);
            allAppsData = results.flat();
        }
        catch (error) {
            console.error("Error loading JSON data for search:", error);
        }
    }

    const dataLoading = loadAllData().finally(() => {
        isDataReady = true;
    });

    searchInputs.forEach(searchInput => {
        const parentWrapper = searchInput.closest('.search-box-wrap') || searchInput.parentNode;
        let suggestionsBox = parentWrapper.querySelector('.suggestions-dropdown');

        if (!suggestionsBox) {
            suggestionsBox = document.createElement('div');
            suggestionsBox.className = 'suggestions-dropdown d-none';
            parentWrapper.style.position = 'relative';
            parentWrapper.appendChild(suggestionsBox);
        }

        searchInput.addEventListener('input', async (e) => {
            const query = e.target.value.trim().toLowerCase();

            if (query.length === 0) {
                suggestionsBox.innerHTML = '';
                suggestionsBox.classList.add('d-none');
                return;
            }

            if (!isDataReady) {
                suggestionsBox.innerHTML = '<div class="p-2 text-muted text-center">Loading apps and games...</div>';
                suggestionsBox.classList.remove('d-none');
                await dataLoading;

                if (searchInput.value.trim().toLowerCase() !== query) return;
            }

            const matches = allAppsData
                .filter(item => {
                    const itemName = item.app_name || item.name || '';
                    return itemName.toLowerCase().includes(query);
                })
                .sort((a, b) => {
                    const nameA = (a.app_name || a.name || '').toLowerCase();
                    const nameB = (b.app_name || b.name || '').toLowerCase();

                    if (nameA === query) return -1;
                    if (nameB === query) return 1;

                    const aStartsWith = nameA.startsWith(query);
                    const bStartsWith = nameB.startsWith(query);
                    if (aStartsWith && !bStartsWith) return -1;
                    if (!aStartsWith && bStartsWith) return 1;

                    return nameA.length - nameB.length;
                })
                .slice(0, 8);

            if (matches.length > 0) {
                suggestionsBox.innerHTML = matches.map(item => {
                    const name = item.app_name || item.name || 'Unknown App';
                    const icon = item.logo_url || 'fav-icon.svg';
                    const link = `/details.html?id=${item.id || encodeURIComponent(name)}`;
                    
                    return `
                        <a href="${link}" class="suggestion-item">
                            <img src="${icon}" alt="${name}" onerror="this.src='fav-icon.svg'">
                            <span>${name}</span>
                        </a>
                    `;
                }).join('');

                suggestionsBox.classList.remove('d-none');
            }
            else {
                suggestionsBox.innerHTML = `<div class="p-2 text-muted text-center">No apps or games found</div>`;
                suggestionsBox.classList.remove('d-none');
            }
        });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.classList.add('d-none');
            }
        });
    });
});
