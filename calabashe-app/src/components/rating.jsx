import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  // Convert rating to a number and ensure it's within 0-5 range
  const numericRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const getColor = (rating) => {
    if (rating == 0) return 'text-gray-300';
    if (rating < 2) return 'text-red-500';
    if (rating < 3) return 'text-orange-400';
    if (rating < 3.5) return 'text-yellow-300';
    if (rating < 4) return 'text-green-500';
    return 'text-green-700';
  };

  const colorClass = getColor(numericRating);

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let number = index + 0.5;
    return (
      <span key={index} className={`${colorClass}`}>
        {numericRating >= index + 1 ? (
          <FaStar />
        ) : numericRating >= number ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar className='text-gray-300' />
        )}
      </span>
    );
  });

  return (
    <div className="flex items-center">
      {ratingStar}
      <span className={`ml-2 ${rating == 0?  'text-gray-700': colorClass} text-sm font-semibold`}>
        {numericRating.toFixed(1)}
      </span>
    </div>
  );
};

export default StarRating;
