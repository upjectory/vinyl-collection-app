# Vinyl Collection App - Setup Guide

## Completed Setup

We've created a React application with the following features:

1. A grid and table view for your vinyl collection
2. Connection to Google Sheets for data storage
3. Ability to filter by artist, album, year, genre, etc.
4. Note editing functionality
5. Collection statistics with shareable HTML snippet
6. Dark/light theme based on OS settings
7. Setup wizard for connecting your Google Sheet

## GitHub Pages Deployment

To deploy this app to GitHub Pages, you'll need to set up a GitHub Actions workflow manually:

1. Create a directory: `.github/workflows/`
2. Create a file: `.github/workflows/deploy.yml`
3. Add the following content to the file:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout 🛎️
        uses: actions/checkout@v3

      - name: Setup Node.js 🔧
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies 📦
        run: npm ci

      - name: Build 🏗️
        run: npm run build

      - name: Deploy to GitHub Pages 🚀
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: build # The folder the action should deploy
          branch: gh-pages # The branch the action should deploy to
```

## Local Development Setup

To run the application locally:

1. Clone the repository:
   ```
   git clone https://github.com/upjectory/vinyl-collection-app.git
   cd vinyl-collection-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser to `http://localhost:3000`

## Configuring Your Google Sheet

1. Create a Google Sheet with the following columns:
   - artist
   - title
   - year
   - genre
   - category
   - notes
   - spotifyUrl
   - artwork
   - favorite
   - isEP

2. Make sure to set the sharing permissions to "Anyone with the link can view"

3. Copy the Google Sheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
   ```

4. When you first open the app, you'll be guided through the setup wizard where you can paste your Google Sheet ID

## Further Customization

You can customize the app by editing the `src/config.js` file:

- Change the app title
- Set your default view mode (grid or table)
- Customize the theme colors
- Enable/disable Spotify integration

## Adding Spotify Integration

To fully enable Spotify integration, you would need to:

1. Register an application on the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Update the `spotify.js` service to use your client ID and implement proper authentication
3. Modify the `googleSheets.js` service's `enhanceWithSpotifyData` function to fetch real data from Spotify

## Support and Contributions

If you encounter any issues or would like to contribute to the project, please open an issue or pull request on GitHub.
