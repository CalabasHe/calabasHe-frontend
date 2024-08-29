import { FadeInOut } from "../components/ComponentAnimations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Stars from "../components/Star";

const Review = () => {


  return ( 
    <>
      <Header/>
        <FadeInOut>
            <div className="z-0 absolute top-[60px] sm:top-[73px] w-[25%]  bg-green-400 h-16 max-w-[110px] sm:max-w-[180px] sm:h-24" ></div>
            <div className="z-0 absolute top-[120px] sm:top-[165px] h-3  w-[27%] max-w-[116px] sm:max-w-[188px] border-4 sm:border-6 border-black border-t-0 border-l-0 bg-transparent"></div>
            <aside className=" mt-[65px] sm:mt-[76px] ">
              <h1 className="z-10 relative max-[460px]:mx-[15%] tracking-wider mx-[20px] sm:mx-[100px] sm:translate-y-[10px] text-base sm:text-2xl  font-bold ">
                We&apos;d Love to Hear<br/> From You
              </h1>
            </aside>
          </FadeInOut>
        
        <main className="w-full mt-12 sm:mt-[80px] lg:mt-[105px] px-4  pb-8 flex flex-col gap-12 items-center ">
        <section className="p-4 px-6 md:border space-y-2 border-black rounded-2xl w-full max-sm:max-w-[500px] md:w-[80%] md:max-w-[700px] ">
          <div>
            hello
            <Stars/>
          </div>
        </section>

        </main>

      <Footer/>
    </>
   );
}
 
export default Review;