import React, { useState } from 'react';
import { FaSpotify, FaGoogle, FaGithub, FaClipboard, FaCheck } from 'react-icons/fa';
import { saveSheetId } from '../services/googleSheets';
import config from '../config';

const SetupWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [sheetId, setSheetId] = useState(config.googleSheetId);
  const [copied, setCopied] = useState(false);
  
  const handleNextStep = () => {
    setStep(step + 1);
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
  };
  
  const handleSheetIdChange = (e) => {
    setSheetId(e.target.value);
  };
  
  const handleComplete = () => {
    // Save the Google Sheet ID to local storage
    saveSheetId(sheetId);
    
    // Call the onComplete callback to exit the wizard
    onComplete();
  };
  
  const getSheetIdFromUrl = (url) => {
    try {
      // Extract the ID from a Google Sheets URL
      const regex = /spreadsheets\\/d\\/([a-zA-Z0-9-_]+)/;
      const match = url.match(regex);
      if (match && match[1]) {
        setSheetId(match[1]);
      }
    } catch (error) {
      console.error('Error parsing Google Sheet URL:', error);
    }
  };
  
  const handlePasteUrl = async () => {
    try {
      const text = await navigator.clipboard.readText();
      getSheetIdFromUrl(text);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };
  
  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(config.googleSheetId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Welcome to Vinyl Collection App!</h2>
            <p className="mb-4">This wizard will help you set up your personalized vinyl collection app.</p>
            <p className="mb-8">You'll need a Google Sheet with your vinyl collection data to get started.</p>
            
            <div className="flex justify-center">
              <button
                onClick={handleNextStep}
                className="bg-vinyl-primary text-white px-6 py-3 rounded-md hover:bg-vinyl-secondary transition-colors"
              >
                Let's Get Started
              </button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Create Your Google Sheet</h2>
            
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="mb-4">You need a Google Sheet with the following columns:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>artist</strong>: The name of the artist</li>
                <li><strong>title</strong>: The album title</li>
                <li><strong>year</strong>: Release year (numeric)</li>
                <li><strong>genre</strong>: Music genre</li>
                <li><strong>category</strong>: Your custom category (e.g., "Owned Albums", "Wishlist")</li>
                <li><strong>notes</strong>: Your notes about the album</li>
                <li><strong>spotifyUrl</strong>: Link to the album on Spotify</li>
                <li><strong>artwork</strong>: Link to album artwork image</li>
                <li><strong>favorite</strong>: Boolean (true/false) to mark favorites</li>
                <li><strong>isEP</strong>: Boolean (true/false) to indicate if it's an EP rather than LP</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">You can either create your own sheet or use our template:</p>
              <div className="flex items-center space-x-4">
                <a
                  href={`https://docs.google.com/spreadsheets/d/${config.googleSheetId}/copy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <FaGoogle className="mr-2" /> Create from Template
                </a>
                
                <button
                  onClick={handleCopyTemplate}
                  className="flex items-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <FaCheck className="mr-2" /> Copied Template ID
                    </>
                  ) : (
                    <>
                      <FaClipboard className="mr-2" /> Copy Template ID
                    </>
                  )}
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="mb-2">When your sheet is ready, make sure to:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Add column headers exactly as specified above</li>
                <li>Set the sharing permissions to "Anyone with the link can view"</li>
                <li>Add your vinyl records as rows in the sheet</li>
              </ol>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              
              <button
                onClick={handleNextStep}
                className="bg-vinyl-primary text-white px-4 py-2 rounded-md hover:bg-vinyl-secondary transition-colors"
              >
                Next: Connect Your Sheet
              </button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Connect Your Google Sheet</h2>
            
            <div className="mb-6">
              <label htmlFor="sheetId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Google Sheet ID
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="sheetId"
                  value={sheetId}
                  onChange={handleSheetIdChange}
                  placeholder="Enter your Google Sheet ID"
                  className="flex-1 rounded-l-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-vinyl-primary focus:ring focus:ring-vinyl-primary focus:ring-opacity-50 p-2"
                />
                <button
                  onClick={handlePasteUrl}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-r-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  title="Paste from clipboard"
                >
                  Paste URL
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                The ID is the long string of characters in your Google Sheet URL.
              </p>
            </div>
            
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
              <p className="text-sm">
                <strong>Example URL:</strong> https://docs.google.com/spreadsheets/d/<span className="font-mono bg-yellow-100 dark:bg-yellow-800 px-1">1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE</span>/edit
              </p>
              <p className="text-sm mt-2">
                <strong>Sheet ID:</strong> <span className="font-mono bg-yellow-100 dark:bg-yellow-800 px-1">1DI6UBOuxRaeXQ0FXdMyfV7-5mOUrqqnnKxJiSxanKcE</span>
              </p>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevStep}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              
              <button
                onClick={handleComplete}
                disabled={!sheetId}
                className={`px-4 py-2 rounded-md ${
                  !sheetId
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-vinyl-accent text-white hover:bg-opacity-90'
                }`}
              >
                Start Using Your Vinyl Collection
              </button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6">
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-vinyl-primary text-white flex items-center justify-center text-2xl font-bold">
            {step}
          </div>
        </div>
        
        {renderStep()}
      </div>
    </div>
  );
};

export default SetupWizard;