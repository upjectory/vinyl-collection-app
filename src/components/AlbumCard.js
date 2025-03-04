import React, { useEffect } from 'react';

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

  useEffect(() => {
    console.log(`Album "${title}" Spotify URL:`, spotifyurl);
  }, [spotifyurl]);

  return (
    <div 
      className="album-card" 
      onClick={spotifyurl ? () => window.open(spotifyurl, '_blank') : undefined}
    >
      <div className="album-image-container">
        <img 
          src={artwork} 
          alt={`${title} by ${artist}`} 
          className="album-image"
        />
        {spotifyurl && (
          <div className="spotify-link" title="Open in Spotify">S</div>
        )}
        {favorite && (
          <div className="album-favorite">★</div>
        )}
      </div>
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
