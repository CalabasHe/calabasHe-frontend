import checkmark from "../assets/icons/checkmark.svg"
import { Link } from "react-router-dom";
import { useBannerVisibility } from "../context/BannerVisibilityContext";
const WhyUs = () => {
    const { showSearchBar } = useBannerVisibility();
    return (
        <div className="w-[85%] mb:w-[43%] max-w-[650px]  mb-12 border border-gray-50 mx-auto ">
            <h1 className="font-bold text-2xl w-max mx-auto mb-5">Why Calabashe?</h1>
            <ul className="flex flex-col gap-6 w-full list-none shadow-md px-3 py-8 md:px-10 md:py-12 rounded-xl bg-white">
                <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                    <img src={checkmark} alt="checkmark" aria-hidden className='md:w-5 self-start pt-[0.2rem] md:pt-0 md:self-center' />
                    Choose doctors and clinics based on others reviews
                </li>
                <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                    <img src={checkmark} alt="checkmark" aria-hidden className='md:w-5 self-start pt-[0.2rem] md:pt-0 md:self-center' />
                    Book specialists and meet them online or in person
                </li>
                <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                    <img src={checkmark} alt="checkmark" aria-hidden className='md:w-5 self-start pt-[0.2rem] md:pt-0 md:self-center' />
                    Meet midwives, nurses and other clinicians instantly online
                </li>
                <li className="my-0 w-[87%] md:w-full mx-auto flex items-center gap-2">
                    <img src={checkmark} alt="checkmark" aria-hidden className='md:w-5 self-start pt-[0.2rem] md:pt-0 md:self-center' />
                    Review doctors to let others know and choose
                </li>
            </ul>
            <button  onClick={showSearchBar} className="rounded-full my-8 p-3 bg-green-700 block w-[50%] md:w-[35%] text-center text-white font-bold mx-auto"
            >Leave a  Review</button>
        </div >
    );
}

export default WhyUs;