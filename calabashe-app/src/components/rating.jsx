//import { FaStar } from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const StarRating = ({ rating, profile=false, search=false }) => {
  // Convert rating to a number and ensure it's within 0-5 range
  const numericRating = Math.min(5, Math.max(0, Number(rating) || 0));

  const getColor = (rating) => {
    if (rating === 0) return profile ? 'bg-gray-400' : 'bg-gray-300'
    if (rating <= 1) return 'bg-red-500';
    if (rating <= 2) return 'bg-orange-400';
    if (rating <= 3) return 'bg-yellow-300';
    if (rating <= 4) return 'bg-[#04DA33]';
    return 'bg-green-500';
  };

  const colorClass = getColor(numericRating);

  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} className={`${index < Math.floor(numericRating) ? colorClass : 'bg-gray-300'} p-1`}>
        <svg
              className={`${profile ? 'w-6 h-6 md:w-10 md:h-10' : 'w-4 h-4 md:w-6 md:h-6 lg:w-4 lg:h-4'} ${search && 'md:w-3 md:h-3 lg:w-4 lg:h-4'} text-white `}
              fill="white"
              height="45"
              width="45"
              viewBox="0 0 43 37"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.5 0.820068L26.4574 14.5708H42.5L21.5 28.3216L30.6863 23.764L34.4787 36.8201L21.5 28.3216L8.52129 36.8201L13.4787 23.0693L0.5 14.5708H16.5426L21.5 0.820068Z"/>
            </svg>
        {/* <FaStar size={profile ? 27 : 12} className={`${profile ? 'md:w-10 md:h-10' : 'md:w-6 md:h-6'} text-white `} /> */}
      </span>
    );
  });

  return (
    <div className={`${profile ? 'gap-[4px]' : 'gap-[2px]'} flex items-center`}>
      {ratingStar}
      {/* <span className={`ml-2 ${rating === 0 ? 'text-gray-700' : `text-${colorClass.split('-')[1]}-700`} text-sm font-semibold`}>
        {numericRating.toFixed(1)}
      </span> */}
    </div>
  );
};

export default StarRating;