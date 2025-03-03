import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import AlbumGrid from './components/AlbumGrid';
import AlbumTable from './components/AlbumTable';
import Footer from './components/Footer';
import StatsModal from './components/StatsModal';
import { fetchVinylData } from './services/googleSheets';

function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [showStatsModal, setShowStatsModal] = useState(false);
  
  // State for filtering
  const [filters, setFilters] = useState({
    category: '',
    artist: '',
    title: '',
    year: '',
    genre: '',
    favoritesOnly: false
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchVinylData();
        setAlbums(data);
        setLoading(false);
      } catch (err) {
        console.error('Error loading vinyl data:', err);
        setError('Failed to load vinyl collection data. Please try again later.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'table' : 'grid');
  };

  const toggleStatsModal = () => {
    setShowStatsModal(!showStatsModal);
  };

  // Filter album data based on current filters
  const filteredAlbums = albums.filter(album => {
    return (
      (filters.category === '' || album.category === filters.category) &&
      (filters.artist === '' || album.artist === filters.artist) &&
      (filters.title === '' || album.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (filters.year === '' || album.year === parseInt(filters.year)) &&
      (filters.genre === '' || album.genre === filters.genre) &&
      (!filters.favoritesOnly || album.favorite)
    );
  });

  // Generate categories, artists, and genres for filter dropdowns
  const categories = [...new Set(albums.map(album => album.category))];
  const artists = [...new Set(albums.map(album => album.artist))];
  const genres = [...new Set(albums.filter(album => album.genre).map(album => album.genre))];

  // Handle adding or editing notes
  const updateAlbumNote = (albumIndex, newNote) => {
    const updatedAlbums = [...albums];
    updatedAlbums[albumIndex] = {
      ...updatedAlbums[albumIndex],
      notes: newNote
    };
    setAlbums(updatedAlbums);
    
    // Here you could add logic to sync back to Google Sheets if needed
  };

  return (
    <div className="min-h-screen bg-vinyl-background-light dark:bg-vinyl-background-dark text-vinyl-text-light dark:text-vinyl-text-dark">
      <Header 
        toggleViewMode={toggleViewMode} 
        viewMode={viewMode} 
        toggleStatsModal={toggleStatsModal}
      />
      
      <main className="container mx-auto px-4 py-6">
        <FilterControls 
          filters={filters} 
          setFilters={setFilters} 
          categories={categories} 
          artists={artists} 
          genres={genres} 
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading your vinyl collection...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <AlbumGrid albums={filteredAlbums} updateAlbumNote={updateAlbumNote} />
            ) : (
              <AlbumTable albums={filteredAlbums} updateAlbumNote={updateAlbumNote} />
            )}
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredAlbums.length} of {albums.length} records
            </div>
          </>
        )}
      </main>
      
      <Footer />
      
      {showStatsModal && (
        <StatsModal 
          albums={albums} 
          onClose={toggleStatsModal} 
        />
      )}
    </div>
  );
}

export default App;