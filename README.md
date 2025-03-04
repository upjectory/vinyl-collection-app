# Vinyl Collection App

A dynamic web application to display and manage your vinyl record collection, pulling data from Google Sheets.

![Vinyl Collection App](https://i.imgur.com/M4o8E8I.png)

## Features

- 🎵 Display your vinyl collection in grid or table view
- 🔍 Filter by artist, album, genre, year, and more
- 📝 Add and edit notes for each album
- 📊 View collection statistics and share them
- 🌓 Automatic dark/light theme based on system preferences
- 🔄 Data syncs directly from your Google Sheet
- 🎨 Album artwork and Spotify links support

## Demo

Check out the live demo: [https://upjectory.github.io/vinyl-collection-app/](https://upjectory.github.io/vinyl-collection-app/)

## Setup and Usage

### Option 1: Use the Live Demo

1. Visit the GitHub Pages site: [https://upjectory.github.io/vinyl-collection-app/](https://upjectory.github.io/vinyl-collection-app/)
2. Follow the setup wizard to connect your Google Sheet
3. Start managing your vinyl collection!

### Option 2: Fork and Deploy Your Own Version

1. Fork this repository
2. Clone your fork to your local machine
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Google Sheet Setup

This app requires a Google Sheet with the following columns:

| Column | Description |
|--------|-------------|
| artist | Name of the artist |
| title | Album title |
| year | Release year (numeric) |
| genre | Music genre |
| category | Your custom category (e.g., "Owned Albums", "Wishlist") |
| notes | Your notes about the album |
| spotifyUrl | Link to the album on Spotify |
| artwork | Link to album artwork image |
| favorite | Boolean (true/false) to mark favorites |
| isEP | Boolean (true/false) to indicate if it's an EP rather than LP |

### Template Sheet

You can copy our template sheet: [Vinyl Collection Template](https://docs.google.com/spreadsheets/d/1xAzo6vCafjT6XekXP-nmN_gapEfnvyCjyyk4ZPo1K3I/copy)

Important: Make sure to set the sharing permissions to "Anyone with the link can view" for the app to be able to access your data.

## Customization

You can customize the app by editing the `src/config.js` file:

```javascript
const config = {
  // The ID of your Google Sheet (from the URL)
  googleSheetId: 'YOUR_SHEET_ID',
  
  // App title that appears in the header
  appTitle: 'My Vinyl Collection',
  
  // Default view mode: 'grid' or 'table'
  defaultViewMode: 'grid',
  
  // Theme settings
  theme: {
    primaryColor: '#6366F1',   // indigo-500
    secondaryColor: '#8B5CF6', // violet-500
    accentColor: '#10B981',    // emerald-500
  }
};
```

## Technologies Used

- React
- Tailwind CSS
- Google Sheets API
- GitHub Pages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.