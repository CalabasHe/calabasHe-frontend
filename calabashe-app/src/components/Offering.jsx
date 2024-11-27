
import consultation from '../assets/images/consult.png'
import near_you from '../assets/images/near_you.png'
import surgery from '../assets/images/surgeries.png'
const imageStyle = {
    width: '100%',
    height: '300px', 
    objectFit: 'cover',
    backgroundPosition: 'center'
}



const Offering = () => {
    return (
        <div className="mb-5 w-full">
            <h1 className="text-3xl font-semibold mb-10 text-center">Our Offering</h1>
            <div className="flex flex-col md:flex-row mx-auto w-full justify-center gap-10">
                <div
                    className='shadow-md rounded-2xl flex-col mx-auto md:mx-0 w-[65%] md:w-[28%] min-h-[23rem] lg:w-[20%] bg-contain bg-no-repeat relative bg-blue-300 bg-bottom'
                    style={{ backgroundImage: `url(${consultation})` }}
                >
                    <div className="p-4 w-full absolute bg-white bottom-0 h-[32%] md:h-[30%] rounded-b-2xl">
                        <h3 className="font-semibold text-xl">Instant video consultation</h3>
                        <p>Connect within 60s</p>
                    </div>
                </div>

                <div
                    className='shadow-md rounded-2xl flex-col mx-auto md:mx-0 w-[65%] md:w-[28%] min-h-[23rem] lg:w-[20%] bg-contain bg-no-repeat relative bg-[#98CBD6] md:bg-center lg:bg-top'
                    style={{ backgroundImage: `url(${near_you})` }}
                >
                    <div className="p-4 w-full absolute bg-white bottom-0 h-[32%] md:h-[30%] rounded-b-2xl">
                        <h3 className="font-semibold text-xl">Find doctors near you</h3>
                        <p>Confirmed appointment</p>
                    </div>
                </div>

                <div
                    className='shadow-md rounded-2xl flex-col mx-auto md:mx-0 w-[65%] md:w-[28%] min-h-[23rem] lg:w-[20%]  bg-contain bg-no-repeat relative bg-[#D7DAFC] md:bg-center lg:bg-top'
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