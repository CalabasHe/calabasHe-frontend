/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import StarRating from './rating';

const FacilityCardSm = ({ facility }) => {
  const go = useNavigate()
  const toProfile = (type,slug) => {
    go(`/facilities/${type.toLowerCase() + 's/' + slug}`)
  }
  
  return (
    <div className="min-[820px]:hidden border bg-white shadow-md h-[420px] sm:h-[440px] flex flex-col rounded-md w-full">

      <div className="px-3 p-6 flex-none">
        <section className='w-full flex gap-2'>
          <div className='min-w-[130px] w-[35%] h-[140px] sm:h-[180px] bg-gray-300 rounded-sm' />
          <div className='max-w-[63%] text-xs sm:text-sm flex flex-col sm:py-2 justify-between flex-grow truncate'>
            <p className='text-lg font-medium truncate'>
              {facility.name}
            </p>
            <p className='truncate'>{facility.type}</p>
            <p>{facility.rating.toFixed(1)} Rating</p>
            <StarRating rating={facility.rating} />
            {
              facility.reviewCount > 0 ? (
                <p>{facility.reviewCount} PATIENT {facility.reviewCount > 1 ? 'REVIEWS' : 'REVIEW'}</p>
              ) : (
                <p className='italic text-[#5C6B88]'>No patient reviews</p>
              )
            }
          </div>
        </section>
      </div>


      <div className="px-3 flex-none h-[120px]">
        <section className='w-full font-medium'>
          <p className='text-sm sm:text-base'>{facility.location}</p>
          <div className='mt-1'>
            <p className='text-[#5C6B88] text-sm sm:text-base'>Recommended for:</p>
            <div className='mt-2 text-xs sm:text-sm flex flex-wrap gap-2'>
              <p className='flex gap-0.5 items-center truncate bg-[#9EFFDF] px-2 py-1.5 rounded-3xl'>
                <span>
                  <svg className='size-4' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2.1573C7 2.1573 2.5 6.6573 2.5 12.1573C2.5 17.6573 7 22.1573 12.5 22.1573C18 22.1573 22.5 17.6573 22.5 12.1573C22.5 6.6573 18 2.1573 12.5 2.1573ZM10.5 17.1573L5.5 12.1573L6.91 10.7473L10.5 14.3273L18.09 6.7373L19.5 8.1573L10.5 17.1573Z" fill="black"/>
                  </svg>
                </span>
                <span className='truncate text-nowrap'>
                 {facility.type} 
                </span> 
              </p>
              {facility.services[0] &&
                <p className='bg-[#FFF29E] px-2 py-1.5 rounded-3xl max-sm:max-w-[50%] truncate'>
                  {facility.services[0]?.name}
                </p>
              }
              {facility.services[1] &&
                <p className='bg-[#FF9ECD] px-2 py-1.5 rounded-3xl max-sm:max-w-[70%] truncate'>
                  {facility.services[1]?.name}
                </p>
              }
              {facility.services.length > 3 &&
                <p className='bg-[#FF9EA0] px-2 py-1.5 rounded-3xl'>
                  +{facility.services.length - 2}
                </p>
              }
            </div>
          </div>
        </section>
      </div>


      <div className="px-3 pb-4 mt-auto">
        <button 
          onClick={() => toProfile(facility.type ,facility.slug)} 
          className='w-full bg-[#205CD4] text-white font-medium text-lg py-2 rounded-md'
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default FacilityCardSm;