/**
 * Configuration settings for the Vinyl Collection App
 * You can customize these settings to match your requirements
 */

const config = {
  // The ID of your Google Sheet (from the URL)
  // Default is the example sheet: https://docs.google.com/spreadsheets/d/1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE/edit
  googleSheetId: '1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE',
  
  // App title that appears in the header
  appTitle: 'Vinyl Collection',
  
  // Expected columns in your Google Sheet
  // The app will look for these column names (case-sensitive)
  columns: {
    artist: 'artist',        // Artist name
    title: 'title',          // Album title
    year: 'year',            // Release year (numeric)
    genre: 'genre',          // Music genre
    category: 'category',    // Your custom category (e.g., "Owned Albums", "Wishlist")
    notes: 'notes',          // Your notes about the album
    spotifyUrl: 'spotifyUrl', // Link to the album on Spotify
    artwork: 'artwork',       // Link to album artwork image
    favorite: 'favorite',     // Boolean (true/false) to mark favorites
    isEP: 'isEP'              // Boolean (true/false) to mark if it's an EP rather than LP
  },
  
  // Default view mode: 'grid' or 'table'
  defaultViewMode: 'grid',
  
  // Enable auto-fetching of Spotify data
  // Note: For privacy reasons, this is disabled by default
  enableSpotifyAutoFetch: false,
  
  // Theme settings
  theme: {
    // Primary color (used for buttons, links, etc.)
    primaryColor: '#6366F1', // indigo-500
    
    // Secondary color (used for accents)
    secondaryColor: '#8B5CF6', // violet-500
    
    // Accent color (used for call-to-action elements)
    accentColor: '#10B981', // emerald-500
  }
};

export default config;