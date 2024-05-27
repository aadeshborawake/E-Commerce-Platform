import { useDispatch, useSelector } from 'react-redux';
import {setPriceRange,setRating,setSelectedBrands,setSelectedCategories} from '../Redux/filterActions.js';
import PriceFilter from './PriceFilter';
import RatingFilter from './RatingFilter';
import BrandFilter from '../Code/BrandFilter.js';
import CategoryFilter from './CategoryFilter';

const FilterWindow = ({ onClose, brands, categories, onApplyFilter, originalData }) => {
  const dispatch = useDispatch();
  const filterState = useSelector((state) => state.filter);
  const { priceRange, rating, selectedBrands, selectedCategories } = filterState;

  const applyFilterPriceandRating = () => {
    if (Array.isArray(originalData)) {
      const filteredProducts = originalData.filter((product) => {
        const priceInRange =
          (priceRange.min === 0 && priceRange.max === 2500) ||
          (product.price >= priceRange.min && product.price <= priceRange.max);
  
        const ratingMatches = rating === 0 || product.rating === rating;
  
        return priceInRange && ratingMatches;
      });
      if (
        rating === 0 &&
        priceRange.min === 0 &&
        priceRange.max === 2500
      ) {
        // If all filters are cleared, show the original data
        onApplyFilter(originalData);
      } else {
        onApplyFilter(filteredProducts, filterState);
      }
    } else {
      console.error('originalData is not an array');
    }

  };

  const applyFilterBrands = () => {
    if (Array.isArray(originalData)) {
      const filteredProducts = originalData.filter((product) => {
        const brandMatches = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        return brandMatches;
      });
      onApplyFilter(filteredProducts, filterState);
    } else {
      console.error('originalData is not an array');
    }
  };
  
  const applyFilterCategory = () => {
    if (Array.isArray(originalData)) {
      const filteredProducts = originalData.filter((product) => {
        const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        return categoryMatches;
      });
      onApplyFilter(filteredProducts, filterState);
    } else {
      console.error('originalData is not an array');
    }
  };
  

  const handlePriceRangeChange = (newValue, type) => {
    dispatch(setPriceRange({ ...priceRange, [type]: newValue }));
    applyFilterPriceandRating();
  };

  const handleRatingClick = (ratingValue) => {
    dispatch(setRating(ratingValue));
    applyFilterPriceandRating();
  };


  const handleBrandChange = (brand, isChecked) => {
    dispatch(
      setSelectedBrands(
        isChecked
          ? [...selectedBrands, brand]
          : selectedBrands.filter((b) => b !== brand)
      )
    );
    applyFilterBrands();
  };
  
  const handleCategoryChange = (category, isChecked) => {
    dispatch(
      setSelectedCategories(
        isChecked
          ? [...selectedCategories, category]
          : selectedCategories.filter((c) => c !== category)
      )
    );
    applyFilterCategory();
  };
  

  const clearFilters = () => {
    dispatch(setSelectedBrands([]));
    dispatch(setSelectedCategories([]));
    setSelectedBrands([]);
    setSelectedCategories([]);
    applyFilterPriceandRating();
    onApplyFilter(originalData);
  };

  const clearpriceFilters = () => {
    dispatch(setPriceRange({ min: 0, max: 2500 }));
    setPriceRange({ min: 0, max: 2500 });
    applyFilterPriceandRating();
    onApplyFilter(originalData);
    
  };

  const clearRating = () => {
    dispatch(setRating(0));
    setRating(0);
    applyFilterPriceandRating();
    onApplyFilter(originalData); // Clear rating filter and show original data
  };
  


  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={clearFilters}style={{backgroundColor: 'red',color: 'white',padding: '5px 10px',border: 'none',borderRadius: '2px',cursor: 'pointer',}}>Clear Filter</button>
      </div>

      <div>
        <PriceFilter priceRange={priceRange} handlePriceRangeChange={handlePriceRangeChange} handleApplyPriceFilter={applyFilterPriceandRating}/>
        <button onClick={applyFilterPriceandRating} style={{marginRight: '10px',backgroundColor: 'skyblue',color: 'white',padding: '4px 10px',border: 'none',borderRadius: '2px',cursor: 'pointer',}}>Go</button>
        <button onClick={clearpriceFilters} style={{backgroundColor: 'red',color: 'white',padding: '4px 10px',border: 'none',borderRadius: '2px',cursor: 'pointer',}}>Clear</button>
      </div>

      <div>
        <RatingFilter rating={rating} handleRatingClick={handleRatingClick} clearRating={clearRating}/>
      </div>

      <div>
      <BrandFilter brands={brands} selectedBrands={selectedBrands} onBrandChange={handleBrandChange}/>
      </div>

      <div>
      <CategoryFilter categories={categories} selectedCategories={selectedCategories} onCategoryChange={handleCategoryChange}/>
      </div>

    </div>
  );
};

export default FilterWindow;





//MostUpdated
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   setPriceRange,
//   setRating,
//   setSelectedBrands,
//   setSelectedCategories,
// } from '../Redux/filterActions.js';
// import PriceFilter from './PriceFilter';
// import RatingFilter from './RatingFilter';
// import BrandFilter from '../Code/BrandFilter.js';
// import CategoryFilter from './CategoryFilter';

// const FilterWindow = ({ onClose, brands, categories, onApplyFilter, originalData }) => {
//   const dispatch = useDispatch();
//   const filterState = useSelector((state) => state.filter);
//   const { priceRange, rating, selectedBrands, selectedCategories } = filterState;

//   const applyFilter = () => {
//     if (Array.isArray(originalData)) {
//       const filteredProducts = originalData.filter((product) => {
//         const priceInRange =
//           (priceRange.min === 0 && priceRange.max === 2500) ||
//           (product.price >= priceRange.min && product.price <= priceRange.max);
  
//         const ratingMatches = rating === 0 || product.rating === rating;
  
//         const brandMatches =
//           selectedBrands.length === 0 || selectedBrands.includes(product.brand);
  
//         const categoryMatches =
//           selectedCategories.length === 0 || selectedCategories.includes(product.category);
  
//         return priceInRange && ratingMatches && (brandMatches && categoryMatches);
//       });
  
//       if (
//         selectedBrands.length === 0 &&
//         selectedCategories.length === 0 &&
//         rating === 0 &&
//         priceRange.min === 0 &&
//         priceRange.max === 2500
//       ) {
//         // If all filters are cleared, show the original data
//         onApplyFilter(originalData);
//       } else {
//         onApplyFilter(filteredProducts, filterState);
//       }
//     } else {
//       console.error('originalData is not an array');
//     }
//   };

//   const handlePriceRangeChange = (newValue, type) => {
//     dispatch(setPriceRange({ ...priceRange, [type]: newValue }));
//     applyFilter();
//   };

//   const handleRatingClick = (ratingValue) => {
//     dispatch(setRating(ratingValue));
//     applyFilter();
//   };

//   const handleBrandChange = (brand, isChecked) => {
//     dispatch(
//       setSelectedBrands(
//         isChecked
//           ? [...selectedBrands, brand]
//           : selectedBrands.filter((b) => b !== brand)
//       )
//     );
//     applyFilter();
//     onApplyFilter(null);
//   };
  
//   const handleCategoryChange = (category, isChecked) => {
//     dispatch(
//       setSelectedCategories(
//         isChecked
//           ? [...selectedCategories, category]
//           : selectedCategories.filter((c) => c !== category)
//       )
//     );
//     applyFilter();
//     onApplyFilter(null);
//   };
  

//   const clearFilters = () => {
//     setPriceRange({ min: 0, max: 2500 });
//     setRating(0);
//     setSelectedBrands([]);
//     setSelectedCategories([]);
//     applyFilter();
//     onApplyFilter(null);
//   };

//   const clearpriceFilters = () => {
//     setPriceRange({ min: 0, max: 2500 });
//     applyFilter();
//     onApplyFilter(null);
//   };

//   const clearRating = () => {
//     setRating(0);
//     applyFilter();
//     onApplyFilter(null); // Clear rating filter and show original data
//   };
  


//   return (
//     <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>

//       <div style={{ display: 'flex', gap: '6px' }}>
//         <button onClick={clearFilters}style={{backgroundColor: 'red',color: 'white',padding: '5px 10px',border: 'none',borderRadius: '2px',cursor: 'pointer',}}>Clear Filter</button>
//       </div>

//       <div>
//         <PriceFilter
//           priceRange={priceRange}
//           handlePriceRangeChange={handlePriceRangeChange}
//           handleApplyPriceFilter={applyFilter}
//         />
//         <button
//           onClick={applyFilter}
//           style={{
//             marginRight: '10px',
//             backgroundColor: 'skyblue',
//             color: 'white',
//             padding: '4px 10px',
//             border: 'none',
//             borderRadius: '2px',
//             cursor: 'pointer',
//           }}
//         >
//           Go
//         </button>
//         <button
//           onClick={clearpriceFilters}
//           style={{
//             backgroundColor: 'red',
//             color: 'white',
//             padding: '4px 10px',
//             border: 'none',
//             borderRadius: '2px',
//             cursor: 'pointer',
//           }}
//         >Clear
//         </button>
//       </div>

//       <div>
//         <RatingFilter
//           rating={rating}
//           handleRatingClick={handleRatingClick}
//           clearRating={clearRating}
//         />
//       </div>

//       <BrandFilter
//         brands={brands}
//         selectedBrands={selectedBrands}
//         onBrandChange={handleBrandChange}
//       />

//       <CategoryFilter
//         categories={categories}
//         selectedCategories={selectedCategories}
//         onCategoryChange={handleCategoryChange}
//       />


//     </div>
//   );
// };

// export default FilterWindow;







// Checkbox per item
// import React, { useState } from 'react';

// const Slider = ({ min, max, value, onChange }) => {
//   const handleSliderChange = (event) => {
//     const newValue = parseInt(event.target.value);
//     onChange(newValue);
//   };

//   return (
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={value}
//         onChange={handleSliderChange}
//         style={{ width: '100%' }}
//       />
//       <span style={{ marginLeft: '10px' }}>{value}</span>
//     </div>
//   );
// };

// const StarRating = ({ rating, onClick }) => {
//     const MAX_RATING = 5;
//     const stars = [];
  
//     for (let i = 1; i <= MAX_RATING; i++) {
//       const starColor = i <= rating ? 'gold' : 'gray';
//       stars.push(
//         <span
//           key={i}
//           style={{ color: starColor, fontSize: '1.2rem', cursor: 'pointer' }}
//           onClick={() => onClick(i)}
//         >
//           &#9733;
//         </span>
//       );
//     }
  
//     return (
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <div>{stars}</div>
//         <span style={{ marginLeft: '0.5rem' }}>
//           {rating === 0 ? 'All Ratings' : `${rating} Stars & Up`}
//         </span>
//       </div>
//     );
//   };

// const FilterWindow = ({ onClose, brands, categories, onApplyFilter, originalData }) => {
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 2500 });
//   const [rating, setRating] = useState(0);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
  

//   const handlePriceRangeChange = (newValue, type) => {
//     setPriceRange((prevRange) => ({
//       ...prevRange,
//       [type]: newValue,
//     }));
//     applyFilter();
//   };

//   const handleRatingClick = (ratingValue) => {
//     setRating(ratingValue);
//     applyFilter();
//     onApplyFilter();
//   };


// const handleBrandChange = (event) => {
//     const brand = event.target.value;
//     const isChecked = event.target.checked;
  
//     const newSelectedBrands = isChecked
//       ? [...selectedBrands, brand]
//       : selectedBrands.filter((b) => b !== brand);
  
//     setSelectedBrands(newSelectedBrands);
  
//       if (newSelectedBrands.length === 0 && selectedCategories.length === 0) {
//               onApplyFilter(null); // Show original data when no brands and categories are selected
//             } else {
//               applyFilter(newSelectedBrands, selectedCategories);
//             } // Pass the updated brands directly
//   };
  
//   const handleCategoryChange = (event) => {
//     const category = event.target.value;
//     const isChecked = event.target.checked;
  
//     const newSelectedCategories = isChecked
//       ? [...selectedCategories, category]
//       : selectedCategories.filter((c) => c !== category);
  
//     setSelectedCategories(newSelectedCategories);
    
//         if (newSelectedCategories.length === 0 && selectedBrands.length === 0) {
//     onApplyFilter(null); // Show original data when no categories and brands are selected
//     } else {
//     applyFilter(selectedBrands, newSelectedCategories);
//     }
//     };
  
//   const applyFilter = (brands=[] , categories=[] ) => {
//     // Ensure brands and categories are always treated as arrays
//     const filteredProducts = originalData.filter((product) => {
//       const priceInRange =
//         (priceRange.min === 0 && priceRange.max === 2500) ||
//         (product.price >= priceRange.min && product.price <= priceRange.max);
  
//       const ratingMatches = rating === 0 || product.rating === rating;
  
//       const brandMatches = brands.length === 0 || brands.includes(product.brand);
  
//       const categoryMatches = categories.length === 0 || categories.includes(product.category);
  
//       return priceInRange && ratingMatches && (brandMatches && categoryMatches);
//     });

//     if (brands.length === 0 && categories.length === 0) {
//         onApplyFilter(originalData); // Show original data when no checkboxes are selected
//       } else {
//         onApplyFilter(filteredProducts);
//       }
  
//     onApplyFilter(filteredProducts);
//   };

// const clearFilters = () => {
//     setPriceRange({ min: 0, max: 2500 });
//     applyFilter();
//     onApplyFilter(null);
//   };
  

//   const handleApplyPriceFilter = () => {
//     applyFilter();
//   };
  
//   const clearRating = () => {
//     setRating(0);
//     onApplyFilter(null); // Clear rating filter and show original data
//   };
  

//   return (
//     <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '5px' }}>
//       <div>
//         <h3>Price Filter</h3>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span>₹{priceRange.min}</span>
//           <Slider
//             min={0}
//             max={2500}
//             value={priceRange.min}
//             onChange={(value) => handlePriceRangeChange(value, 'min')}
//           />
//           <Slider
//             min={priceRange.min}
//             max={2500}
//             value={priceRange.max}
//             onChange={(value) => handlePriceRangeChange(value, 'max')}
//           />
//            <button onClick={handleApplyPriceFilter}>Go</button>
//           <button onClick={clearFilters}>Clear</button>
//         </div>

//         <h3>Rating Filter</h3>
//         <div>
//           <StarRating rating={4} onClick={handleRatingClick} /> 
//           <StarRating rating={3} onClick={handleRatingClick} /> 
//           <StarRating rating={2} onClick={handleRatingClick} /> 
//           <StarRating rating={1} onClick={handleRatingClick} />
//           {rating > 0 && <button onClick={clearRating}>Clear Rating</button>}
//         </div>

//         <h3>Brand Filter</h3>
//         <div>
//           {brands.map((brand) => (
//             <ul key={brand} style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
//               <input
//                 type="checkbox"
//                 value={brand}
//                 checked={selectedBrands.includes(brand)}
//                 onChange={handleBrandChange}
//                 style={{ marginRight: '5px' }}
//               />
//               <label style={{ color: 'blue' }}>{brand}</label>
//             </ul>
//           ))}
//         </div>

//         <h3>Category Filter</h3>
//         <div>
//           {categories.map((category) => (
//             <ul key={category} style={{ listStyleType: 'none', margin: '0', padding: '0' }}>
//               <input
//                 type="checkbox"
//                 value={category}
//                 checked={selectedCategories.includes(category)}
//                 onChange={handleCategoryChange}
//                 style={{ marginRight: '5px' }}
//               />
//               <label style={{ color: 'green' }}>{category}</label>
//             </ul>
//           ))}
//         </div>
//       </div>
//       <button onClick={onClose} style={{ backgroundColor: 'gray', color: 'white', marginTop: '20px', borderRadius: '3px', padding: '5px 10px', border: 'none' }}>
//         Close
//       </button>
//     </div>
//   );
// };

// export default FilterWindow;