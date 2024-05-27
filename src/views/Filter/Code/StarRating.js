const StarRating = ({ rating, onClick }) => {
    const MAX_RATING = 5;
    const stars = [];
  
    for (let i = 1; i <= MAX_RATING; i++) {
      const starColor = i <= rating ? 'gold' : 'gray';
      stars.push(
        <span
          key={i}
          style={{ color: starColor, fontSize: '1.2rem', cursor: 'pointer' }}
          onClick={() => onClick(i)}
        >
          &#9733;
        </span>
      );
    }
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>{stars}</div>
        <span style={{ marginLeft: '0.5rem' }}>
          {rating === 0 ? 'All Ratings' : `${rating} Stars & Up`}
        </span>
      </div>
    );
  };

  export default StarRating;