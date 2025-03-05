# 🎵 Vinyl Collection App: Getting Started Guide

## Create Your Personal Vinyl Collection Website

### Prerequisites
- A GitHub account
- A Google Sheets account
- Optional: Spotify account (for album links)

### Step 1: Use the Vinyl Collection Template
1. Open the [Vinyl Collection - TEMPLATE Google Sheet](https://docs.google.com/spreadsheets/d/1xAzo6vCafjT6XekXP-nmN_gapEfnvyCjyyk4ZPo1K3I/edit?usp=sharing)
2. Click `File` > `Make a copy`
3. Save the copy to your Google Drive
4. Rename your spreadsheet (e.g., "My Vinyl Collection")
5. Delete all existing demo rows in the "Albums" sheet
6. Add Your Collection:
   - Start by entering ONLY the Artist and Album Title columns
   - Use the built-in helper buttons to save time:
     * Click "Fill All Metadata" to automatically populate:
       - Genre
       - Year
       - Artwork URL
       - Spotify Link
       - Other optional fields
   - Review and manually adjust any auto-filled information as needed

> [!INFO]
> **Tip for Custom Genres**: 
> If you have specific genre information you want to keep:
> - Use "Fill Blank Cells" instead of "Fill All Metadata"
> - This preserves your existing genre entries
> - Helps maintain your unique categorization

#### Column Reference
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

**Important Formatting Guidelines**:
- DO NOT change any column headers
- Use EXACTLY "Yes" or "No" for boolean columns (favorite, isEP)
- Ensure all required columns are filled
- Keep original column order and names
- Use plain text values
- Avoid special formatting in cells

### Step 2: Publish Your Spreadsheet
1. Click `File` > `Share` > `Publish to web`
2. Choose `Entire Document`
3. Select `CSV` as the format
4. Click `Publish`
5. **COPY THE GENERATED CSV LINK**

### Step 3: Fork the Repository
1. Visit the [Vinyl Collection App GitHub Repository](https://github.com/upjectory/vinyl-collection-app)
2. Click the `Fork` button in the top right corner
3. Choose your personal account to create a fork

### Step 4: Configure Your Collection
1. In your forked repository, open the `js/data.js` file
2. Replace the existing Google Sheets CSV URL with **YOUR COPIED CSV LINK**
3. Commit the changes

### Step 5: Deploy Your Website
1. Go to your repository's `Settings`
2. Navigate to the `Pages` section
3. Under `Source`, select the `main` branch
4. Save your changes
5. Wait a few minutes
6. Your site will be live at `https://[YOUR-GITHUB-USERNAME].github.io/vinyl-collection-app/`

## Tips & Troubleshooting
- **Artwork URLs**: 
  - Use direct links to image files
  - Ensure images are publicly accessible
  - PNG or JPG formats work best

- **Spotify Links**: 
  - Right-click an album on Spotify
  - Select "Share"
  - Choose "Copy Song/Album Link"

- **Common Pitfalls**:
  - Ensure all required columns are filled
  - Double-check your CSV link is publicly accessible
  - Verify image URLs are valid and direct

## Customization
- Edit `css/styles.css` to change the look and feel
- Modify `index.html` to add personal touches
- Adjust JavaScript files to add more features

## Need Help?
- [Open an issue](https://github.com/upjectory/vinyl-collection-app/issues) in the original repository
- Check the main README for more details

**Happy Collecting! 🎧🖤**

## License
This project is open-source. Please check the LICENSE file for details.