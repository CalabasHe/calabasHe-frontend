import AnimatePage from "../components/AnimatePage";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return (
        <div className="overflow-hidden">
          <Header/>
          <AnimatePage>
            <main className=' w-full mt-8 flex flex-col items-center'>
              <Banner/>

              {/* <Review/>        */}
              {/* <p className="font-semibold text-2xl sm:text-4xl ">Heyy there!!👋😁</p>
              <p className="font-semibold text-2xl sm:text-4xl ">Welcome to:</p>
              <h1 className="z-1 mt-4 text-4xl sm:text-6xl font-black animate-bounce ">Calabas<span className="text-[#04DA8D]">He</span></h1>  */}

            </main>
            <Footer/>
          </AnimatePage>
        </div>
    )
}
 
export default Home;