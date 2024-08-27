import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import DoctorCard from "../components/doctorCard";
// import Footer from "../components/Footer";
import Header from "../components/Header";

const Doctors = () => {
  return ( 
    <div className="">
      <Header/>
          <FadeInOut>
            <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%]  bg-green-400 h-16 max-w-[110px] sm:max-w-[180px] sm:h-24" ></div>
            <div className="z-0 absolute top-[120px] sm:top-[165px] h-3  w-[27%] max-w-[116px] sm:max-w-[202px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
            <aside className=" mt-[65px] sm:mt-[76px] ">
              <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
                Medical Doctors <br/> in  Ghana
              </h1>
            </aside>
          </FadeInOut>
      <AnimatePage>
        <main className="w-full mt-8 sm:mt-16 p-4 flex flex-col items-center ">
          <DoctorCard/>
        </main>
      </AnimatePage>
      {/* <footer>
        <Footer/>
      </footer> */}
    </div>
   );
}
 
export default Doctors;