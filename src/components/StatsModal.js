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
        favoriteAlbums: 0
      };
    }

    // Basic counts
    const artists = new Set(albums.map(album => album.artist));
    const genres = new Set(albums.filter(album => album.genre).map(album => album.genre));
    const favoriteAlbums = albums.filter(album => album.favorite).length;

    return {
      totalAlbums: albums.length,
      totalArtists: artists.size,
      totalGenres: genres.size,
      favoriteAlbums
    };
  }, [albums]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-75 flex items-center justify-center p-4">
      <div className="relative bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold">Collection Statistics</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Close
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
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
};

export default StatsModal;