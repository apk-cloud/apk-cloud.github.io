// ডেটা ফিল্টার ও লেটেস্ট অ্যাপ বের করার হেল্প পারফেক্ট ফাংশন
function getLatestAppFromCategory(dataArray) {
    if (!dataArray || dataArray.length === 0) return null;
    return dataArray.sort((a, b) => new Date(b.update_date || b.date) - new Date(a.update_date || a.date))[0];
}

// জেনেরিক রেন্ডার ফাংশন (কোড রিডাবিলিটি বাড়ানোর জন্য)
function renderAppsToContainer(containerId, appsList) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = appsList.map((app, index) => `
        <div class="col-lg-4 col-md-6 col-12">
            <a href="details.html?id=${app.id}" class="app-card">
                <img src="${app.logo_url || 'https://via.placeholder.com/64'}" alt="${app.app_name}" class="app-icon" loading="${containerId === 'latest-games-grid' && index < 6 ? 'eager' : 'lazy'}" fetchpriority="${containerId === 'latest-games-grid' && index === 0 ? 'high' : 'auto'}" decoding="async">
                <div class="app-info">
                    <h3 class="app-name">${app.app_name}</h3>
                    <p class="app-subtext text-uppercase">${app.company_name || 'Developer'}</p>
                    <p class="app-rating"><i class="fa-solid fa-star"></i>${app.rating || '4.5'}</p>
                </div>
                <button class="btn-download-mobile d-lg-none">Download</button>
            </a>
        </div>
    `).join('');
}

['latest-games-grid', 'latest-apps-grid', 'latest-hot-games-grid', 'latest-hot-apps-grid']
    .forEach(containerId => window.renderCardSkeletons(document.getElementById(containerId)));

// ১. লেটেস্ট গেমস ফেচ করা (৯টি ক্যাটাগরি)
const gameCategoryFiles = [
    './json/games/action.json',
    './json/games/adventure.json',
    './json/games/board.json',
    './json/games/card.json',
    './json/games/educational.json',
    './json/games/racing.json',
    './json/games/simulation.json',
    './json/games/sports.json',
    './json/games/family.json'
];

Promise.all(gameCategoryFiles.map(file => 
    fetch(file).then(res => res.ok ? res.json() : []).catch(() => [])
))
.then(allData => {
    const latestApps = allData.map(getLatestAppFromCategory).filter(Boolean);
    renderAppsToContainer('latest-games-grid', latestApps);
});

// ২. লেটেস্ট অ্যাপস ফেচ করা
const appCategoryFiles = [
    './json/apps/art-and-design.json',
    './json/apps/auto-and-vehicles.json',
    './json/apps/business.json',
    './json/apps/communication.json',
    './json/apps/dating.json',
    './json/apps/entertainment.json',
    './json/apps/finance.json',
    './json/apps/food-and-drink.json',
    './json/apps/photography.json',
    './json/apps/shopping.json',
    './json/apps/social.json',
    './json/apps/video-players-and-editors.json'
];

Promise.all(appCategoryFiles.map(file => 
    fetch(file).then(res => res.ok ? res.json() : []).catch(() => [])
))
.then(allData => {
    const latestApps = allData.map(getLatestAppFromCategory).filter(Boolean);
    renderAppsToContainer('latest-apps-grid', latestApps);
});

// ৩. হট গেমস ফেচ করা
fetch('./json/games/hot-games.json')
    .then(res => res.ok ? res.json() : [])
    .then(data => renderAppsToContainer('latest-hot-games-grid', data))
    .catch(err => {
        console.error('Hot games error:', err);
        window.renderCardMessage(document.getElementById('latest-hot-games-grid'), 'Failed to load games.');
    });

// ৪. হট অ্যাপস ফেচ করা
fetch('./json/apps/hot-apps.json')
    .then(res => res.ok ? res.json() : [])
    .then(data => renderAppsToContainer('latest-hot-apps-grid', data))
    .catch(err => {
        console.error('Hot apps error:', err);
        window.renderCardMessage(document.getElementById('latest-hot-apps-grid'), 'Failed to load apps.');
    });
