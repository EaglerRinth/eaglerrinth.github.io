window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user');
    if (userId) {
        fetch('author.json')
            .then(response => response.json())
            .then(data => {
                const author = data.authors.find(a => a.id === userId);
                if (author) {
                    displayUserInfo(author);
                    fetchMods(author.mods);
                } else {
                    document.getElementById('user-info').innerHTML = '<p>User not found.</p>';
                }
            });
    } else {
        document.getElementById('user-info').innerHTML = '<p>No user specified.</p>';
    }
};

function displayUserInfo(author) {
    const userInfo = `
        <h1>${author.name}</h1>
        ${author.github ? `<p><a href="../index.html" class="link-light">Back</a></p>
            <p><a href="${author.github}" class="link-light">GitHub Profile</a></p>
            ` : ''}
    `;
    document.getElementById('user-info').innerHTML = userInfo;
}

function fetchMods(modNames) {
    fetch('../mods.json')
        .then(response => response.json())
        .then(data => {
            const mods = data.mods.filter(mod => modNames.includes(mod['mod-name']));
            displayMods(mods);
        });
}

function displayMods(mods) {
    const modContainer = document.getElementById('modContainer');
    mods.forEach(mod => {
        const modCard = `
            <div class="card">
                <img src="${mod.icon}" alt="${mod['display-name']}" class="mod-icon">
                <div class="card-body">
                    <h2 class="card-title">${mod['display-name']}</h2>
                    <p class="card-text">${mod.description}</p>
                    <a href="${mod['download-link']}" class="btn link-light">Download</a>
                </div>
            </div>
        `;
        modContainer.innerHTML += modCard;
    });
}
