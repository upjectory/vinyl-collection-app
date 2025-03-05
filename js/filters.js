// Function to set up filter dropdowns
function setupFilters(albums) {
    // Get unique values for each filter
    const artists = [...new Set(albums.map(album => album.artist).filter(Boolean))].sort();
    const genres = [...new Set(albums.map(album => album.genre).filter(Boolean))].sort();
    const years = [...new Set(albums.map(album => album.year).filter(Boolean))].sort((a, b) => b - a); // Sort years in descending order
    const categories = [...new Set(albums.map(album => album.category).filter(Boolean))].sort();
    
    // Populate artist dropdown
    const artistFilter = document.getElementById('artist-filter');
    artists.forEach(artist => {
        const option = document.createElement('option');
        option.value = artist;
        option.textContent = artist;
        artistFilter.appendChild(option);
    });
    
    // Populate genre dropdown
    const genreFilter = document.getElementById('genre-filter');
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
    
    // Populate year dropdown
    const yearFilter = document.getElementById('year-filter');
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
    
    // Populate category dropdown
    const categoryFilter = document.getElementById('category-filter');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
    
    // Set up event listeners for filters
    document.getElementById('title-filter').addEventListener('input', applyFilters);
    document.getElementById('artist-filter').addEventListener('change', applyFilters);
    document.getElementById('genre-filter').addEventListener('change', applyFilters);
    document.getElementById('year-filter').addEventListener('change', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('reset-filters').addEventListener('click', resetFilters);
}

// Function to apply filters
function applyFilters() {
    const titleFilter = document.getElementById('title-filter').value.toLowerCase();
    const artistFilter = document.getElementById('artist-filter').value;
    const genreFilter = document.getElementById('genre-filter').value;
    const yearFilter = document.getElementById('year-filter').value;
    const categoryFilter = document.getElementById('category-filter').value;
    
    // Filter albums based on selected criteria
    const filteredAlbums = allAlbums.filter(album => {
        return (
            (titleFilter === '' || (album.title && album.title.toLowerCase().includes(titleFilter))) &&
            (artistFilter === '' || album.artist === artistFilter) &&
            (genreFilter === '' || album.genre === genreFilter) &&
            (yearFilter === '' || album.year == yearFilter) && // Use == for string/number comparison
            (categoryFilter === '' || album.category === categoryFilter)
        );
    });
    
    // Display filtered albums
    displayAlbums(filteredAlbums);
    
    // Update counter
    document.getElementById('counter').textContent = `Showing ${filteredAlbums.length} of ${allAlbums.length} records`;
}

// Function to reset filters
function resetFilters() {
    document.getElementById('title-filter').value = '';
    document.getElementById('artist-filter').value = '';
    document.getElementById('genre-filter').value = '';
    document.getElementById('year-filter').value = '';
    document.getElementById('category-filter').value = '';
    
    // Display all albums
    displayAlbums(allAlbums);
    
    // Update counter
    document.getElementById('counter').textContent = `Showing ${allAlbums.length} records`;
}