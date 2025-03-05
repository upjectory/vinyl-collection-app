// Setup filter toggle functionality
const filterToggle = document.getElementById('filter-toggle');
const filtersSection = document.getElementById('filters');
const filterToggleIcon = document.getElementById('filter-toggle-icon');
let filtersVisible = false;

function toggleFilters() {
    filtersVisible = !filtersVisible;
    filtersSection.style.display = filtersVisible ? 'block' : 'none';
    filterToggleIcon.classList.toggle('open', filtersVisible);
}

filterToggle.addEventListener('click', toggleFilters);

// Function to safely open Spotify URL in a new tab
function openSpotifyUrl(url) {
    if (url && typeof url === 'string' && url.trim() !== '') {
        // Add https:// if missing
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        // Open in new tab
        window.open(url, '_blank');
        return true;
    }
    return false;
}

// Robust favorite detection function
function isFavorite(favoriteValue) {
    console.log('Checking favorite:', favoriteValue);
    
    if (favoriteValue === null || favoriteValue === undefined) return false;
    
    const normalizedValue = String(favoriteValue).trim().toLowerCase();
    return normalizedValue === 'yes' || normalizedValue === 'true';
}

// Function to detect EP status
function isEP(epValue) {
    console.log('Checking EP status:', epValue);
    
    if (epValue === null || epValue === undefined) return false;
    
    const normalizedValue = String(epValue).trim().toLowerCase();
    return normalizedValue === 'yes' || normalizedValue === 'true';
}

// Function to display albums
function displayAlbums(albums) {
    const albumsGrid = document.getElementById('albums-grid');
    
    // Clear existing albums
    albumsGrid.innerHTML = '';
    
    // Show message if no albums match the filters
    if (albums.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = 'No albums match your filters.';
        albumsGrid.appendChild(noResults);
        return;
    }
    
    // Create album cards
    albums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';
        
        // Add favorite class to highlight favorite albums
        if (isFavorite(album.isfavorite)) {  // Note the lowercase
            card.classList.add('favorite');
        }
        
        const imageContainer = document.createElement('div');
        imageContainer.className = 'album-image-container';
        
        // Make entire card clickable if Spotify URL exists
        let spotifyLink = null;
        for (const key in album) {
            if (key.toLowerCase().includes('spotify')) {
                spotifyLink = album[key];
                break;
            }
        }
        
        if (spotifyLink && spotifyLink.trim() !== '') {
            card.classList.add('spotify-enabled');
            card.dataset.spotifyUrl = spotifyLink;
            card.addEventListener('click', function() {
                const url = this.dataset.spotifyUrl;
                openSpotifyUrl(url);
            });
        }
        
        // Create image element
        const image = document.createElement('img');
        image.className = 'album-image loading';
        image.alt = `${album.title} by ${album.artist}`;
        
        // Handle image loading events
        image.onload = function() {
            image.classList.remove('loading');
        };
        
        // Handle image loading errors
        image.onerror = function() {
            image.classList.remove('loading');
            image.classList.add('error');
            const placeholderText = encodeURIComponent((album.artist || 'Album').substring(0, 10));
            this.src = `https://placehold.co/400x400/121212/FFFFFF?text=${placeholderText}`;
        };
        
        // Generate a placeholder with artist name as initial state
        const placeholderText = encodeURIComponent((album.artist || 'Album').substring(0, 10));
        image.src = `https://placehold.co/400x400/121212/FFFFFF?text=${placeholderText}`;
        
        // Use artwork from spreadsheet or fetch from iTunes API with improved error handling
        if (album.artist && album.title) {
            // First try to use provided artwork URL if it exists
            if (album.artwork && album.artwork.trim() !== '') {
                image.src = album.artwork;
            } else {
                // Try to fetch from iTunes using a more reliable proxy
                const searchTerm = encodeURIComponent(`${album.artist} ${album.title}`);
                
                // Use corsproxy.io instead of allorigins.win
                const proxyUrl = 'https://corsproxy.io/?' + 
                    encodeURIComponent(`https://itunes.apple.com/search?term=${searchTerm}&media=music&entity=album&limit=1`);
                
                // Use fetch with retry logic
                fetchWithRetry(proxyUrl)
                    .then(data => {
                        if (data && data.results && data.results.length > 0) {
                            image.src = data.results[0].artworkUrl100.replace('100x100', '400x400');
                        } else {
                            // Trigger error handler if no results
                            image.onerror();
                        }
                    })
                    .catch(() => {
                        // Trigger error handler on fetch failure
                        image.onerror();
                    });
            }
        }
        
        imageContainer.appendChild(image);
        
        // Add category tag if present
        if (album.category) {
            const category = document.createElement('div');
            category.className = 'album-category';
            category.textContent = album.category;
            imageContainer.appendChild(category);
        }
        
        // Add favorite badge if true
        if (isFavorite(album.isfavorite)) {
            const favorite = document.createElement('div');
            favorite.className = 'album-favorite-badge';
            favorite.innerHTML = '★';
            imageContainer.appendChild(favorite);
        }        

        // Add EP tag if true
        if (isEP(album.isep)) {
            const epTag = document.createElement('div');
            epTag.className = 'album-ep-tag';
            epTag.textContent = 'EP';
            imageContainer.appendChild(epTag);
        }
        
        const info = document.createElement('div');
        info.className = 'album-info';
        
        const title = document.createElement('h3');
        title.className = 'album-title';
        title.textContent = album.title || 'Unknown Title';
        
        const artist = document.createElement('p');
        artist.className = 'album-artist';
        artist.textContent = album.artist || 'Unknown Artist';
        
        const meta = document.createElement('div');
        meta.className = 'album-meta';
        
        // Improved year display with better styling
        const year = document.createElement('span');
        year.className = 'album-year';
        year.textContent = album.year || '';
        
        // Improved genre display with better styling
        const genre = document.createElement('span');
        genre.className = 'album-genre';
        genre.textContent = album.genre || '';
        
        meta.appendChild(year);
        meta.appendChild(genre);
        
        info.appendChild(title);
        info.appendChild(artist);
        info.appendChild(meta);
        
        card.appendChild(imageContainer);
        card.appendChild(info);
        
        albumsGrid.appendChild(card);
    });
}

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Load data when the page loads
document.addEventListener('DOMContentLoaded', fetchVinylData);
