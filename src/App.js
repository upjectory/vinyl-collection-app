import React, { useState, useEffect } from 'react';

/**
 * Simplified vinyl collection app that displays albums in a grid layout
 */
function App() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Force dark mode
    document.documentElement.classList.add('dark');
    document.body.style.background = '#000';
    document.body.style.color = '#fff';
    
    // Load sample data
    fetchVinylData();
  }, []);

  const fetchVinylData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Normally we would fetch from Google Sheets, but for the demo we'll use sample data
      const sampleData = [
        { title: 'VocabuDrab Sessions 96-97', artist: 'B.L.X.', year: 1997, genre: 'Hip Hop' },
        { title: 'Sunch Punch', artist: 'B.L.X.', year: 1996, genre: 'Hip Hop' },
        { title: 'Veganz Want Beef, Vol. 1', artist: 'B.L.X.', year: 1998, genre: 'Hip Hop' },
        { title: 'Veganz Want Beef, Vol. 2', artist: 'B.L.X.', year: 1999, genre: 'Hip Hop' },
        { title: 'Skeletons', artist: 'Malkovich Music', year: 2005, genre: 'Electronic' },
        { title: 'Dominoes & Dice', artist: 'CHUCK CHILLA', year: 2001, genre: 'Jazz' },
        { title: 'Funkdafied Freddy', artist: 'IAMOMNI', year: 2002, genre: 'Funk' },
        { title: 'Elevator Music', artist: 'Milx', year: 2010, genre: 'Ambient' },
        { title: 'Great Expectations', artist: 'Malkovich Music', year: 2008, genre: 'Electronic' },
        { title: 'Burgundy Brown', artist: 'IAMOMNI', year: 2004, genre: 'R&B' },
        { title: 'Bankruptcy', artist: 'Malkovich Music', year: 2009, genre: 'Electronic' },
        { title: 'Wolfgang', artist: 'IAMOMNI X MolMan', year: 2015, genre: 'Hip Hop' }
      ];
      
      setAlbums(sampleData);
      setLoading(false);
    } catch (err) {
      console.error('Error loading vinyl data:', err);
      setError('Failed to load vinyl collection data.');
      setLoading(false);
    }
  };

  // Generate a placeholder image URL
  const getPlaceholderUrl = (title, artist) => {
    return `https://placehold.co/400x400/121212/FFFFFF?text=${encodeURIComponent(artist)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black text-white shadow-lg py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-blue-400">much@</span>
            <span className="text-green-400">moreintricate</span>
            <span className="text-purple-400">.com</span>
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading your vinyl collection...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center h-64">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {albums.map((album, index) => (
                <div 
                  key={`${album.artist}-${album.title}-${index}`}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Album artwork */}
                  <div className="relative aspect-square overflow-hidden bg-gray-900">
                    <img 
                      src={getPlaceholderUrl(album.title, album.artist)} 
                      alt={`${album.title} by ${album.artist}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Album info */}
                  <div className="p-3">
                    <h3 className="font-bold text-sm truncate">{album.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{album.artist}</p>
                    
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{album.year}</span>
                      <span>{album.genre}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              Showing {albums.length} records
            </div>
          </>
        )}
      </main>
      
      <footer className="mt-12 py-6 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Vinyl Collection App
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;