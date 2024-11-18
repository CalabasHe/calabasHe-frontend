import { Link } from 'react-router-dom';
import banner_image from '../assets/images/join.jpg'
const ListPractice = () => {
    return (
        <div className="flex flex-col md:flex-row  gap-5 md:gap-10 w-[93%] max-w-[1100px] md:pb-16 mb-10 md:mb-5">
            <div className='md:w-[60%] rounded-sm '>
                <img src={banner_image} alt="Join calabashe" className='w-full' />
            </div>
            <div className='md:w-1/2 md:self-center leading-10 md:leading-[3rem] pb-5'>
                <h3 className='font-semibold md:font-bold my-7 text-2xl uppercase'>Calabashe for Doctors and Clinics</h3>
                <ul className="flex flex-col gap-2 md:list-none list-disc w-full">
                    <li className="my-0 w-[87%] md:w-full mx-auto">Are you a provider interested in reaching new patients?</li>
                    <li className="my-0 w-[87%] md:w-full mx-auto">Do you want to offer online consultations to your patients?</li>
                    <li className="my-0 w-[87%] md:w-full mx-auto"> Reach patients in your area looking for a new provider?</li>
                    <li className="my-0 w-[87%] md:w-full mx-auto">Fill last-minute openings in your schedule?</li>
                    <li className="my-0 w-[87%] md:w-full mx-auto">Strengthen your online reputation with verified reviews?</li>
                </ul>
                <Link to={"/initial_form"} className='block bg-custom-yellow rounded-md px-2 py-1 w-[77%] text-center mt-11 font-medium ml-7 md:ml-0'>
                    List your practice on Calabashe
                </Link>
            </div>
        </div>);
}

export default ListPractice;