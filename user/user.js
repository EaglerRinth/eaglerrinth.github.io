window.onload = function () {
    fetch('../mods.json')
        .then(response => response.json())
        .then(data => {
            const authors = compileAuthorsFromMods(data.mods);
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('user');

            if (userId) {
                const author = authors.find(a => a.id === userId);
                if (author) {
                    displayUserInfo(author);
                    displayMods(author.mods);
                } else {
                    document.getElementById('user-info').innerHTML = '<p>User not found.</p>';
                }
            } else {
                document.getElementById('user-info').innerHTML = '<p>No user specified.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching mods.json:', error);
            document.getElementById('user-info').innerHTML = '<p>Failed to load user information.</p>';
        });
};

function compileAuthorsFromMods(mods) {
    const authors = {};

    mods.forEach(mod => {
        const authorId = mod.author;
        if (!authors[authorId]) {
            authors[authorId] = {
                id: authorId,
                name: authorId,
                github: mod['author-link'] || '',
                mods: []
            };
        }
        authors[authorId].mods.push(mod);
    });

    return Object.values(authors);
}

function displayUserInfo(author) {
    const userInfo = `
        <h1>${author.name}</h1>
        ${author.github ? `<p><a href="${author.github}" class="link-light">GitHub Profile</a></p>` : ''}
        <p><a href="../index.html" class="link-light">Back</a></p>
    `;
    document.getElementById('user-info').innerHTML = userInfo;
}

function displayMods(mods) {
    const modContainer = document.getElementById('modContainer');
    modContainer.innerHTML = ''; 

    mods.forEach(mod => {
        const modCard = `
            <div class="card">
                <img src="${mod.icon}" alt="${mod['display-name']}" class="mod-icon">
                <div class="card-body">
                    <h2 class="card-title">${mod['display-name']}</h2>
                    <p class="card-text">${mod.description}</p>
                    <p class="card-text">API: ${mod.api}</p>
                    <a href="${mod['download-link']}" class="btn link-light" download>Download</a>
                    ${mod['repo-link'] ? `<a href="${mod['repo-link']}" class="btn link-light">View Source</a>` : ''}
                </div>
            </div>
        `;
        modContainer.innerHTML += modCard;
    });
}
