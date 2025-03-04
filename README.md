# Vinyl Collection Website

## Overview
This website displays a vinyl record collection pulled directly from a Google Sheet. 

## Features
- Responsive design
- Dynamic data loading from Google Sheets
- Grid layout with hover effects
- Mobile-friendly interface

## Data Source
The vinyl collection data is sourced from a Google Sheet. Ensure the sheet is:
- Publicly accessible
- Contains columns: Album, Artist, Year, Genre
- First row is used as headers

## Deployment
The site is automatically deployed to GitHub Pages using GitHub Actions.

### Customization
- Modify the `index.html` file to change styling or data display
- Update the Google Sheet URL in the JavaScript to use your own sheet

## Troubleshooting
- Check browser console for any errors
- Verify Google Sheet sharing settings
- Ensure column names match the script expectations

## Local Development
Simply open the `index.html` file in a web browser to view the collection.