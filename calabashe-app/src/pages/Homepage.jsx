import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  return ( 
      <div className="overflow-hidden">
        <Header/>
        <main className='h-[100vh] flex flex-col px-2 items-center justify-center'>

          {/* <Review/>        */}
          <h1 className="z-1 text-6xl font-black animate-bounce ">Calabas<span className="text-[#0B7F85]">He</span></h1> 

        </main>
        <Footer/>
      </div>
    )
}
 
export default Home;