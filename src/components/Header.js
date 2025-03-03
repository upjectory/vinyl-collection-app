import React from 'react';
import { FaTable, FaThLarge, FaChartBar, FaCog } from 'react-icons/fa';
import config from '../config';

const Header = ({ toggleViewMode, viewMode, toggleStatsModal, openSetupWizard }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-vinyl-primary">{config.appTitle || 'Vinyl Collection'}</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={openSetupWizard}
            className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            title="Setup Google Sheet"
          >
            <FaCog className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleStatsModal}
            className="p-2 rounded-md bg-vinyl-accent text-white hover:bg-opacity-90"
            title="View Collection Stats"
          >
            <FaChartBar className="h-5 w-5" />
          </button>
          
          <button
            onClick={toggleViewMode}
            className="p-2 rounded-md bg-vinyl-primary text-white hover:bg-opacity-90"
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