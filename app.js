document.addEventListener("DOMContentLoaded", function () {
    fetch('./mods.json')
        .then(response => response.json())
        .then(data => {
            const modContainer = document.getElementById('modContainer');
            const searchInput = document.getElementById('searchInput');

            // Remove existing cards
            modContainer.innerHTML = '';

            // Add cards from the JSON data
            data.mods.forEach(mod => {
                const card = document.createElement('div');
                card.className = 'col-md-11 col-lg-12 col-xl-11';

            const copyRepoLink = (repoLink) => {
            const el = document.createElement('textarea');
            el.value = repoLink;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
};


                card.innerHTML = `
                    <div class="card">
                        <div class="card-body p-4">
                            <h4 class="card-title" style="padding-top: 0px;margin-left: 3px;padding-bottom: 0px;margin-bottom: 2px;margin-top: 0px;padding-left: 112px;">${mod['display-name']}</h4>
                            <p style="padding-left: 108px;margin-top: 3px;margin-bottom: -25px;margin-left: 5px;">Author :&nbsp;</p>
                            <a target="_blank" href="${mod['author-link']}" style="padding-left: 113px;padding-right: 0px;padding-top: 0px;padding-bottom: 0px;margin-top: -23px;margin-bottom: -15px;margin-left: 65px;">
                                <i class="far fa-user" style="font-size: 16px;"></i>&nbsp;${mod.author}&nbsp;
                            </a>
                            <p class="card-text" style="margin-top: 3px;padding-left: 113px;margin-bottom: -35px;padding-bottom: 0px;padding-top: 6px;">${mod.description}</p>
                            <img style="padding-top: 0px;padding-bottom: 0px;margin-bottom: -48px;margin-top: -89px;" src="${mod.icon}" width="100">
                            <div class="mt-3">
                                <a href="${mod['repo-link']}" class="btn btn-primary" target="_blank">View Source</a>
                                <a href="${mod['download-link']}" class="btn btn-success" download target="_blank">Download</a>
                                <a href="#" class="btn btn-success" onclick="copyRepoLink('${mod['repo-link']}')">Copy</a>
                            </div>
                        </div>
                    </div>`;

                modContainer.appendChild(card);
            });

            // Add event listener for search input
            searchInput.addEventListener('input', () => {
                const searchValue = searchInput.value.toLowerCase();

                // Filter mods based on search input
                const filteredMods = data.mods.filter(mod =>
                    mod['display-name'].toLowerCase().includes(searchValue) ||
                    mod.description.toLowerCase().includes(searchValue) ||
                    mod['author-link'].toLowerCase().includes(searchValue)
                );

                // Update mod cards based on filtered mods
                modContainer.innerHTML = '';
                filteredMods.forEach(mod => {
                    const card = document.createElement('div');
                    card.className = 'col-md-11 col-lg-12 col-xl-11';

                    card.innerHTML = `
                        <div class="card">
                            <div class="card-body p-4">
                                <h4 class="card-title" style="padding-top: 0px;margin-left: 3px;padding-bottom: 0px;margin-bottom: 2px;margin-top: 0px;padding-left: 112px;">${mod['display-name']}</h4>
                                <p style="padding-left: 108px;margin-top: 3px;margin-bottom: -25px;margin-left: 5px;">Author :&nbsp;</p>
                                <a href="${mod['author-link']}" style="padding-left: 113px;padding-right: 0px;padding-top: 0px;padding-bottom: 0px;margin-top: -23px;margin-bottom: -15px;margin-left: 65px;">
                                    <i class="far fa-user" style="font-size: 16px;"></i>&nbsp;${mod.author}&nbsp;
                                </a>
                                <p class="card-text" style="margin-top: 3px;padding-left: 113px;margin-bottom: -35px;padding-bottom: 0px;padding-top: 6px;">${mod.description}</p>
                                <img style="padding-top: 0px;padding-bottom: 0px;margin-bottom: -48px;margin-top: -89px;" src="${mod.icon}" width="100">
                                <div class="mt-3">
                                    <a href="${mod['repo-link']}" class="btn btn-primary" target="_blank">View Source</a>
                                    <a href="${mod['download-link']}" class="btn btn-success" target="_blank" download>Download</a>
                                </div>
                            </div>
                        </div>`;

                    modContainer.appendChild(card);
                });
            });
        })
        .catch(error => console.error('Error fetching mods.json:', error));
});
