import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  // Convert rating to a number and ensure it's within 0-5 range
  const numericRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const getColor = (rating) => {
    if (rating === 0) return 'bg-gray-300';
    if (rating < 2) return 'bg-red-500';
    if (rating < 3) return 'bg-orange-400';
    if (rating < 3.5) return 'bg-yellow-300';
    if (rating < 4) return 'bg-green-500';
    return 'bg-green-700';
  };

  const colorClass = getColor(numericRating);

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} className={`${index < Math.floor(numericRating) ? colorClass : 'bg-gray-300'} p-1`}>
        <FaStar className="text-white" />
      </span>
    );
  });

  return (
    <div className="flex items-center gap-1">
      {ratingStar}
      {/* <span className={`ml-2 ${rating === 0 ? 'text-gray-700' : `text-${colorClass.split('-')[1]}-700`} text-sm font-semibold`}>
        {numericRating.toFixed(1)}
      </span> */}
    </div>
  );
};

export default StarRating;