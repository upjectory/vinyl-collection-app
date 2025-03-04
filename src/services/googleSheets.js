import axios from 'axios';
import config from '../config';

/**
 * Function to load data from a Google Sheet
 * 
 * @param {string} sheetId - The ID of the Google Sheet to fetch data from
 * @returns {Promise<Array>} - Promise containing array of album objects
 */
export const fetchVinylData = async (sheetId = config.googleSheetId) => {
  try {
    // Construct the URL to fetch the sheet as CSV
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`;
    
    // Fetch the CSV data
    const response = await axios.get(sheetUrl);
    const csvData = response.data;
    
    // Parse the CSV data
    const parsedData = parseCSV(csvData);
    
    // Validate required columns
    validateColumns(parsedData);
    
    // Enhance with Spotify data if enabled
    const enhancedData = config.enableSpotifyAutoFetch 
      ? await enhanceWithSpotifyData(parsedData)
      : parsedData;
    
    return enhancedData;
  } catch (error) {
    console.error('Error fetching vinyl data:', error);
    
    // Custom error message based on the error type
    if (error.response && error.response.status === 404) {
      throw new Error('Google Sheet not found. Please check the Sheet ID and make sure it\'s publicly accessible.');
    } else if (error.response && error.response.status === 403) {
      throw new Error('Access to the Google Sheet is forbidden. Please check sharing settings.');
    } else if (error.message.includes('required columns')) {
      throw new Error(error.message);
    } else {
      throw new Error('Failed to load vinyl collection data. Please try again later.');
    }
  }
};

/**
 * Function to validate that the required columns exist in the CSV data
 * 
 * @param {Array} data - The parsed CSV data
 * @throws {Error} - If required columns are missing
 */
const validateColumns = (data) => {
  if (!data || data.length === 0) {
    throw new Error('No data found in the sheet.');
  }
  
  const firstRow = data[0];
  const requiredColumns = [
    config.columns.title,
    config.columns.artist,
  ];
  
  const missingColumns = requiredColumns.filter(col => !(col in firstRow));
  
  if (missingColumns.length > 0) {
    throw new Error(`Missing required columns: ${missingColumns.join(', ')}. Please check your Google Sheet structure.`);
  }
};

/**
 * Function to parse CSV data
 * 
 * @param {string} csvData - The raw CSV data
 * @returns {Array} - Array of album objects
 */
const parseCSV = (csvData) => {
  // Split by lines and remove any empty lines
  const lines = csvData.split('\n').filter(line => line.trim());
  
  // Get headers from the first line
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Parse each line into an object
  return lines.slice(1).map((line, lineIndex) => {
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
      let value = index < values.length ? values[index] : '';
      
      // Clean up the value (remove quotes, etc.)
      value = value.trim().replace(/^\"|\\"$/g, '');
      
      // Map the headers to our config column names
      const columnMapping = {
        [config.columns.artist]: 'artist',
        [config.columns.title]: 'title',
        [config.columns.year]: 'year',
        [config.columns.genre]: 'genre',
        [config.columns.category]: 'category',
        [config.columns.notes]: 'notes',
        [config.columns.spotifyUrl]: 'spotifyUrl',
        [config.columns.artwork]: 'artwork',
        [config.columns.favorite]: 'favorite',
        [config.columns.isEP]: 'isEP'
      };
      
      // Use the mapping if available
      const fieldName = columnMapping[header] || header.toLowerCase();
      
      // Type conversions for specific fields
      if (fieldName === 'year' && value) {
        const yearNum = parseInt(value, 10);
        if (!isNaN(yearNum)) {
          value = yearNum;
        }
      } else if (fieldName === 'favorite' || fieldName === 'isEP') {
        // Convert 'true'/'false' strings to booleans
        value = value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
      }
      
      record[fieldName] = value;
    });
    
    // Add row number for reference (starts at 2 because row 1 is headers)
    record.rowNumber = lineIndex + 2;
    
    return record;
  });
};

/**
 * Function to enhance the parsed data with Spotify information if needed
 * 
 * @param {Array} albums - Array of album objects
 * @returns {Array} - Enhanced album objects
 */
const enhanceWithSpotifyData = async (albums) => {
  // For each album that doesn't have artwork or spotifyUrl, try to fetch it
  // In a real implementation, you would use Spotify API
  // For now, we'll just return the data as is to avoid API rate limits
  
  return albums;
};

/**
 * Function to save a Google Sheet ID to local storage
 * 
 * @param {string} sheetId - The Google Sheet ID to save
 */
export const saveSheetId = (sheetId) => {
  localStorage.setItem('vinylCollectionSheetId', sheetId);
};

/**
 * Function to get the saved Google Sheet ID from local storage
 * 
 * @returns {string} - The saved Google Sheet ID or the default ID
 */
export const getSavedSheetId = () => {
  return localStorage.getItem('vinylCollectionSheetId') || config.googleSheetId;
};