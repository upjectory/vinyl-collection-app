import React from 'react';
import { motion } from 'framer-motion';
import placeholder from '../assets/placeholder-album.png';

/**
 * AlbumGrid component for displaying albums in a grid layout
 * 
 * @param {Object} props Component props
 * @param {Array} props.albums Array of album objects to display
 * @param {Function} props.updateAlbumNote Function to update album notes
 */
const AlbumGrid = ({ albums, updateAlbumNote }) => {
  // Render placeholder if no albums
  if (!albums || albums.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-gray-500 dark:text-gray-400">No albums found with current filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {albums.map((album, index) => (
        <AlbumCard 
          key={`${album.artist}-${album.title}-${index}`}
          album={album}
          index={index}
          updateAlbumNote={updateAlbumNote}
        />
      ))}
    </div>
  );
};

/**
 * AlbumCard component for individual album cards
 */
const AlbumCard = ({ album, index, updateAlbumNote }) => {
  // Default image if none provided
  const albumArtwork = album.artwork || placeholder;

  return (
    <motion.div 
      className="bg-vinyl-card-light dark:bg-vinyl-card-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      {/* Album artwork */}
      <div className="relative aspect-square overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img 
          src={albumArtwork} 
          alt={`${album.title} by ${album.artist}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = placeholder;
          }}
        />
        
        {/* Category tag overlay */}
        {album.category && (
          <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {album.category}
          </span>
        )}
        
        {/* Favorite indicator */}
        {album.favorite && (
          <span className="absolute top-2 left-2 text-yellow-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </div>
      
      {/* Album info */}
      <div className="p-3">
        <h3 className="font-bold text-sm truncate">{album.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{album.artist}</p>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{album.year}</span>
          <span>{album.genre}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AlbumGrid;