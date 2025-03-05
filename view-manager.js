// Manages switching between card and table views
class ViewManager {
    constructor(containerId, albums) {
        this.container = document.getElementById(containerId);
        this.albums = albums;
        this.currentView = 'cards';
        this.setupToggleButton();
    }

    setupToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.id = 'view-toggle';
        toggleButton.textContent = 'Switch to Table View';
        toggleButton.addEventListener('click', () => this.toggleView());
        document.body.insertBefore(toggleButton, this.container);
    }

    toggleView() {
        this.currentView = this.currentView === 'cards' ? 'table' : 'cards';
        const toggleButton = document.getElementById('view-toggle');
        toggleButton.textContent = this.currentView === 'cards' 
            ? 'Switch to Table View' 
            : 'Switch to Card View';
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        this[`render${this.currentView.charAt(0).toUpperCase() + this.currentView.slice(1)}View`]();
    }

    renderCardsView() {
        this.albums.forEach(album => {
            const card = document.createElement('div');
            card.className = `album-card ${album.favorite ? 'favorite' : ''}`;
            
            const imageContainer = document.createElement('div');
            imageContainer.className = 'album-image-container';
            
            const image = document.createElement('img');
            image.src = album.artwork;
            image.alt = album.title;
            image.className = 'album-image';
            
            imageContainer.appendChild(image);
            
            // Category tag
            if (album.category) {
                const categoryTag = document.createElement('div');
                categoryTag.className = 'album-category';
                categoryTag.textContent = album.category;
                imageContainer.appendChild(categoryTag);
            }
            
            // EP tag
            if (album.isEP) {
                const epTag = document.createElement('div');
                epTag.className = 'album-ep-tag';
                epTag.textContent = 'EP';
                imageContainer.appendChild(epTag);
            }
            
            // Favorite badge
            if (album.favorite) {
                const favoriteIcon = document.createElement('div');
                favoriteIcon.className = 'album-favorite-badge';
                favoriteIcon.textContent = '★';
                imageContainer.appendChild(favoriteIcon);
            }
            
            card.appendChild(imageContainer);
            
            const info = document.createElement('div');
            info.className = 'album-info';
            
            const title = document.createElement('h3');
            title.className = 'album-title';
            title.textContent = album.title;
            
            const artist = document.createElement('p');
            artist.className = 'album-artist';
            artist.textContent = album.artist;
            
            const meta = document.createElement('div');
            meta.className = 'album-meta';
            
            const year = document.createElement('span');
            year.className = 'album-year';
            year.textContent = album.year;
            
            const genre = document.createElement('span');
            genre.className = 'album-genre';
            genre.textContent = album.genre;
            
            meta.appendChild(year);
            meta.appendChild(genre);
            
            info.appendChild(title);
            info.appendChild(artist);
            info.appendChild(meta);
            
            card.appendChild(info);
            
            this.container.appendChild(card);
        });
    }

    renderTableView() {
        const table = document.createElement('table');
        table.className = 'vinyl-table';
        
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Artwork</th><th>Artist</th><th>Title</th>
                <th>Category</th><th>Genre</th><th>Year</th>
                <th>Favorite</th><th>EP</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        this.albums.forEach(album => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${album.artwork}" class="table-artwork"></td>
                <td>${album.artist}</td>
                <td>${album.title}</td>
                <td>${album.category || 'N/A'}</td>
                <td>${album.genre}</td>
                <td>${album.year}</td>
                <td>${album.favorite ? '★' : '☆'}</td>
                <td>${album.isEP ? 'Yes' : 'No'}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        this.container.appendChild(table);
    }
}

// Initialization
const sheetLoader = new SheetLoader('YOUR_GOOGLE_SHEET_URL');
sheetLoader.fetchCollection().then(albums => {
    const viewManager = new ViewManager('app', albums);
    viewManager.render();
});