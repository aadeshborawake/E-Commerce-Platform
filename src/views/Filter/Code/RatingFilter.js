import React from 'react';
import StarRating from './StarRating';

const RatingFilter = ({ rating, handleRatingClick, clearRating }) => {
return (
    <div>
    <h3>Rating Filter</h3>
    <div>
        <StarRating rating={4} onClick={handleRatingClick} /> 
        <StarRating rating={3} onClick={handleRatingClick} /> 
        <StarRating rating={2} onClick={handleRatingClick} /> 
        <StarRating rating={1} onClick={handleRatingClick} />
        {rating > 0 && <button onClick={clearRating}>Clear Rating</button>}
    </div>
    </div>
);
};

export default RatingFilter;
