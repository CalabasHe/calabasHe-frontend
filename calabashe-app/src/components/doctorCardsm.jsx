/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import StarRating from './rating';

const DoctorCard = ({ doctor }) => {
  const go = useNavigate()
  const toProfile = (slug) => {
    go(`/doctors/${slug}`)
  }
  
  return (
    <div className="min-[820px]:hidden mt-4 border bg-white shadow-md h-[440px] flex flex-col rounded-md w-full">

      <div className="px-3 p-6 flex-none">
        <section className='w-full flex gap-2'>
          <div className='min-w-[130px] w-[35%] h-[140px] sm:h-[180px] bg-gray-300 rounded-sm' />
          <div className='max-w-[63%] text-xs sm:text-sm flex flex-col sm:py-2 justify-between flex-grow truncate'>
            <p className='text-lg font-medium truncate'>
              Dr. {doctor.lastName} {doctor.firstName}
            </p>
            <p className='truncate'>{doctor.specialtyTag}</p>
            <p>{doctor.rating.toFixed(1)} Rating</p>
            <StarRating rating={doctor.rating} />
            {
              doctor.reviewCount > 0 ? (
                <p>{doctor.reviewCount} PATIENT {doctor.reviewCount > 1 ? 'REVIEWS' : 'REVIEW'}</p>
              ) : (
                <p className='italic text-[#5C6B88]'>No patient reviews</p>
              )
            }
          </div>
        </section>
      </div>


      <div className="px-3 flex-none h-[120px]">
        <section className='w-full font-medium'>
          <p>{doctor.region}</p>
          <div className='mt-1'>
            <p className='text-[#5C6B88]'>Recommended for:</p>
            <div className='mt-2 text-sm flex flex-wrap gap-2'>
              <p className='flex gap-0.5 items-center bg-[#9EFFDF] px-2 py-1.5 rounded-3xl'>
                <span>
                  <svg className='size-4' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2.1573C7 2.1573 2.5 6.6573 2.5 12.1573C2.5 17.6573 7 22.1573 12.5 22.1573C18 22.1573 22.5 17.6573 22.5 12.1573C22.5 6.6573 18 2.1573 12.5 2.1573ZM10.5 17.1573L5.5 12.1573L6.91 10.7473L10.5 14.3273L18.09 6.7373L19.5 8.1573L10.5 17.1573Z" fill="black"/>
                  </svg>
                </span>
                {doctor.specialty}
              </p>
              {doctor.recommendedFor[0] &&
                <p className='bg-[#FFF29E] px-2 py-1.5 rounded-3xl max-sm:max-w-[50%] truncate'>
                  {doctor.recommendedFor[0]?.name}
                </p>
              }
              {doctor.recommendedFor[1] &&
                <p className='bg-[#FF9ECD] px-2 py-1.5 rounded-3xl max-sm:max-w-[70%] truncate'>
                  {doctor.recommendedFor[1]?.name}
                </p>
              }
              {doctor.recommendedFor.length > 3 &&
                <p className='bg-[#FF9EA0] px-2 py-1.5 rounded-3xl'>
                  +{doctor.recommendedFor.length - 2}
                </p>
              }
            </div>
          </div>
        </section>
      </div>


      <div className="px-3 p-6 mt-auto">
        <button 
          onClick={() => toProfile(doctor.slug)} 
          className='w-full bg-[#205CD4] text-white font-medium text-xl py-3 rounded-sm'
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;