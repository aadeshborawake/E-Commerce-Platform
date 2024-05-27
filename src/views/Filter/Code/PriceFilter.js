import React from 'react';
import Slider from './Slider';

const PriceFilter = ({ priceRange, handlePriceRangeChange }) => {
  return (
    <div>
      <h3>Price Filter</h3>
      <div style={{ display: 'flex', alignItems: 'center' }}>   
        <Slider
          min={0}
          max={2500}
          value={priceRange.max}
          onChange={(value) => handlePriceRangeChange(value, 'max')}
        />
      </div>
    </div>
  );
};

export default PriceFilter;