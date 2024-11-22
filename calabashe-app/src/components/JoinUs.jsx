import { Link } from 'react-router-dom';
import banner_image from '../assets/images/join.jpg'
import checkmark from '../assets/icons/checkmark.svg'

const JoinUs = () => {
    return (
        <div className='w-full flex items-center justify-center py-14 mb-5'>
            <div className="flex flex-col md:flex-row gap-5 md:gap-10 w-[93%] max-w-[1100px] h-full border-t border-r border-gray-100 rounded-lg shadow-md border bg-white">
                <div
                    className="md:w-1/2 rounded-t-lg md:rounded-r-none md:rounded-l-lg bg-cover bg-center min-h-[400px] md:min-h-[auto]"
                    style={{ backgroundImage: `url(${banner_image})` }}
                >
                </div>
                <div className='md:w-1/2 md:self-center leading-10 md:leading-[3rem] pb-5 pr-1 rounded-r-lg '>
                    <h3 className='font-semibold md:font-bold my-7 text-2xl uppercase text-center md:text-start'>Calabashe for Doctors and Clinics</h3>
                    <ul className="flex flex-col gap-2 w-full list-none">
                        <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                            <img src={checkmark} alt="checkmark" aria-hidden className='md:w-6 self-start pt-2 md:pt-0 md:self-center' />
                            Are you a provider interested in reaching new patients?
                        </li>
                        <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                            <img src={checkmark} alt="checkmark" aria-hidden className='md:w-6 self-start pt-2 md:pt-0 md:self-center' />
                            Do you want to offer online consultations to your patients?
                        </li>
                        <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                            <img src={checkmark} alt="checkmark" aria-hidden className='md:w-6 self-start pt-2 md:pt-0 md:self-center' />
                            Reach patients in your area looking for a new provider?
                        </li>
                        <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                            <img src={checkmark} alt="checkmark" aria-hidden className='md:w-6 self-start pt-2 md:pt-0 md:self-center' />
                            Fill last-minute openings in your schedule?
                        </li>
                        <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                            <img src={checkmark} alt="checkmark" aria-hidden className='md:w-6 self-start pt-2 md:pt-0 md:self-center' />
                            Strengthen your online reputation with verified reviews?
                        </li>
                    </ul>
                    <Link to={"/initial_form"} className='block bg-custom-yellow rounded-md px-2 py-1 w-[77%] text-center mt-11 font-medium ml-7 md:ml-0'>
                        List your practice on Calabashe
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default JoinUs;