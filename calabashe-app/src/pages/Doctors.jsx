import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import DoctorCard from "../components/doctorCard";
import Header from "../components/Header";
import Specialty from "../components/specialties";

const Doctors = () => {
  return (
    <div className="lg:min-h-screen flex flex-col">
      <Header />
      <FadeInOut>
        <aside className="max-sm:w-full max-sm:bg-[#FCFBF2] max-sm:fixed max-sm:top-0 max-sm:z-30 pb-8 sm:pb-12">
          <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
          <div className="z-0 absolute top-[120px] sm:top-[165px] h-3 w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
          <div className="mt-[65px] sm:mt-[76px]">
            <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
              Medical Doctors <br /> in Ghana
            </h1>
          </div>
        </aside>
      </FadeInOut>
      <AnimatePage>
        <main className="flex-grow flex flex-col lg:pb-[100px] lg:flex-row lg:justify-center lg:gap-2 relative border border-blue-600 mt-32 lg:px-4 xl:px-6 sm:mt-16 p-2">
          <div className=" lg:min-w-[300px] max-lg:w-[30%] lg:sticky lg:top-[70px] pr-2 border-r  lg:self-start xl:pl-4">
            <Specialty />
          </div>
          <div className=" px-2 xl:px-4 border border-emerald-700">
            <div className="w-full flex flex-col items-center ">
              <DoctorCard />
            </div>
          </div>
        </main>
      </AnimatePage>
    </div>
  );
};

export default Doctors;