import AnimatePage from "../components/AnimatePage";
import AvailableDoctorsContainer from "../components/availableListContainer";
import { FadeInOut } from "../components/ComponentAnimations";
import Header from "../components/Header";
const AvailableDoctors = () => {
    return (
        <div>
        <div className="lg:min-h-screen 2xl:container mx-auto flex flex-col  2xl:border-x">
          <Header />
          <FadeInOut>
            <aside className="max-sm:w-full max-sm:bg-[#FCFBF2] max-sm:z-30 pb-8 sm:pb-12">
              <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%] bg-[#04DA8D] h-16 max-w-[110px] sm:max-w-[180px] sm:h-24"></div>
              <div className="z-0 absolute top-[120px] sm:top-[165px] h-3 w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
              <div className="mt-[65px] sm:mt-[76px]">
                <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl font-bold">
                  Available Doctors <br /> in Ghana
                </h1>
              </div>
            </aside>
          </FadeInOut>
          <AnimatePage>
            {/* <main className="flex-grow w-full flex flex-col lg:pb-[100px] lg:flex-row lg:justify-center lg:gap-2 relative mt-32 lg:px-4 xl:px-6 sm:mt-16 p-2"> */}
            <main className="mt-2 sm:mt-16 lg:mt-4">
                <AvailableDoctorsContainer/>
            </main>
          </AnimatePage>
        </div>
      </div>
    );
}
 
export default AvailableDoctors;