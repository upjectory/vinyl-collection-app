import React, { useState } from 'react';

/**
 * FilterControls component for filtering the album collection
 * 
 * @param {Object} props Component props
 * @param {Object} props.filters Current filter state
 * @param {Function} props.setFilters Function to update filters
 * @param {Array} props.categories List of available categories
 * @param {Array} props.artists List of available artists
 * @param {Array} props.genres List of available genres
 */
const FilterControls = ({ filters, setFilters, categories, artists, genres }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterName, value) => {
    setFilters({
      ...filters,
      [filterName]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      artist: '',
      title: '',
      year: '',
      genre: '',
      favoritesOnly: false
    });
  };

  return (
    <div className="mb-6 bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex space-x-2">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white"
          >
            Clear
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-400 hover:underline focus:outline-none"
          >
            {isExpanded ? 'Less filters' : 'More filters'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Title Search */}
        <div>
          <label htmlFor="titleFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Album Title
          </label>
          <input
            id="titleFilter"
            type="text"
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            placeholder="Search titles..."
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Artist Filter */}
        <div>
          <label htmlFor="artistFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Artist
          </label>
          <select
            id="artistFilter"
            value={filters.artist}
            onChange={(e) => handleFilterChange('artist', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Artists</option>
            {artists.sort().map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-300 mb-1">
            Category
          </label>
          <select
            id="categoryFilter"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {categories.sort().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Expanded filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-700">
          {/* Genre Filter */}
          <div>
            <label htmlFor="genreFilter" className="block text-sm font-medium text-gray-300 mb-1">
              Genre
            </label>
            <select
              id="genreFilter"
              value={filters.genre}
              onChange={(e) => handleFilterChange('genre', e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Genres</option>
              {genres.sort().map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Year Filter */}
          <div>
            <label htmlFor="yearFilter" className="block text-sm font-medium text-gray-300 mb-1">
              Year
            </label>
            <input
              id="yearFilter"
              type="number"
              value={filters.year}
              onChange={(e) => handleFilterChange('year', e.target.value)}
              placeholder="Filter by year..."
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-sm text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Favorites toggle */}
          <div className="flex items-center pt-6">
            <input
              id="favoritesFilter"
              type="checkbox"
              checked={filters.favoritesOnly}
              onChange={(e) => handleFilterChange('favoritesOnly', e.target.checked)}
              className="h-4 w-4 text-blue-500 focus:ring-blue-500 rounded"
            />
            <label htmlFor="favoritesFilter" className="ml-2 block text-sm text-gray-300">
              Favorites Only
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;