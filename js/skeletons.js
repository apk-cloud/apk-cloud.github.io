window.renderCardSkeletons = function (container, count = 6) {
    if (!container) return;

    container.innerHTML = Array.from({ length: count }, () => `
        <div class="col-lg-4 col-md-6 col-12" aria-hidden="true">
            <div class="card-skeleton">
                <div class="skeleton-block skeleton-app-icon"></div>
                <div class="skeleton-info">
                    <div class="skeleton-block skeleton-line skeleton-line-title"></div>
                    <div class="skeleton-block skeleton-line skeleton-line-subtitle"></div>
                    <div class="skeleton-block skeleton-line skeleton-line-rating"></div>
                </div>
                <div class="skeleton-block skeleton-download d-lg-none"></div>
            </div>
        </div>
    `).join('');
};

window.renderCardMessage = function (container, message) {
    if (!container) return;

    container.innerHTML = `<div class="col-12"><p class="text-danger mb-0">${message}</p></div>`;
};