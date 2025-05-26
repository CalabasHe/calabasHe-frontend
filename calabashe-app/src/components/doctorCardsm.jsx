/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import StarRating from './ratingStars';


const DoctorCard = ({ doctor }) => {
  const go = useNavigate()
  const toProfile = (slug) => {
    go(`/doctors/${slug}`)
  }
  
  return (
    <div className="min-[820px]:hidden mt-4 border bg-white shadow-md h-[420px] sm:h-[440px] md:h-[450px] flex flex-col rounded-md w-full">

      <div className="px-3 p-6 flex-none">
        <section className='w-full flex gap-2'>
          <div className='min-w-[120px] w-[33%] md:w-[30%] h-[140px] flex items-center justify-center sm:h-[180px] md:h-[190px] bg-gray-300 rounded-sm'>
          {
            doctor.image ?
            <img className='object-cover w-full h-full rounded-[inherit]' src={doctor.image} alt={`image of doctor ${doctor.lastName}`}/>
            :
            <svg
            className="justify-self-center w-20 md:w-24 fill-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-96 55.2C54 332.9 0 401.3 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7c0-81-54-149.4-128-171.1l0 50.8c27.6 7.1 48 32.2 48 62l0 40c0 8.8-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l0-24c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 24c8.8 0 16 7.2 16 16s-7.2 16-16 16l-16 0c-8.8 0-16-7.2-16-16l0-40c0-29.8 20.4-54.9 48-62l0-57.1c-6-.6-12.1-.9-18.3-.9l-91.4 0c-6.2 0-12.3 .3-18.3 .9l0 65.4c23.1 6.9 40 28.3 40 53.7c0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.4 16.9-46.8 40-53.7l0-59.1zM144 448a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
          </svg>
          }
          </div>
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
          <p className='text-sm sm:text-base'>{doctor.region}</p>
          <div className='mt-1'>
            <p className='text-[#5C6B88] text-sm sm:text-base'>Recommended for:</p>
            <div className='mt-2 text-xs sm:text-sm flex flex-wrap gap-2'>
              <p className='flex gap-0.5 truncate items-center bg-[#9EFFDF] px-2 py-1.5 rounded-3xl'>
                <span>
                  <svg className='size-4' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 2.1573C7 2.1573 2.5 6.6573 2.5 12.1573C2.5 17.6573 7 22.1573 12.5 22.1573C18 22.1573 22.5 17.6573 22.5 12.1573C22.5 6.6573 18 2.1573 12.5 2.1573ZM10.5 17.1573L5.5 12.1573L6.91 10.7473L10.5 14.3273L18.09 6.7373L19.5 8.1573L10.5 17.1573Z" fill="black"/>
                  </svg>
                </span>
                <span className='truncate text-nowrap'>{doctor.specialtyTag}</span>
              </p>
              {doctor.recommendedFor[0] &&
                <p className='bg-[#FFF29E] px-2 py-1.5 rounded-3xl max-sm:max-w-[50%] truncate'>
                  {doctor.recommendedFor[0]}
                </p>
              }
              {doctor.recommendedFor[1] &&
                <p className='bg-[#FF9ECD] px-2 py-1.5 rounded-3xl max-sm:max-w-[70%] truncate'>
                  {doctor.recommendedFor[1]}
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


      <div className="px-3 pb-4 mt-auto">
        <button 
          onClick={() => toProfile(doctor.slug)} 
          className='w-full bg-[#205CD4] text-white font-medium text-lg py-2 rounded-md'
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;