// Handles fetching data from Google Sheets
class SheetLoader {
    constructor(sheetUrl) {
        this.sheetUrl = sheetUrl;
        this.albums = [];
    }

    async fetchCollection() {
        try {
            const response = await fetch(this.sheetUrl);
            const csvText = await response.text();
            const rows = csvText.split('\n').map(row => row.split(','));
            
            // Remove header row
            rows.shift();

            this.albums = rows.map(row => ({
                artist: row[0] || '',
                title: row[1] || '',
                category: row[2] || 'N/A',
                genre: row[3] || '',
                year: row[4] || '',
                favorite: row[5] === 'Yes',
                isEP: row[6] === 'Yes',
                size: row[7] || 'N/A',
                notes: row[8] || '',
                artwork: row[9] || '',
                spotifyURL: row[10] || ''
            })).filter(album => album.artist && album.title);

            this.debugEPAlbums();
            this.debugAlbumSizes();
            return this.albums;
        } catch (error) {
            console.error('Error fetching collection:', error);
            return [];
        }
    }

    debugEPAlbums() {
        const epAlbums = this.albums.filter(album => album.isEP);
        console.group('Debug: EP Albums');
        console.log(`Total EP Albums: ${epAlbums.length}`);
        epAlbums.forEach(album => {
            console.log(`- ${album.artist} - ${album.title}`);
        });
        console.groupEnd();
    }

    debugAlbumSizes() {
        const sizeCounts = this.albums.reduce((counts, album) => {
            counts[album.size] = (counts[album.size] || 0) + 1;
            return counts;
        }, {});

        console.group('Debug: Album Sizes');
        Object.entries(sizeCounts).forEach(([size, count]) => {
            console.log(`${size}: ${count} albums`);
        });
        console.groupEnd();
    }
}