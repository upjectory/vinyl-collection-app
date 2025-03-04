import React from 'react';
import { FaTable, FaThLarge, FaChartBar, FaCog } from 'react-icons/fa';
import config from '../config';

/**
 * Header component
 * 
 * @param {Object} props Component props
 * @param {Function} props.toggleViewMode Function to toggle between grid and table view
 * @param {string} props.viewMode Current view mode ('grid' or 'table')
 * @param {Function} props.toggleStatsModal Function to show/hide the stats modal
 * @param {Function} props.openSetupWizard Function to open the setup wizard
 */
const Header = ({ toggleViewMode, viewMode, toggleStatsModal, openSetupWizard }) => {
  return (
    <header className="bg-black text-white shadow-lg py-6 border-b border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl md:text-3xl font-bold">
            <span className="text-blue-400">much@</span>
            <span className="text-green-400">moreintricate</span>
            <span className="text-purple-400">.com</span>
          </h1>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={openSetupWizard}
            className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            title="Setup Google Sheet"
          >
            <FaCog className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleStatsModal}
            className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            title="View Collection Stats"
          >
            <FaChartBar className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleViewMode}
            className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            title={`Switch to ${viewMode === 'grid' ? 'table' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <FaTable className="h-5 w-5" />
            ) : (
              <FaThLarge className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;