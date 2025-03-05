# Vinyl Collection Viewer

## Project Overview
A dynamic web application that displays a vinyl record collection pulled from a Google Sheet. Users can easily customize and deploy their own collection.

## Key Features
- Fetch album data dynamically from a Google Sheet
- Display album artwork, details, and Spotify links (opens in new tab)
- Gold outline highlighting for favorite albums
- Easy to fork or download for personal use
- Simple deployment to GitHub Pages

## Quick Start

### Option 1: Local Usage
1. Download the repository files
2. Update the Google Sheet source URL in js/data.js
3. Open index.html in a web browser

### Option 2: GitHub Pages Deployment
1. Fork this repository
2. Update the Google Sheet source URL in js/data.js
3. Enable GitHub Pages in repository settings

## Configuration
Modify the Google Sheet source URL in js/data.js to point to your personal collection spreadsheet.

### Required Google Sheet Columns
- artist
- title
- category (optional)
- genre
- year
- favorite (Yes/No, optional)
- isEP (Yes/No, optional)
- notes (optional, not displayed in album card view)
- artwork
- spotifyURL

## Technical Details
- Built with vanilla JavaScript
- Coded in modular files for better organization
- Pulls data from Google Sheets API
- Responsive design
- No build step required

## Contributing
Feel free to open issues or submit pull requests to improve the project.
