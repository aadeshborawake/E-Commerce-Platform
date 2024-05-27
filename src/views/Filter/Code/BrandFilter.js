import React from 'react';

const BrandFilter = ({ brands, selectedBrands, onBrandChange }) => {
  const handleCheckboxChange = (event) => {
    const brand = event.target.value;
    const isChecked = event.target.checked;
    onBrandChange(brand, isChecked);
  };

  return (
    <div>
      <h3>Brand Filter</h3>
      {brands.map((brand) => (
        <div key={brand}>
          <input
            type="checkbox"
            value={brand}
            checked={selectedBrands.includes(brand)}
            onChange={handleCheckboxChange}
          />
          <label>{brand}</label>
        </div>
      ))}
    </div>
  );
};

export default BrandFilter;