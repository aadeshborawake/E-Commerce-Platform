import React from 'react';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const handleCheckboxChange = (event) => {
    const category = event.target.value;
    const isChecked = event.target.checked;
    onCategoryChange(category, isChecked);
  };

  return (
    <div>
      <h3>Category Filter</h3>
      {categories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={handleCheckboxChange}
          />
          <label>{category}</label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;