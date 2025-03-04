import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import FilterControls from './components/FilterControls';
import AlbumGrid from './components/AlbumGrid';
import AlbumTable from './components/AlbumTable';
import Footer from './components/Footer';
import StatsModal from './components/StatsModal';
import { fetchVinylData, getSavedSheetId } from './services/googleSheets';
import config from './config';

/**
 * Main App component for the Vinyl Collection application
 */
function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState(config.defaultViewMode || 'grid'); // 'grid' or 'table'
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  
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
    // Force dark mode
    document.documentElement.classList.add('dark');
    
    // Check if it's the first visit
    const hasVisitedBefore = localStorage.getItem('vinylCollectionSetupComplete');
    if (!hasVisitedBefore) {
      setShowSetupWizard(true);
      localStorage.setItem('vinylCollectionSetupComplete', 'true');
    }
    
    loadVinylData();
  }, []);

  const loadVinylData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get the saved sheet ID or use the default
      const sheetId = getSavedSheetId();
      
      const data = await fetchVinylData(sheetId);
      setAlbums(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading vinyl data:', err);
      setError('Failed to load vinyl collection data. Please check your Google Sheet ID and permissions.');
      setLoading(false);
    }
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'table' : 'grid');
  };

  const toggleStatsModal = () => {
    setShowStatsModal(!showStatsModal);
  };
  
  const handleSetupComplete = () => {
    setShowSetupWizard(false);
    loadVinylData();
  };
  
  const openSetupWizard = () => {
    setShowSetupWizard(true);
  };

  // Filter album data based on current filters
  const filteredAlbums = albums.filter(album => {
    return (
      (filters.category === '' || album.category === filters.category) &&
      (filters.artist === '' || (album.artist && album.artist.toLowerCase().includes(filters.artist.toLowerCase()))) &&
      (filters.title === '' || (album.title && album.title.toLowerCase().includes(filters.title.toLowerCase()))) &&
      (filters.year === '' || album.year === parseInt(filters.year)) &&
      (filters.genre === '' || album.genre === filters.genre) &&
      (!filters.favoritesOnly || album.favorite)
    );
  });

  // Generate categories, artists, and genres for filter dropdowns
  const categories = [...new Set(albums.filter(album => album.category).map(album => album.category))].filter(Boolean);
  const artists = [...new Set(albums.filter(album => album.artist).map(album => album.artist))].filter(Boolean);
  const genres = [...new Set(albums.filter(album => album.genre).map(album => album.genre))].filter(Boolean);

  // Handle adding or editing notes
  const updateAlbumNote = (albumIndex, newNote) => {
    const updatedAlbums = [...albums];
    updatedAlbums[albumIndex] = {
      ...updatedAlbums[albumIndex],
      notes: newNote
    };
    setAlbums(updatedAlbums);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        toggleViewMode={toggleViewMode} 
        viewMode={viewMode} 
        toggleStatsModal={toggleStatsModal}
        openSetupWizard={openSetupWizard}
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
          <div className="flex flex-col justify-center items-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={openSetupWizard}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Setup Your Collection
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <AlbumGrid albums={filteredAlbums} updateAlbumNote={updateAlbumNote} />
            ) : (
              <AlbumTable albums={filteredAlbums} updateAlbumNote={updateAlbumNote} />
            )}
            
            <div className="mt-4 text-sm text-gray-400">
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
      
      {showSetupWizard && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Setup Required</h2>
            <p className="mb-4">
              Please set up your vinyl collection by connecting to a Google Sheet.
            </p>
            <button
              onClick={handleSetupComplete}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Continue with Demo Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;