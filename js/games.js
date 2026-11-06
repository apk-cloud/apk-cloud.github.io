// 9-ti category-r JSON file list
const categoryFiles = [
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

['latest-games-grid', 'apps-grid-action', 'apps-grid-adventure', 'apps-grid-simulation']
    .forEach(containerId => window.renderCardSkeletons(document.getElementById(containerId)));

// Date string (e.g. "Oct 7, 2026") compare korar helper function
function getLatestAppFromCategory(dataArray) {
    if (!dataArray || dataArray.length === 0) return null;
    
    // update_date borobor sort kore shobcheye latest item ta newa
    return dataArray.sort((a, b) => new Date(b.update_date || b.date) - new Date(a.update_date || a.date))[0];
}

// Sob 9-ti category file eksathe fetch kora
Promise.all(categoryFiles.map(file => 
    fetch(file)
        .then(res => res.ok ? res.json() : [])
        .catch(err => {
            console.error(`Error loading ${file}:`, err);
            return [];
        })
))
.then(allCategoriesData => {
    // Protyek category-r array theke 1-ti kore latest app pick kora
    const latestNineApps = allCategoriesData
        .map(categoryArray => getLatestAppFromCategory(categoryArray))
        .filter(app => app !== null); // Empty file ba error case filter kora

    const container = document.getElementById('latest-games-grid'); // Apnar HTML ID

    container.innerHTML = latestNineApps.map((app, index) => `
        <div class="col-lg-4 col-md-6 col-12">
            <a href="/details.html?id=${app.id}" class="app-card">
                <img src="${app.logo_url || 'https://via.placeholder.com/64'}" alt="${app.app_name}" class="app-icon" loading="${index < 6 ? 'eager' : 'lazy'}" fetchpriority="${index === 0 ? 'high' : 'auto'}" decoding="async">
                <div class="app-info">
                    <h3 class="app-name">${app.app_name}</h3>
                    <p class="app-subtext text-uppercase">${app.company_name || 'Developer'}</p>
                    <p class="app-rating"><i class="fa-solid fa-star"></i>${app.rating || '4.5'}</p>
                </div>
                <button class="btn-download-mobile d-lg-none">Download</button>
            </a>
        </div>
    `).join('');
})
.catch(error => {
    console.error('Error fetching latest updates:', error);
});


// JSON ফাইল থেকে ডাটা ফেচ করা
fetch('/json/games/action.json') // আপনার প্রয়োজনীয় JSON ফাইলের পাথ দিন
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // প্রথম ৯টি অ্যাপ বেছে নেওয়া হচ্ছে
        const appsToDisplay = data.slice(0, 9);
        const container = document.getElementById('apps-grid-action');

        container.innerHTML = appsToDisplay.map(app => `
            <div class="col-lg-4 col-md-6 col-12">
                <a href="/details.html?id=${app.id}" class="app-card">
                    <img src="${app.logo_url || 'https://via.placeholder.com/64'}" alt="${app.app_name}" class="app-icon" loading="lazy" decoding="async">
                    <div class="app-info">
                        <h3 class="app-name">${app.app_name}</h3>
                        <p class="app-subtext text-uppercase">${app.company_name || 'Developer'}</p>
                        <p class="app-rating"><i class="fa-solid fa-star"></i>${app.rating || '4.5'}</p>
                    </div>
                    <button class="btn-download-mobile d-lg-none">Download</button>
                </a>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error fetching apps:', error);
        window.renderCardMessage(document.getElementById('apps-grid-action'), 'Failed to load games.');
    });


// JSON ফাইল থেকে ডাটা ফেচ করা
fetch('/json/games/adventure.json') // আপনার প্রয়োজনীয় JSON ফাইলের পাথ দিন
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // প্রথম ৯টি অ্যাপ বেছে নেওয়া হচ্ছে
        const appsToDisplay = data.slice(0, 9);
        const container = document.getElementById('apps-grid-adventure');

        container.innerHTML = appsToDisplay.map(app => `
            <div class="col-lg-4 col-md-6 col-12">
                <a href="/details.html?id=${app.id}" class="app-card">
                    <img src="${app.logo_url || 'https://via.placeholder.com/64'}" alt="${app.app_name}" class="app-icon" loading="lazy" decoding="async">
                    <div class="app-info">
                        <h3 class="app-name">${app.app_name}</h3>
                        <p class="app-subtext text-uppercase">${app.company_name || 'Developer'}</p>
                        <p class="app-rating"><i class="fa-solid fa-star"></i>${app.rating || '4.5'}</p>
                    </div>
                    <button class="btn-download-mobile d-lg-none">Download</button>
                </a>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error fetching apps:', error);
        window.renderCardMessage(document.getElementById('apps-grid-adventure'), 'Failed to load games.');
    });


// JSON ফাইল থেকে ডাটা ফেচ করা
fetch('/json/games/simulation.json') // আপনার প্রয়োজনীয় JSON ফাইলের পাথ দিন
    .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    })
    .then(data => {
        // প্রথম ৯টি অ্যাপ বেছে নেওয়া হচ্ছে
        const appsToDisplay = data.slice(0, 9);
        const container = document.getElementById('apps-grid-simulation');

        container.innerHTML = appsToDisplay.map(app => `
            <div class="col-lg-4 col-md-6 col-12">
                <a href="/details.html?id=${app.id}" class="app-card">
                    <img src="${app.logo_url || 'https://via.placeholder.com/64'}" alt="${app.app_name}" class="app-icon" loading="lazy" decoding="async">
                    <div class="app-info">
                        <h3 class="app-name">${app.app_name}</h3>
                        <p class="app-subtext text-uppercase">${app.company_name || 'Developer'}</p>
                        <p class="app-rating"><i class="fa-solid fa-star"></i>${app.rating || '4.5'}</p>
                    </div>
                    <button class="btn-download-mobile d-lg-none">Download</button>
                </a>
            </div>
        `).join('');
    })
    .catch(error => {
        console.error('Error fetching apps:', error);
        window.renderCardMessage(document.getElementById('apps-grid-simulation'), 'Failed to load games.');
    });
