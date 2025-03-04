import React, { useMemo } from 'react';

/**
 * StatsModal component for displaying collection statistics
 * 
 * @param {Object} props Component props
 * @param {Array} props.albums Array of all albums
 * @param {Function} props.onClose Function to close the modal
 */
const StatsModal = ({ albums, onClose }) => {
  // Calculate various statistics
  const stats = useMemo(() => {
    if (!albums || albums.length === 0) {
      return {
        totalAlbums: 0,
        totalArtists: 0,
        totalGenres: 0,
        totalCategories: 0,
        favoriteAlbums: 0,
        oldestAlbum: null,
        newestAlbum: null,
        genreCounts: {},
        artistCounts: {},
        decadeCounts: {}
      };
    }

    // Basic counts
    const artists = new Set(albums.map(album => album.artist));
    const genres = new Set(albums.filter(album => album.genre).map(album => album.genre));
    const categories = new Set(albums.filter(album => album.category).map(album => album.category));
    const favoriteAlbums = albums.filter(album => album.favorite).length;

    // Find oldest and newest albums
    let oldestAlbum = albums[0];
    let newestAlbum = albums[0];
    
    for (const album of albums) {
      if (album.year < oldestAlbum.year) {
        oldestAlbum = album;
      }
      if (album.year > newestAlbum.year) {
        newestAlbum = album;
      }
    }

    // Count by genre
    const genreCounts = {};
    for (const album of albums) {
      if (album.genre) {
        genreCounts[album.genre] = (genreCounts[album.genre] || 0) + 1;
      }
    }

    // Count by artist
    const artistCounts = {};
    for (const album of albums) {
      artistCounts[album.artist] = (artistCounts[album.artist] || 0) + 1;
    }

    // Count by decade
    const decadeCounts = {};
    for (const album of albums) {
      if (album.year) {
        const decade = Math.floor(album.year / 10) * 10;
        decadeCounts[decade] = (decadeCounts[decade] || 0) + 1;
      }
    }

    return {
      totalAlbums: albums.length,
      totalArtists: artists.size,
      totalGenres: genres.size,
      totalCategories: categories.size,
      favoriteAlbums,
      oldestAlbum,
      newestAlbum,
      genreCounts,
      artistCounts,
      decadeCounts
    };
  }, [albums]);

  // Sort items by count for the charts
  const sortedGenres = useMemo(() => {
    return Object.entries(stats.genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [stats.genreCounts]);

  const sortedArtists = useMemo(() => {
    return Object.entries(stats.artistCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [stats.artistCounts]);

  const sortedDecades = useMemo(() => {
    return Object.entries(stats.decadeCounts)
      .sort((a, b) => a[0] - b[0]);
  }, [stats.decadeCounts]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Collection Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Albums" value={stats.totalAlbums} />
            <StatCard title="Total Artists" value={stats.totalArtists} />
            <StatCard title="Genres" value={stats.totalGenres} />
            <StatCard title="Favorites" value={stats.favoriteAlbums} />
          </div>
          
          {/* Oldest & Newest */}
          {stats.oldestAlbum && stats.newestAlbum && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Oldest Album</h3>
                <p className="font-bold">{stats.oldestAlbum.title}</p>
                <p>{stats.oldestAlbum.artist}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stats.oldestAlbum.year}</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Newest Album</h3>
                <p className="font-bold">{stats.newestAlbum.title}</p>
                <p>{stats.newestAlbum.artist}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stats.newestAlbum.year}</p>
              </div>
            </div>
          )}
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Top Genres */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Top Genres</h3>
              {sortedGenres.length > 0 ? (
                <div className="space-y-3">
                  {sortedGenres.map(([genre, count]) => (
                    <div key={genre} className="flex flex-col">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{genre}</span>
                        <span>{count} album{count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-vinyl-primary dark:bg-vinyl-primary-dark h-2.5 rounded-full" 
                          style={{ width: `${(count / stats.totalAlbums) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No genre data available</p>
              )}
            </div>
            
            {/* Top Artists */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">Top Artists</h3>
              {sortedArtists.length > 0 ? (
                <div className="space-y-3">
                  {sortedArtists.map(([artist, count]) => (
                    <div key={artist} className="flex flex-col">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{artist}</span>
                        <span>{count} album{count !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                        <div 
                          className="bg-vinyl-secondary dark:bg-vinyl-secondary-dark h-2.5 rounded-full" 
                          style={{ width: `${(count / stats.totalAlbums) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No artist data available</p>
              )}
            </div>
          </div>
          
          {/* Decades Distribution */}
          {sortedDecades.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-8">
              <h3 className="text-lg font-medium mb-4">Albums by Decade</h3>
              <div className="flex items-end h-48 space-x-2">
                {sortedDecades.map(([decade, count]) => {
                  const percentage = (count / stats.totalAlbums) * 100;
                  const height = Math.max(percentage, 5); // Minimum 5% height for visibility
                  
                  return (
                    <div key={decade} className="flex flex-col items-center flex-1">
                      <div className="w-full bg-vinyl-accent dark:bg-vinyl-accent-dark rounded-t" style={{ height: `${height}%` }}>
                        <div className="text-xs text-white text-center p-1 truncate">{count}</div>
                      </div>
                      <div className="text-xs mt-2">{decade}s</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Stat Card component for displaying a single statistic
 */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatsModal;