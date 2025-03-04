import React from 'react';

const AlbumCard = ({ album }) => {
  const { 
    title, 
    artist, 
    year, 
    genre, 
    spotifyLink, 
    albumArtwork,
    isFavorite 
  } = album;

  return (
    <div className="album-card">
      <a 
        href={spotifyLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="album-artwork-link"
      >
        <img 
          src={albumArtwork} 
          alt={`${title} by ${artist}`} 
          className="album-artwork"
        />
      </a>
      <div className="album-details">
        <h3>{title}</h3>
        <p>{artist}</p>
        <div className="album-metadata">
          <span className="year">{year}</span>
          <span className="genre">{genre}</span>
        </div>
      </div>
    </div>
  );
};

export default AlbumCard;
