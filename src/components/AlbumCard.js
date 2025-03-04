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
    console.group(`Album Details: ${title}`);
    console.log('Full Album Object:', album);
    console.log('Spotify URL:', spotifyurl);
    console.log('Artwork URL:', artwork);
    console.log('Is Favorite:', favorite);
    console.groupEnd();
  }, [album]);

  const handleSpotifyClick = () => {
    console.log(`Attempting to open Spotify URL for ${title}`);
    if (spotifyurl) {
      window.open(spotifyurl, '_blank');
    } else {
      console.warn(`No Spotify URL found for album: ${title}`);
    }
  };

  return (
    <div 
      className="album-card" 
      onClick={handleSpotifyClick}
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
