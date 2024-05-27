import React, { useState } from 'react';
import FilterWindow from '../Filter/FilterWindow.js';

const ApplyFilterButton = ({ filteredProducts, setFilteredProducts }) => {
  const [showFilterWindow, setShowFilterWindow] = useState(false);

  const handleApplyFilterClick = () => {
    setShowFilterWindow(true);
  };

  const handleCloseFilterWindow = () => {
    setShowFilterWindow(false);
  };

  return (
    <div>
      <button onClick={handleApplyFilterClick}>Apply Filter</button>
      {showFilterWindow && (
        <FilterWindow
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          onClose={handleCloseFilterWindow}
        />
      )}
    </div>
  );
};

export default ApplyFilterButton;
