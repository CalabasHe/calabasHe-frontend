import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return ( 
      <div className="overflow-hidden">
        <Header/>
        <main className='w-full mt-8 flex flex-col items-center'>
          <Banner/>

          {/* <Review/>        */}
          {/* <h1 className="z-1 text-6xl font-black animate-bounce ">Calabas<span className="text-[#0B7F85]">He</span></h1>  */}

        </main>
        <Footer/>
      </div>
    )
}
 
export default Home;