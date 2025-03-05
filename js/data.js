// Global albums array to store all albums for filtering
let allAlbums = [];

// Function to fetch data from Google Sheets
async function fetchVinylData() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const albumsGrid = document.getElementById('albums-grid');
    const counter = document.getElementById('counter');
    
    try {
        // REPLACE THIS URL WITH YOUR OWN PERSONAL VINYL COLLECTION GOOGLE SHEET
        // MAKE SURE TO GO FILE > SHARE > PUBLISH TO WEB > ENTIRE DOCUMENT & CSV
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQY3A57SUa4yjeK-Sto5JRK2krLUxwROG-Qd4EjDriAwlhaDYljdom9jrUqDKRUCpXiAmdLKmFqwHFa/pub?output=csv';
        
        // Fetch the CSV data
        const response = await fetch(sheetUrl);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        
        const csvText = await response.text();
        console.log("CSV data received, length:", csvText.length);
        
        // Parse CSV manually
        const rows = csvText.split('\n');
        const headers = parseCSVRow(rows[0]);
        console.log("Headers:", headers);
        
        const albums = [];
        
        // Parse each row
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].trim() === '') continue;
            
            const values = parseCSVRow(rows[i]);
            if (values.length < 3) continue; // Need at least title, artist, year
            
            const album = {};
            
            // Map values to object properties
            headers.forEach((header, index) => {
                let value = index < values.length ? values[index] : '';
                
                // Handle missing or empty values
                value = value.trim();
                
                // Convert "true"/"false" strings to booleans
                if (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes') {
                    value = true;
                } else if (value.toLowerCase() === 'false' || value.toLowerCase() === 'no') {
                    value = false;
                }
                
                // Convert numeric strings to numbers
                if (header.toLowerCase() === 'year' && !isNaN(value)) {
                    value = parseInt(value, 10);
                }
                
                // Store in lowercase to standardize property access
                album[header.toLowerCase()] = value;
            });
            
            albums.push(album);
        }
        
        console.log(`Parsed ${albums.length} albums`);
        if (albums.length > 0) {
            console.log("Sample album:", albums[0]);
            
            // Debug: Log all property names from the first album
            console.log("All property names in first album:", Object.keys(albums[0]));
            
            // Check specifically for Spotify URL
            console.log("Spotify URL property check:", {
                spotifyurl: albums[0].spotifyurl,
                spotifyURL: albums[0].spotifyURL,
                spotifyurl_lowercase: albums[0].spotifyurl
            });
        }
        
        // Store albums globally for filtering
        allAlbums = albums;
        
        // Set up filter options
        setupFilters(albums);
        
        // Display albums
        displayAlbums(albums);
        
        // Hide loading state, show content
        loading.style.display = 'none';
        albumsGrid.style.display = 'grid';
        counter.style.display = 'block';
        counter.textContent = `Showing ${albums.length} records`;
        
        // Show filters after loading data
        filterToggle.style.display = 'flex';
        
    } catch (err) {
        console.error('Error fetching vinyl data:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = `Error: ${err.message}. Please try again later.`;
    }
}

// Helper function to parse CSV row properly
function parseCSVRow(row) {
    const values = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            values.push(currentValue);
            currentValue = '';
        } else {
            currentValue += char;
        }
    }
    
    // Push the last value
    values.push(currentValue);
    
    // Clean up values (remove surrounding quotes)
    return values.map(value => {
        value = value.trim();
        return value.replace(/^\"|\"$/g, '');
    });
}

// Helper function for fetch with retry
function fetchWithRetry(url, retries = 3, timeout = 3000) {
    return new Promise((resolve, reject) => {
        const fetchWithTimeout = () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);
            
            fetch(url, { signal: controller.signal })
                .then(response => {
                    clearTimeout(timeoutId);
                    return response.json();
                })
                .then(resolve)
                .catch(error => {
                    clearTimeout(timeoutId);
                    if (retries === 0) return reject(error);
                    setTimeout(() => {
                        fetchWithRetry(url, retries - 1, timeout).then(resolve).catch(reject);
                    }, 1000);
                });
        };
        
        fetchWithTimeout();
    });
}
