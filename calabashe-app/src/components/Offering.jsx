
import consultation from '../assets/images/consult.png'
import near_you from '../assets/images/near_you.png'
import surgery from '../assets/images/surgeries.png'




const Offering = () => {
    return (
        <div className="mb-5 w-full">
            <h1 className="text-3xl font-semibold mb-10 text-center">Our Offering</h1>
            <div className="flex flex-row md:flex-row mx-auto w-full justify-center gap-6 md:gap-10">
                <div
                     className='shadow-md rounded-2xl flex-col  md:mx-0  w-[40%]  md:w-[28%] min-h-[300px] lg:w-[20%] bg-contain bg-no-repeat relative bg-[#98CBD6] bg-center'
                    style={{ backgroundImage: `url(${consultation})` }}
                >
                    <div className="px-5 p-0.5 md:p-4 w-full absolute bg-white bottom-0 h-[32%] md:h-[30%] rounded-b-2xl">
                        <h3 className="font-semibold md:text-xl">Instant video consultation</h3>
                        <p className='text-sm mt-1 md:mt-0 md:text-md'>Connect within 60s</p>
                    </div>
                </div>

                <div
                    className='shadow-md rounded-2xl flex-col  md:mx-0 w-[40%] md:w-[28%] min-h-[300px] lg:w-[20%] bg-contain bg-no-repeat relative bg-[#98CBD6] bg-center'
                    style={{ backgroundImage: `url(${near_you})` }}
                >
                    <div className="h-[32%] md:h-[30%] absolute md:inset-x-0 bottom-0 p-0.5 md:p-4 bg-white rounded-b-2xl w-full">
                        <div className="max-w-[90%] mx-auto">
                            <h3 className="font-semibold  md:text-xl">Find doctors near you</h3>
                            <p className='text-sm mt-1 md:mt-1 md:text-md'>Confirmed appointment</p>
                        </div>
                    </div>

                </div>

                <div
                    className='hidden md:block shadow-md rounded-2xl flex-col mx-auto md:mx-0 w-[65%] md:w-[28%] min-h-[23rem] lg:w-[20%]  bg-contain bg-no-repeat relative bg-[#D7DAFC] md:bg-center'
                    style={{ backgroundImage: `url(${surgery})` }}
                >
                    <div className="p-4 w-full absolute bg-white bottom-0 h-[32%] md:h-[30%] rounded-b-2xl">
                        <h3 className="font-semibold text-xl">Surgeries</h3>
                        <p>Safe and trusted surgery centers</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Offering;