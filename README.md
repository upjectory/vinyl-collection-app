# 🎵 Vinyl Collection Viewer

## Quick Start 🚀

### 1. Get the Template
- Open the [Vinyl Collection - TEMPLATE Google Sheet](https://docs.google.com/spreadsheets/d/1xAzo6vCafjT6XekXP-nmN_gapEfnvyCjyyk4ZPo1K3I/edit?usp=sharing)
- Make a copy to your Google Drive
- Enter your vinyl collection data

### 2. Publish Spreadsheet
- Click `File` > `Share` > `Publish to web`
- Select CSV format
- Copy the generated link

### 3. Deploy Your Collection

#### Option A: GitHub Pages (Recommended)
- Fork this repository
- Update the CSV link in `js/data.js`
- Enable GitHub Pages in repository settings

#### Option B: Self-Hosting
- Clone the repository to your local machine
- Use a simple static file server to host
- Update the CSV link in `js/data.js`

## Hosting Options 🌐

### GitHub Pages
- Free
- Easy setup
- Automatic HTTPS
- Linked to your GitHub account

### Self-Hosting Methods
1. **Local Development Server**
   - Use Python: `python -m http.server`
   - Use Node.js: `npx http-server`
   - Use Live Server extension in VS Code

2. **Web Hosting Platforms**
   - Netlify
   - Vercel
   - Cloudflare Pages
   - Any static site hosting service

3. **Personal Server**
   - Host on Apache
   - Host on Nginx
   - Raspberry Pi web server

## Spreadsheet Columns 📊

| Column | Description | Required | Example |
|--------|-------------|----------|---------|
| artist | Full name of the artist/band | YES | "Miles Davis" |
| title | Album name | YES | "Kind of Blue" |
| category | Optional collection category | NO | "Jazz", "Personal Favorites" |
| genre | Music genre | YES | "Jazz" |
| year | Release year | YES | 1959 |
| favorite | Mark as favorite? | NO | "Yes" or "No" |
| isEP | Is this an EP? | NO | "Yes" or "No" |
| size | Vinyl record size | YES | "12\"", "10\"", or "7\"" |
| notes | Additional comments | NO | "Landmark jazz album" |
| artwork | Direct image URL | YES | "https://example.com/album-cover.jpg" |
| spotifyURL | Album Spotify link | YES | "https://open.spotify.com/album/..." |

## Features ✨
- Dynamically fetch album data from Google Sheets
- Display album artwork, details, and Spotify links
- Responsive design
- Easy customization
- No build step required

## Getting Started 📖
For detailed setup instructions, check out our [GETTING_STARTED.md](GETTING_STARTED.md)

## Contributing 🤝
- Open issues for bugs or feature requests
- Pull requests are welcome!

## License 📄
Open-source. See LICENSE file for details.

**Happy Collecting! 🎧🖤**