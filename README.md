# Vinyl Collection App

## Overview
This is a web application to display a vinyl record collection using data from a Google Sheet.

## Deployment

### GitHub Pages Setup
1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment", select "GitHub Actions" as the source
4. The workflow in `.github/workflows/deploy.yml` will handle deployment

### Local Development
- Open `public/index.html` directly in a browser
- The app pulls data from a Google Sheet dynamically

## Data Source
The vinyl collection data is sourced from a Google Sheet. Ensure the sheet is published and accessible.

### Customization
- Modify the `fetchVinylData()` function in `index.html` to match your Google Sheet structure
- Adjust the grid layout and styling in the HTML file

## Troubleshooting
- Verify that the Google Sheet is publicly accessible
- Check browser console for any errors
- Ensure your sheet follows the expected format:
  - Column headers: Album, Artist, Year, Genre
  - First row is expected to be headers