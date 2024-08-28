import AnimatePage from "../components/AnimatePage";
import { FadeInOut } from "../components/ComponentAnimations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ServiceLink from "../components/service";

const Services = () => {
  return ( 
    <>
      <Header/>
      <FadeInOut>
            <div className="z-0 absolute top-[60px] sm:top-[70px] md:[] w-[25%]  bg-green-400 h-16 max-w-[110px] sm:max-w-[180px] sm:h-24" ></div>
            <div className="z-0 absolute top-[120px] sm:top-[162px] h-3  w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
            <aside className=" mt-[65px] sm:mt-[73px] ">
              <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
                Medical Services <br/> in  Ghana
              </h1>
            </aside>
          </FadeInOut>
      <AnimatePage>
        {/* <main className="font-helvetica font-semibold subpixel-antialiased text-2xl h-[100vh] flex justify-center items-center">
          <p >Yayy! Services!! 💉 🚑</p>
        </main> */}
        <main className="w-full mt-8 sm:mt-14 flex justify-center px-2 sm:px-3 pb-4 sm:pb-8">
          <ServiceLink/>
        </main>
      </AnimatePage>
      {/* <Footer/> */}
    </>
   );
}
 
export default Services;