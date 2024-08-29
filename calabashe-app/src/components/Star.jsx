import { useState } from 'react';
import '../stylesheets/stars.css'

// eslint-disable-next-line react/prop-types
const Stars = ( ) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const getColor = (value) => {
    if (value === 0) return 'bg-gray-300'
    if (value <= 1) return 'bg-red-500';
    if (value <= 2) return 'bg-orange-400';
    if (value <= 3) return 'bg-yellow-300';
    if (value <= 4) return 'bg-[#04DA33]';
    return 'bg-green-600';
  };

  const currentValue = hover || rating;

  return (
    <div className='flex gap-[1px]'>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label 
            key={index}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(ratingValue)}
            className={`w-8 h-8 flex justify-center items-center cursor-pointer transition-colors duration-200 
              ${ratingValue <= currentValue ? getColor(currentValue) : 'bg-gray-300'}`}
          >
            <input
              required
              type="radio"
              name="rating"
              value={ratingValue}
              style={{ display: 'none' }}
            />
            <svg
              fill="white"
              height="45"
              width="45"
              viewBox="0 0 43 37"
              xmlns="http://www.w3.org/2000/svg"
              className="star h-6 w-6"
            >
              <path d="M21.5 0.820068L26.4574 14.5708H42.5L21.5 28.3216L30.6863 23.764L34.4787 36.8201L21.5 28.3216L8.52129 36.8201L13.4787 23.0693L0.5 14.5708H16.5426L21.5 0.820068Z"/>
            </svg>
          </label>
        );
      })}
    </div>
  );
};

export default Stars;