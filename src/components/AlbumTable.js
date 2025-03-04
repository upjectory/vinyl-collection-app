import React from 'react';

/**
 * AlbumTable component for displaying albums in a table layout
 * 
 * @param {Object} props Component props
 * @param {Array} props.albums Array of album objects to display
 * @param {Function} props.updateAlbumNote Function to update album notes
 */
const AlbumTable = ({ albums, updateAlbumNote }) => {
  // Render placeholder if no albums
  if (!albums || albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-gray-500 dark:text-gray-400">No albums found with current filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left text-sm font-semibold">Title</th>
            <th className="p-3 text-left text-sm font-semibold">Artist</th>
            <th className="p-3 text-left text-sm font-semibold">Year</th>
            <th className="p-3 text-left text-sm font-semibold">Genre</th>
            <th className="p-3 text-left text-sm font-semibold">Category</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {albums.map((album, index) => (
            <tr 
              key={`${album.artist}-${album.title}-${index}`}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="p-3 text-sm">
                <div className="font-medium">{album.title}</div>
                {album.isEP && (
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">(EP)</span>
                )}
              </td>
              <td className="p-3 text-sm">{album.artist}</td>
              <td className="p-3 text-sm">{album.year}</td>
              <td className="p-3 text-sm">{album.genre}</td>
              <td className="p-3 text-sm">
                {album.category && (
                  <span className="inline-block bg-gray-200 dark:bg-gray-700 text-xs px-2 py-1 rounded">
                    {album.category}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumTable;