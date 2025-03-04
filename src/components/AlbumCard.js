import React from 'react';

const AlbumCard = ({ album }) => {
  const { 
    title, 
    artist, 
    year, 
    genre, 
    spotifyurl, 
    artwork,
    favorite 
  } = album;

  return (
    <div className="album-card">
      <a 
        href={spotifyurl || '#'} 
        target="_blank" 
        rel="noopener noreferrer"
        className="album-artwork-link"
      >
        <img 
          src={artwork} 
          alt={`${title} by ${artist}`} 
          className="album-image"
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
