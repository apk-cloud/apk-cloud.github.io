// Slug তৈরির ফংশন (সব সময় উপরে রাখা ভালো)
function createSlug(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/g, '');
}

// 1. Get 'id' parameter from URL query string
const urlParams = new URLSearchParams(window.location.search);
const appId = urlParams.get('id');

// Multiple JSON file array
const jsonFiles = [
    './json/games/action.json',
    './json/games/adventure.json',
    './json/games/board.json',
    './json/games/card.json',
    './json/games/educational.json',
    './json/games/family.json',
    './json/games/racing.json',
    './json/games/simulation.json',
    './json/games/sports.json',
    './json/apps/art-and-design.json',
    './json/apps/auto-and-vehicles.json',
    './json/apps/business.json',
    './json/apps/communication.json',
    './json/apps/dating.json',
    './json/apps/entertainment.json',
    './json/apps/finance.json',
    './json/apps/food-and-drink.json',
    './json/apps/medical.json',
    './json/apps/photography.json',
    './json/apps/shopping.json',
    './json/apps/social.json',
    './json/apps/travel-and-local.json',
    './json/apps/video-players-and-editors.json',
    './json/apps/weather.json'
];

// 2. Fetch multiple JSON files using Promise.all
Promise.all(jsonFiles.map(file => fetch(file).then(res => {
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    return res.json();
})))
.then(allDataArray => {
    // Shob JSON file er data single array-te combine kora
    const combinedData = allDataArray.flat();

    // Find matching app by ID
    const app = combinedData.find(item => item.id === appId);

    if (app) {
        // Update document title dynamically
        document.title = `${app.app_name} APK Download for Android`;

        // Render dynamic content
        document.getElementById('app-container').innerHTML = `
            <!-- Main Card -->
            <div class="card-main">
                <div class="row align-items-center">
                    <div class="col-md-7 d-flex align-items-center mb-3 mb-md-0">
                        <img class="app-icon-img me-3" src="${app.logo_url || 'https://via.placeholder.com/88'}" alt="${app.app_name}">
                        <div>
                            <h1 class="app-title">${app.app_name}</h1>
                            <div class="app-developer">${app.company_name || 'Unknown Developer'}</div>
                            <div class="app-version">v${app.version || '1.0.0'}</div>
                        </div>
                    </div>
                    <div class="col-md-5 text-md-end">
                        <a href="${app.download_url || '#'}" class="btn-apk-primary w-100 mb-2">
                            Download APK <i class="fa-solid fa-download"></i>
                        </a>
                        <a href="https://asiafilm.org/4/1f06ef4f16448d7397534363224d9253" class="btn-telegram w-100 mb-1">
                            Request APK on Telegram <i class="fa-paper-plane fa-solid text-info"></i>
                        </a>
                        <div class="text-center text-md-end">
                            <a href="https://asiafilm.org/4/1f06ef4f16448d7397534363224d9253" class="install-link">How to install XAPK / APK file
                                <i class="fa-solid fa-arrow-up-right-from-square ms-1" style="font-size: 10px;"></i>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Stats Bar -->
                <div class="stats-divider"></div>
                <div class="row g-0 d-flex align-items-center">
                    <div class="col stat-item">
                        <div class="stat-value">${app.rating || '4.5'} <i class="fa-solid fa-star text-warning" style="font-size: 12px;"></i></div>
                        
                    </div>
                    <div class="col stat-item">
                        <div class="stat-value text-success"><i class="fa-solid fa-circle-check"></i></div>
                        <div class="stat-label">Verified</div>
                    </div>
                    <div class="col stat-item">
                        <div class="stat-value"><span class="border px-1 rounded" style="font-size: 11px;">T</span></div>
                        <div class="stat-label">Teen</div>
                    </div>
                    <div class="col stat-item">
                        <div class="stat-value">
                            <img src="https://apkpure.com/static-2/assets/svg/common.stack-6cb1fb88.svg#icon-ratting-everyone" alt="E" class="e-image">
                        </div>
                        <div class="stat-label">Everyone</div>
                    </div>
                </div>
            </div>

            <!-- Ad Placeholder -->
            

            <!-- About Section -->
            <div class="card-main">
                <h2 class="section-title">About ${app.app_name}</h2>
                <div class="about-text">
                    <p>${app.description || 'Enjoy seamless performance, updated features, and exclusive gameplay or app tools.'}</p>
                </div>
            </div>

            <!-- Game Information Table -->
            <div class="card-main">
                <h2 class="section-title">Additional Game Information</h2>
                <div class="info-table">
                    <div class="info-row">
                        <div class="info-cell">
                            <div class="info-label">Latest Version</div>
                            <div class="info-val">${app.version || '1.0.0'}</div>
                        </div>
                        <div class="info-cell">
                            <div class="info-label">File Size</div>
                            <div class="info-val">${app.size || '23.9 MB'}</div>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-cell">
                            <div class="info-label">Requires Android</div>
                            <div class="info-val">${app.android_version || 'Android 5.0+'}</div>
                        </div>
                        <div class="info-cell">
                            <div class="info-label">License Required</div>
                            <div class="info-val"><i class="fa-brands fa-google-play text-success me-1"></i> Google Play</div>
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-cell">
                            <div class="info-label">Category</div>
                            <div class="info-val">
                                <a href="${['Action','Adventure','Board','Card','Educational','Racing','Simulation','Sports','Family'].includes(app.category) ? `games/category.html?category=${createSlug(app.category).replace(/_/g, '-')}` : `apps/category.html?category=${createSlug(app.category).replace(/_/g, '-')}`}" class="info-link">${app.category}</a>
                            </div>
                        </div>
                        <div class="info-cell">
                            <div class="info-label">Packege Name</div>
                            <div class="info-val">${app.id}</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- What's New Section -->
            <div class="card-main mb-0">
                <h2 class="section-title">What's New in the Latest Version ${app.version}</h2>
                <p>${app.whats_new}</p>
                <a href="${app.url || '#'}" class="btn-apk-primary px-4">
                    Download APK <i class="fa-solid fa-download"></i>
                </a>
            </div>
        `;
    } else {
        renderErrorState('App Not Found', 'The requested application could not be found or has been removed.');
    }
})
.catch(error => {
    console.error('Error loading JSON data:', error);
    renderErrorState('Data Load Error', 'Unable to retrieve app information. Please check your network connection.');
});

function renderErrorState(title, message) {
    document.getElementById('app-container').innerHTML = `
        <div class="card-main text-center py-5">
            <i class="fa-solid fa-triangle-exclamation text-warning mb-3" style="font-size: 48px;"></i>
            <h3 class="fw-bold">${title}</h3>
            <p class="text-muted mb-4">${message}</p>
            <a href="index.html" class="btn-apk-primary">Back to Home</a>
        </div>
    `;
}
