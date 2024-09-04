document.addEventListener("DOMContentLoaded", function () {
    fetch('./mods.json')
        .then(response => response.json())
        .then(data => {
            const modContainer = document.getElementById('modContainer');
            const searchInput = document.getElementById('searchInput');

            function createCard(mod) {
                const card = document.createElement('div');
                card.className = 'col-md-4 col-lg-4 col-xl-3 mb-4'; 
                card.innerHTML = `
                    <div class="card h-100">
                        <div class="card-body p-4">
                            <div class="d-flex align-items-center">
                                <img src="${mod.icon}" class="mod-icon me-3" alt="${mod['display-name']} Icon">
                                <div>
                                    <h5 class="card-title m-0">${mod['display-name']}</h5>
                                    <p class="card-subtitle text-muted mb-2" >Author: <a href="user/?user=${mod.author}" class="link-light">${mod.author}</a></p>
                                </div>
                            </div>
                            <p class="card-text mt-3">${mod.description}</p>
                        </div>
                        <div class="card-footer">
                            <a href="${mod['repo-link']}" class="btn btn-primary btn-sm" target="_blank">View Source</a>
                            <a href="${mod['download-link']}" class="btn btn-success btn-sm" download target="_blank">Download</a>
                        </div>
                    </div>`;
                
                return card;
            }

            data.mods.forEach(mod => {
                const card = createCard(mod);
                modContainer.appendChild(card);
            });

            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();
                const filteredMods = data.mods.filter(mod =>
                    mod['display-name'].toLowerCase().includes(searchValue) ||
                    mod.description.toLowerCase().includes(searchValue) ||
                    mod.author.toLowerCase().includes(searchValue)
                );

                modContainer.innerHTML = '';
                filteredMods.forEach(mod => {
                    const card = createCard(mod);
                    modContainer.appendChild(card);
                });
            });
        })
        .catch(error => console.error('Error fetching mods.json:', error));
});
