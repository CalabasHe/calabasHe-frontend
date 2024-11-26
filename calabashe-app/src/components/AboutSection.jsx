import mainImage from '../assets/images/about_us_header.png'

const AboutSection = () => {
    return (
        <div className="pt-12 md:py-14 md:pt-16 flex items-center justify-center flex-col text-center gap-12">
            <h1 className='text-3xl font-bold'>About Calabashe</h1>
            <div className='w-[70%] md:w-[35%] mx-auto'>
                <img src={mainImage} alt="Banner Image" className='w-full' />
            </div>
            <div className='flex gap-3 flex-col w-[75%] md:w-[50%] mx-auto text-xl md:text-3xl'>
                <p>
                Calabashe enhances Ghanaian healthcare with reviews, connects patients and providers, and makes telemedicine and quality care easily accessible.
                </p>
            </div>
            <div className='leading-loose'>
                <div className='bg-orange-200 flex flex-col w-full md:flex-row px-12 py-20 gap-7 md:gap-5 justify-center items-center min-w-[500px] md:text-start'>
                    <div className='w-full md:w-[50%]'>
                        <img src={mainImage} alt="At Calabashe" className='w-[90%] md:w-[70%] mx-auto' />
                    </div>
                    <div className='w-[90%] md:w-[50%] self-start pt-5 mx-auto'>
                        <h1 className='text-5xl md:text-6xl font-semibold mb-2 '>At Calabashe</h1>
                        <p className='text-xl leading-9 '>We believe everyone deserves access to trusted
                            healthcare services and professionals. That’s
                            why we’ve created Ghana’s first platform where
                            patients can seamlessly connect with doctors,
                            clinics, and hospitals for the care they need.</p>
                    </div>
                </div>
                <div className='flex flex-col w-full md:flex-row px-12 py-20 gap-7 md:gap-5 justify-center items-center min-w-[500px] md:text-start'>
                    <div className='w-full md:w-[50%] order-1 md:order-2'>
                        <img src={mainImage} alt="At Calabashe" className='w-[90%] md:w-[70%] mx-auto' />
                    </div>
                    <div className='w-[90%] md:w-[50%] self-start pt-5 mx-auto order-2 md:order-1'>
                        <h1 className='text-5xl md:text-6xl font-semibold mb-2 flex gap-2 flex-col'><span>Navigating</span> <span>healthcare</span></h1>
                        <p className='text-xl leading-9 '>It can be challenging to find the right specialist to book an appointment. Calabashe simplifies this process by providing a one-stop platform that profiles Ghanaian healthcare professionals and facilities. Patients can easily browse reviews, compare services, and make informed decisions with confidence.</p>
                    </div>
                </div>
                <div className='flex flex-col w-full md:flex-row px-12 py-20 gap-7 md:gap-5 justify-center items-center min-w-[500px] md:text-start bg-custom-green'>
                    <div className='w-full md:w-[50%]'>
                        <img src={mainImage} alt="At Calabashe" className='w-[90%] md:w-[70%] mx-auto' />
                    </div>
                    <div className='w-[90%] md:w-[50%] self-start pt-5 mx-auto'>
                        <h1 className='text-5xl md:text-6xl font-semibold mb-2'>For doctors & healthcare providers</h1>
                        <p className='text-xl leading-9 '>Calabashe offers a unique opportunity to grow their practice by connecting with patients in a streamlined, professional manner. Our platform is designed to support Ghana’s healthcare system by ensuring quality care is both accessible and transparent.</p>
                    </div>
                </div>
                <div className='flex flex-col w-full md:flex-row px-12 py-20 gap-7 md:gap-5 justify-center items-center min-w-[500px] md:text-start bg-yellow-100'>
                    <div className='w-full md:w-[50%] order-1 md:order-2'>
                        <img src={mainImage} alt="At Calabashe" className='w-[90%] md:w-[70%] mx-auto' />
                    </div>
                    <div className='w-[90%] md:w-[50%] self-start pt-5 mx-auto order-2 md:order-1'>
                        <h1 className='text-5xl md:text-6xl font-semibold mb-2 flex gap-1 flex-col'>We’re not just a <span>marketplace</span></h1>
                        <p className='text-xl leading-9 '>We’re a community dedicated to improving healthcare for everyone in Ghana. By combining modern technology with local expertise.</p>
                    </div>
                </div>
                <div className='flex items-center justify-center w-[75%] md:w-[70%] mx-auto py-14 flex-col gap-8'>
                    <h1 className='text-4xl leading-snug'>Calabashe is building a future where healthcare is
                        easy to navigate and empowers both
                        patients and providers.</h1>
                        <p className='text-green-500 text-xl'>This is healthcare, the Calabashe way.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutSection;