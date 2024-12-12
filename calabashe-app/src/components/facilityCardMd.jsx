/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import StarRating from './ratingStars';
import formatDate from '../utils/dateConversion';
import HospitalIcon from '../assets/icons/hospital-icon.svg'

const FacilityCardMd = ({ facility }) => {
  const go = useNavigate()
  const toProfile = (type,slug) => {
    go(`/facilities/${type.toLowerCase().replace(' ', '-') + 's/' + slug}`)
  }

  return (
    <div
      key={facility.id}
      className="max-[819px]:hidden cursor-pointer duration-300 border-2 bg-white shadow-md md:h-[240px] lg:h-[280px] max-w-[1100px] rounded-md w-[98%] px-4 lg:px-6 lg:py-1 flex justify-between md:gap-6"
    >
     <section className='min-w-[25%] w-3/4 py-3 px-2 pb-3 flex flex-col justify-between'>
      <div className='flex gap-5'>
      <div className='min-w-28 lg:min-w-36 size-28 lg:size-36 flex items-center justify-center bg-gray-300 rounded-full'>
          {
            facility.logo ?
            <img className='object-cover shadow-md w-full h-full rounded-[inherit]' src={facility.logo} alt={`logo of ${facility.lastName}`}/>
            :
            <img className='md:size-14 lg:size-20' src={HospitalIcon} alt='default facility icon' />
          }
        </div>
        <div className='flex flex-col pt-1 gap-2 truncate'>
          <div className='space-y-0.5'>
            <p className='font-bold text-xl lg:text-2xl overflow-hidden text-ellipsis whitespace-nowrap'>
              {facility.name}
            </p>
            <p className='text-xs lg:text-sm'>{facility.type}</p>
          </div>
          <div className='flex items-center gap-5 text-xs font-medium'>
            {/* { facility.experience && 
            <div className='flex gap-1 items-center'>
              <svg className='size-6' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.25 3.31177H4.75C3.64543 3.31177 2.75 4.2072 2.75 5.31177V19.8118C2.75 20.9163 3.64543 21.8118 4.75 21.8118H19.25C20.3546 21.8118 21.25 20.9163 21.25 19.8118V5.31177C21.25 4.2072 20.3546 3.31177 19.25 3.31177Z" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.375 10.3118C15.8114 10.3118 15.2709 10.0879 14.8724 9.68937C14.4739 9.29085 14.25 8.75035 14.25 8.18677C14.25 7.62318 14.0261 7.08268 13.6276 6.68417C13.2291 6.28565 12.6886 6.06177 12.125 6.06177H11.875C11.3114 6.06177 10.7709 6.28565 10.3724 6.68417C9.97388 7.08268 9.75 7.62318 9.75 8.18677C9.75 8.75035 9.52612 9.29085 9.1276 9.68937C8.72909 10.0879 8.18859 10.3118 7.625 10.3118C7.06141 10.3118 6.52091 10.5357 6.1224 10.9342C5.72388 11.3327 5.5 11.8732 5.5 12.4368V12.6868C5.5 13.2504 5.72388 13.7909 6.1224 14.1894C6.52091 14.5879 7.06141 14.8118 7.625 14.8118C8.18859 14.8118 8.72909 15.0357 9.1276 15.4342C9.52612 15.8327 9.75 16.3732 9.75 16.9368C9.75 17.5004 9.97388 18.0409 10.3724 18.4394C10.7709 18.8379 11.3114 19.0618 11.875 19.0618H12.125C12.6886 19.0618 13.2291 18.8379 13.6276 18.4394C14.0261 18.0409 14.25 17.5004 14.25 16.9368C14.25 16.3732 14.4739 15.8327 14.8724 15.4342C15.2709 15.0357 15.8114 14.8118 16.375 14.8118C16.9386 14.8118 17.4791 14.5879 17.8776 14.1894C18.2761 13.7909 18.5 13.2504 18.5 12.6868V12.4368C18.5 11.8732 18.2761 11.3327 17.8776 10.9342C17.4791 10.5357 16.9386 10.3118 16.375 10.3118Z" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.685 14.0642C16.2866 13.6657 16.0627 13.1253 16.0627 12.5617C16.0627 11.9982 16.2866 11.4577 16.685 11.0592C17.0835 10.6607 17.3073 10.1203 17.3073 9.55674C17.3073 8.9932 17.0835 8.45275 16.685 8.05424L16.508 7.87724C16.1095 7.47879 15.5691 7.25494 15.0055 7.25494C14.442 7.25494 13.9015 7.47879 13.503 7.87724C13.3057 8.07461 13.0714 8.23117 12.8136 8.33799C12.5557 8.44481 12.2794 8.49979 12.0003 8.49979C11.7212 8.49979 11.4448 8.44481 11.187 8.33799C10.9291 8.23117 10.6949 8.07461 10.4975 7.87724C10.099 7.47879 9.55857 7.25494 8.99503 7.25494C8.4315 7.25494 7.89104 7.47879 7.49253 7.87724L7.31553 8.05374C6.91708 8.45225 6.69324 8.9927 6.69324 9.55624C6.69324 10.1198 6.91708 10.6602 7.31553 11.0587C7.5129 11.2561 7.66947 11.4903 7.77628 11.7482C7.8831 12.006 7.93808 12.2824 7.93808 12.5615C7.93808 12.8406 7.8831 13.1169 7.77628 13.3748C7.66947 13.6326 7.5129 13.8669 7.31553 14.0642C6.91708 14.4627 6.69324 15.0032 6.69324 15.5667C6.69324 16.1303 6.91708 16.6707 7.31553 17.0692L7.49203 17.2462C7.89054 17.6447 8.431 17.8685 8.99453 17.8685C9.55807 17.8685 10.0985 17.6447 10.497 17.2462C10.6944 17.0489 10.9286 16.8923 11.1865 16.7855C11.4443 16.6787 11.7207 16.6237 11.9998 16.6237C12.2789 16.6237 12.5552 16.6787 12.8131 16.7855C13.0709 16.8923 13.3052 17.0489 13.5025 17.2462C13.901 17.6447 14.4415 17.8685 15.005 17.8685C15.5686 17.8685 16.109 17.6447 16.5075 17.2462L16.6845 17.0697C17.083 16.6712 17.3068 16.1308 17.3068 15.5672C17.3068 15.0037 17.083 14.4632 16.6845 14.0647" stroke="black" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
                <p>{facility.experience} Yrs experience</p>
            </div>
              } */}
            { facility.isVerified &&
              <div className='flex gap-1 items-center'>
                <svg className='size-5' width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M8 12.5618L11 15.5618L16 8.56177M4 11.8138C4 19.5008 10.918 22.2008 11.887 22.5418C11.9623 22.5684 12.0377 22.5684 12.113 22.5418C13.084 22.2118 20 19.5798 20 11.8148V4.86577C20.0002 4.7764 19.9705 4.68953 19.9156 4.61903C19.8607 4.54852 19.7837 4.49844 19.697 4.47677L12.097 2.57377C12.0333 2.55785 11.9667 2.55785 11.903 2.57377L4.303 4.47677C4.2163 4.49844 4.13935 4.54852 4.08443 4.61903C4.02952 4.68953 3.99979 4.7764 4 4.86577V11.8138Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Verified</p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='w-full font-medium space-y-2 text-xs'>
       <p className='text-nowrap truncate'>{facility.location} - {facility.region}</p>
       <div className='w-full flex items-center gap-2'>
        <p className='text-[#5C6B88] font-normal'>Recommended for :</p>
        <div className='flex gap-2'>
          <p className='flex gap-0.5 items-center bg-[#9EFFDF] px-2 py-1.5 rounded-3xl'>
            <span>
              <svg className='size-4' width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 2.1573C7 2.1573 2.5 6.6573 2.5 12.1573C2.5 17.6573 7 22.1573 12.5 22.1573C18 22.1573 22.5 17.6573 22.5 12.1573C22.5 6.6573 18 2.1573 12.5 2.1573ZM10.5 17.1573L5.5 12.1573L6.91 10.7473L10.5 14.3273L18.09 6.7373L19.5 8.1573L10.5 17.1573Z" fill="black"/>
              </svg>
            </span>
            {facility.type}
          </p>
          {
            facility.services[0] &&
            <p className='bg-[#FFF29E] px-2 py-1.5 rounded-3xl max-lg:max-w-[70px] truncate'>{facility.services[0]?.name}</p>
          }
          {
            facility.services[1] &&
            <p className='bg-[#FF9ECD] px-2 py-1.5 rounded-3xl max-lg:max-w-[70px] truncate'>{facility.services[1]?.name}</p>
          }
          {
            facility.services.length > 3 &&
            <p className='bg-[#FF9EA0] px-2 py-1.5 rounded-3xl'> +{facility.services.length - 2}</p>
          }
        </div>
       </div>
       {facility.reviewCount >  0 ? (
        <div className=' text-[#5C6B88] font-normal'>
          <p className='line-clamp-1'>{facility.reviews[0].description}</p>
          <div className=' flex items-center gap-3 text-[.5rem]'>
            <p>
              {formatDate(facility.reviews[0].created_at)}
            </p>
            <div className='flex items-center gap-0.5'>
              <svg className='size-2.5' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0667 8.33332L15 9.27332L10.6467 13.6667L8.33333 11.3333L9.26667 10.3933L10.6467 11.78L14.0667 8.33332ZM7.33333 2.66666C8.04058 2.66666 8.71885 2.94761 9.21895 3.4477C9.71905 3.9478 10 4.62608 10 5.33332C10 6.04057 9.71905 6.71884 9.21895 7.21894C8.71885 7.71904 8.04058 7.99999 7.33333 7.99999C6.62609 7.99999 5.94781 7.71904 5.44772 7.21894C4.94762 6.71884 4.66667 6.04057 4.66667 5.33332C4.66667 4.62608 4.94762 3.9478 5.44772 3.4477C5.94781 2.94761 6.62609 2.66666 7.33333 2.66666ZM7.33333 3.99999C6.97971 3.99999 6.64057 4.14047 6.39052 4.39051C6.14048 4.64056 6 4.9797 6 5.33332C6 5.68695 6.14048 6.02608 6.39052 6.27613C6.64057 6.52618 6.97971 6.66666 7.33333 6.66666C7.68696 6.66666 8.02609 6.52618 8.27614 6.27613C8.52619 6.02608 8.66667 5.68695 8.66667 5.33332C8.66667 4.9797 8.52619 4.64056 8.27614 4.39051C8.02609 4.14047 7.68696 3.99999 7.33333 3.99999ZM7.33333 8.66666C7.78667 8.66666 8.33333 8.72666 8.94 8.83999L7.82667 9.95332L7.33333 9.93332C5.35333 9.93332 3.26667 10.9067 3.26667 11.3333V12.0667H7.4L8.66667 13.3333H2V11.3333C2 9.55999 5.55333 8.66666 7.33333 8.66666Z" fill="#5C6B88"/>
              </svg>
              <p className='self-end'>Verified Patient</p>
            </div>
          </div>
        </div>
       ) :
        <p className='text-[#5C6B88]'>No reviews yet</p>
       }
      </div>
     </section>
     <section className='w-1/4 py-4 lg:py-5 lg:pb-6 px-2 flex flex-col items-center justify-between'>
        {
          facility.reviewCount < 0 ? (
            <div className='py-4'>
              <p className='text-base font-medium italic text-center text-slate-400'> No reviews yet</p>
            </div>
          ):(
          <div className='w-full text-xs font-semibold space-y-3'>
            <p>{facility.rating.toFixed(1)} RATING</p>
            <StarRating rating={facility.rating}/>
            <p className={`${facility.reviewCount === 0 && 'text-[#5C6B88] italic'}`}>{facility.reviewCount === 0 ? 'No' : facility.reviewCount} Patient {facility.reviewCount === 1 ? 'Review' : 'Reviews'}</p>
          </div>
          )
        }
        <button onClick={() => toProfile(facility.type, facility.slug)} className='bg-[#205CD4] text-center text-lg font-medium py-3.5 lg:py-4 rounded-md text-white w-full' to={`/facilitys/${facility.slug}`} >
          View Profile
        </button>
     </section>
    </div>
  );
};

export default FacilityCardMd;