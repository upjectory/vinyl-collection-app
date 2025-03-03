import axios from 'axios';

// Function to load data from a Google Sheet
export const fetchVinylData = async (sheetId = '1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE') => {
  try {
    // Construct the URL to fetch the sheet as CSV
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    // Fetch the CSV data
    const response = await axios.get(sheetUrl);
    const csvData = response.data;
    
    // Parse the CSV data
    const parsedData = parseCSV(csvData);
    
    // Enhance with Spotify data if needed
    const enhancedData = await enhanceWithSpotifyData(parsedData);
    
    return enhancedData;
  } catch (error) {
    console.error('Error fetching vinyl data:', error);
    throw new Error('Failed to load vinyl collection data');
  }
};

// Function to parse CSV data
const parseCSV = (csvData) => {
  // Split by lines and remove any empty lines
  const lines = csvData.split('\n').filter(line => line.trim());
  
  // Get headers from the first line
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Parse each line into an object
  return lines.slice(1).map(line => {
    // Handle commas within quoted fields
    const values = [];
    let inQuotes = false;
    let currentValue = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    
    values.push(currentValue); // Push the last value
    
    // Create object from headers and values
    const record = {};
    headers.forEach((header, index) => {
      let value = values[index] || '';
      
      // Clean up the value (remove quotes, etc.)
      value = value.trim().replace(/^"|"$/g, '');
      
      // Convert year to number if possible
      if (header === 'year' && value) {
        const yearNum = parseInt(value, 10);
        if (!isNaN(yearNum)) {
          value = yearNum;
        }
      }
      
      // Convert 'true'/'false' strings to booleans
      if (value.toLowerCase() === 'true') {
        value = true;
      } else if (value.toLowerCase() === 'false') {
        value = false;
      }
      
      record[header] = value;
    });
    
    return record;
  });
};

// Function to enhance the parsed data with Spotify information
const enhanceWithSpotifyData = async (albums) => {
  // For each album that doesn't have artwork or spotifyUrl, try to fetch it
  // In a real implementation, you would use Spotify API
  // For now, we'll just return the data as is to avoid API rate limits
  
  return albums.map(album => {
    // If an album doesn't have artwork, we could set a placeholder
    if (!album.artwork) {
      album.artwork = ''; // A real implementation would fetch from Spotify
    }
    
    return album;
  });
};

// Function to save a Google Sheet ID to local storage
export const saveSheetId = (sheetId) => {
  localStorage.setItem('vinylCollectionSheetId', sheetId);
};

// Function to get the saved Google Sheet ID from local storage
export const getSavedSheetId = () => {
  return localStorage.getItem('vinylCollectionSheetId') || '1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE';
};
