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
            <th className="p-3 text-left text-sm font-semibold">Notes</th>
            <th className="p-3 text-center text-sm font-semibold">Favorite</th>
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
              <td className="p-3 text-sm">
                <div className="max-w-xs truncate">
                  {album.notes || '-'}
                </div>
              </td>
              <td className="p-3 text-center">
                {album.favorite ? (
                  <span className="text-yellow-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mx-auto">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  </span>
                ) : (
                  <span className="text-gray-300 dark:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
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