import { useState } from 'react';
import '../stylesheets/stars.css'

// eslint-disable-next-line react/prop-types
const Stars = ({ totalStars = 0 }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className='flex w-full justify-between'>
      {[...Array(totalStars)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <label key={index} className='bg-gray-200 w-[19%] flex justify-center items-center p-1 cursor-pointer'>
            <input
              required
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
              style={{ display: 'none' }}
            />
            <svg
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            fill={ratingValue <= (hover || rating) ? "#ffc107" : "#ffffff"}
            height="45"
            width="45"
            viewBox="0 0 43 37"
            xmlns="http://www.w3.org/2000/svg"
            className="star h-12 w-12"
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